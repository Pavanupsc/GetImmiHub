<?php
/**
 * Waitlist REST API – Full CRUD
 * Paste this entire file into the Code Snippets plugin (Snippets → Add New → PHP snippet).
 * Run everywhere: Yes  |  Auto-run: Yes
 *
 * Endpoints:
 *  POST   /wp-json/waitlist/v1/entries       → Create a new entry
 *  GET    /wp-json/waitlist/v1/entries        → List all entries
 *  GET    /wp-json/waitlist/v1/entries/{id}   → Get single entry
 *  PUT    /wp-json/waitlist/v1/entries/{id}   → Update an entry
 *  DELETE /wp-json/waitlist/v1/entries/{id}   → Delete an entry
 *  PATCH  /wp-json/waitlist/v1/entries/{id}/pin → Toggle pin/unpin an entry
 *  GET    /wp-json/waitlist/v1/entries?pinned=1  → Filter pinned entries only
 */


/* ============================================================
   1. REGISTER CUSTOM POST TYPE – "waitlist_entry"
   ============================================================ */
add_action( 'init', function () {

	register_post_type( 'waitlist_entry', [
		'label'               => 'Waitlist Entries',
		'labels'              => [
			'name'               => 'Waitlist Entries',
			'singular_name'      => 'Waitlist Entry',
			'add_new_item'       => 'Add New Entry',
			'edit_item'          => 'Edit Entry',
			'view_item'          => 'View Entry',
			'search_items'       => 'Search Entries',
			'not_found'          => 'No entries found.',
			'not_found_in_trash' => 'No entries found in Trash.',
		],
		'public'              => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_rest'        => false,   // We register our own REST routes
		'supports'            => [ 'title' ],
		'menu_icon'           => 'dashicons-list-view',
		'capability_type'     => 'post',
	] );
} );


/* ============================================================
   2. ADD META BOX – show custom fields in WP Admin
   ============================================================ */
add_action( 'add_meta_boxes', function () {

	add_meta_box(
		'waitlist_details',
		'Submission Details',
		'waitlist_meta_box_callback',
		'waitlist_entry',
		'normal',
		'high'
	);
} );

function waitlist_meta_box_callback( $post ) {

	$fields = [
		'_waitlist_email'           => 'Email Address',
		'_waitlist_firstname'       => 'First Name',
		'_waitlist_visa_type'       => 'Visa Type',
		'_waitlist_other_visa_type' => 'Other Visa Type',
		'_waitlist_interests'       => 'Interests',
		'_waitlist_pinned'          => 'Pinned',
		'_waitlist_ip'              => 'Submitted from IP',
		'_waitlist_date'            => 'Submitted At',
	];

	echo '<table style="width:100%;border-collapse:collapse;">';
	foreach ( $fields as $key => $label ) {
		$value = get_post_meta( $post->ID, $key, true );
		if ( is_array( $value ) ) {
			$value = implode( ', ', $value );
		}
		echo '<tr>';
		echo '<th style="text-align:left;padding:6px 10px;width:160px;background:#f6f7f7;">' . esc_html( $label ) . '</th>';
		echo '<td style="padding:6px 10px;">' . esc_html( $value ) . '</td>';
		echo '</tr>';
	}
	echo '</table>';
}


/* ============================================================
   3. REGISTER REST API ROUTES
   ============================================================ */
add_action( 'rest_api_init', function () {

	$namespace = 'waitlist/v1';

	register_rest_route( $namespace, '/entries', [
		'methods'             => 'POST',
		'callback'            => 'waitlist_create_entry',
		'permission_callback' => '__return_true',
	] );

	register_rest_route( $namespace, '/entries', [
		'methods'             => 'GET',
		'callback'            => 'waitlist_get_entries',
		'permission_callback' => '__return_true',
	] );

	register_rest_route( $namespace, '/entries/(?P<id>\d+)', [
		'methods'             => 'GET',
		'callback'            => 'waitlist_get_single_entry',
		'permission_callback' => '__return_true',
	] );

	register_rest_route( $namespace, '/entries/(?P<id>\d+)', [
		'methods'             => 'PUT',
		'callback'            => 'waitlist_update_entry',
		'permission_callback' => '__return_true',
	] );

	register_rest_route( $namespace, '/entries/(?P<id>\d+)', [
		'methods'             => 'DELETE',
		'callback'            => 'waitlist_delete_entry',
		'permission_callback' => '__return_true',
	] );

	register_rest_route( $namespace, '/entries/(?P<id>\d+)/pin', [
		'methods'             => 'PATCH',
		'callback'            => 'waitlist_toggle_pin',
		'permission_callback' => '__return_true',
	] );
} );


/* ============================================================
   LEFT JOIN sort: pinned first, without excluding rows missing meta
   ============================================================ */
function waitlist_posts_clauses_pinned_first( $clauses, $query ) {
	if ( empty( $GLOBALS['waitlist_query_pinned_first'] ) ) {
		return $clauses;
	}
	global $wpdb;
	$alias = 'wl_pin_sort';
	if ( strpos( $clauses['join'], $alias ) === false ) {
		$clauses['join'] .= " LEFT JOIN {$wpdb->postmeta} AS {$alias} ON ({$wpdb->posts}.ID = {$alias}.post_id AND {$alias}.meta_key = '_waitlist_pinned') ";
	}
	// Treat NULL / empty / '0' as unpinned; only '1' is pinned
	$clauses['orderby'] = " (CASE WHEN {$alias}.meta_value = '1' THEN 1 ELSE 0 END) DESC, {$wpdb->posts}.post_date DESC ";
	return $clauses;
}


/* ============================================================
   4. VALIDATION CONSTANTS
   ============================================================ */
define( 'WAITLIST_ALLOWED_VISA_TYPES', [
	'H-1B',
	'F-1/OPT',
	'Green Card',
	'O-1/EB-1',
	'L-1',
	'Other',
] );

define( 'WAITLIST_ALLOWED_INTERESTS', [
	'Document Vault',
	'Expiry Reminders',
	'AI Visa Assistant',
	'Compliance Tracking',
	'Family Document Management',
] );


/* ============================================================
   Find existing entry by email (WP_Query has no "title" arg for get_posts)
   ============================================================ */
function waitlist_find_ids_by_email( $email, $exclude_post_id = 0 ) {
	$email = sanitize_email( $email );
	if ( empty( $email ) ) {
		return [];
	}
	$args = [
		'post_type'              => 'waitlist_entry',
		'post_status'            => 'publish',
		'posts_per_page'         => 1,
		'fields'                 => 'ids',
		'meta_query'             => [
			[
				'key'   => '_waitlist_email',
				'value' => $email,
			],
		],
	];
	if ( $exclude_post_id > 0 ) {
		$args['post__not_in'] = [ absint( $exclude_post_id ) ];
	}
	return get_posts( $args );
}


/* ============================================================
   5. POST – Create Entry
   ============================================================ */
function waitlist_create_entry( WP_REST_Request $request ) {

	$body = $request->get_json_params();

	$email           = isset( $body['email'] ) ? sanitize_email( $body['email'] ) : '';
	$first_name      = isset( $body['firstName'] ) ? sanitize_text_field( $body['firstName'] ) : '';
	$visa_type       = isset( $body['visaType'] ) ? sanitize_text_field( $body['visaType'] ) : '';
	$other_visa_type = isset( $body['otherVisaType'] ) ? sanitize_text_field( $body['otherVisaType'] ) : '';
	$interests       = isset( $body['interests'] ) && is_array( $body['interests'] )
		? array_map( 'sanitize_text_field', $body['interests'] )
		: [];

	$errors = [];

	if ( empty( $email ) || ! is_email( $email ) ) {
		$errors[] = 'A valid email address is required.';
	}
	if ( empty( $first_name ) ) {
		$errors[] = 'First name is required.';
	}
	if ( empty( $visa_type ) || ! in_array( $visa_type, WAITLIST_ALLOWED_VISA_TYPES, true ) ) {
		$errors[] = 'Please select a valid visa type.';
	}
	foreach ( $interests as $interest ) {
		if ( ! in_array( $interest, WAITLIST_ALLOWED_INTERESTS, true ) ) {
			$errors[] = 'One or more selected interests are invalid.';
			break;
		}
	}

	if ( ! empty( $errors ) ) {
		return new WP_REST_Response( [
			'success' => false,
			'errors'  => $errors,
		], 422 );
	}

	$existing = waitlist_find_ids_by_email( $email, 0 );
	if ( ! empty( $existing ) ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'This email address is already on the waitlist.',
		], 409 );
	}

	$post_id = wp_insert_post( [
		'post_type'   => 'waitlist_entry',
		'post_title'  => $email,
		'post_status' => 'publish',
		'post_author' => 0,
	] );

	if ( is_wp_error( $post_id ) ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'Could not save your submission. Please try again.',
		], 500 );
	}

	update_post_meta( $post_id, '_waitlist_email', $email );
	update_post_meta( $post_id, '_waitlist_firstname', $first_name );
	update_post_meta( $post_id, '_waitlist_visa_type', $visa_type );
	update_post_meta( $post_id, '_waitlist_other_visa_type', $other_visa_type );
	update_post_meta( $post_id, '_waitlist_interests', $interests );
	update_post_meta( $post_id, '_waitlist_pinned', '0' );
	update_post_meta( $post_id, '_waitlist_ip', waitlist_get_ip() );
	update_post_meta( $post_id, '_waitlist_date', current_time( 'mysql' ) );

	waitlist_send_admin_email( $email, $first_name, $visa_type, $other_visa_type, $interests );

	return new WP_REST_Response( [
		'success' => true,
		'message' => 'You have been added to the waitlist.',
		'data'    => waitlist_format_entry( $post_id ),
	], 201 );
}


/* ============================================================
   6. GET – List All Entries
   ============================================================ */
function waitlist_get_entries( WP_REST_Request $request ) {

	$page     = absint( $request->get_param( 'page' ) ) ?: 1;
	$per_page = absint( $request->get_param( 'per_page' ) ) ?: 20;
	$per_page = min( 100, max( 1, $per_page ) );

	$pinned_raw = $request->get_param( 'pinned' );
	$pinned     = is_string( $pinned_raw ) ? $pinned_raw : ( $pinned_raw === 1 || $pinned_raw === true ? '1' : (string) $pinned_raw );

	$query_args = [
		'post_type'              => 'waitlist_entry',
		'post_status'            => 'publish',
		'posts_per_page'         => $per_page,
		'paged'                  => $page,
		'no_found_rows'          => false,
		'update_post_meta_cache' => true,
	];

	if ( $pinned === '1' ) {
		$query_args['meta_query'] = [
			[
				'key'     => '_waitlist_pinned',
				'value'   => [ '1', 1, 'true', true ],
				'compare' => 'IN',
			],
		];
		$query_args['orderby'] = 'date';
		$query_args['order']   = 'DESC';
	} elseif ( $pinned === '0' ) {
		// Unpinned: explicit '0' OR no meta row (legacy rows)
		$query_args['meta_query'] = [
			'relation' => 'OR',
			[
				'key'     => '_waitlist_pinned',
				'value'   => [ '0', 0, 'false', false, '' ],
				'compare' => 'IN',
			],
			[
				'key'     => '_waitlist_pinned',
				'compare' => 'NOT EXISTS',
			],
		];
		$query_args['orderby'] = 'date';
		$query_args['order']   = 'DESC';
	} else {
		// All entries, pinned first — do NOT use meta_key alone (INNER JOIN hides posts without meta)
		$GLOBALS['waitlist_query_pinned_first'] = true;
		add_filter( 'posts_clauses', 'waitlist_posts_clauses_pinned_first', 10, 2 );
		$query_args['orderby'] = 'date';
		$query_args['order']   = 'DESC';
	}

	try {
		$query = new WP_Query( $query_args );
	} finally {
		if ( ! empty( $GLOBALS['waitlist_query_pinned_first'] ) ) {
			remove_filter( 'posts_clauses', 'waitlist_posts_clauses_pinned_first', 10 );
			$GLOBALS['waitlist_query_pinned_first'] = false;
		}
	}

	$entries = array_map( function ( $post ) {
		return waitlist_format_entry( $post->ID );
	}, $query->posts );

	$response = new WP_REST_Response( [
		'success'    => true,
		'data'       => $entries,
		'pagination' => [
			'total'       => (int) $query->found_posts,
			'total_pages' => (int) $query->max_num_pages,
			'page'        => $page,
			'per_page'    => $per_page,
		],
	], 200 );

	// So Next.js / WP-style clients can paginate without parsing JSON body
	$response->header( 'X-WP-Total', (string) (int) $query->found_posts );
	$response->header( 'X-WP-Total-Pages', (string) (int) max( 1, $query->max_num_pages ) );

	return $response;
}


/* ============================================================
   7. GET – Single Entry
   ============================================================ */
function waitlist_get_single_entry( WP_REST_Request $request ) {

	$id   = absint( $request->get_param( 'id' ) );
	$post = get_post( $id );

	if ( ! $post || $post->post_type !== 'waitlist_entry' ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'Entry not found.',
		], 404 );
	}

	return new WP_REST_Response( [
		'success' => true,
		'data'    => waitlist_format_entry( $id ),
	], 200 );
}


/* ============================================================
   8. PUT – Update Entry
   ============================================================ */
function waitlist_update_entry( WP_REST_Request $request ) {

	$id   = absint( $request->get_param( 'id' ) );
	$post = get_post( $id );

	if ( ! $post || $post->post_type !== 'waitlist_entry' ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'Entry not found.',
		], 404 );
	}

	$body   = $request->get_json_params();
	$errors = [];

	if ( isset( $body['email'] ) ) {
		$email = sanitize_email( $body['email'] );
		if ( ! is_email( $email ) ) {
			$errors[] = 'A valid email address is required.';
		} else {
			$existing = waitlist_find_ids_by_email( $email, $id );
			if ( ! empty( $existing ) ) {
				return new WP_REST_Response( [
					'success' => false,
					'message' => 'Another entry with this email already exists.',
				], 409 );
			}
			wp_update_post( [ 'ID' => $id, 'post_title' => $email ] );
			update_post_meta( $id, '_waitlist_email', $email );
		}
	}

	if ( isset( $body['firstName'] ) ) {
		$first_name = sanitize_text_field( $body['firstName'] );
		if ( empty( $first_name ) ) {
			$errors[] = 'First name cannot be empty.';
		} else {
			update_post_meta( $id, '_waitlist_firstname', $first_name );
		}
	}

	if ( isset( $body['visaType'] ) ) {
		$visa_type = sanitize_text_field( $body['visaType'] );
		if ( ! in_array( $visa_type, WAITLIST_ALLOWED_VISA_TYPES, true ) ) {
			$errors[] = 'Invalid visa type.';
		} else {
			update_post_meta( $id, '_waitlist_visa_type', $visa_type );
		}
	}

	if ( isset( $body['otherVisaType'] ) ) {
		$other_visa = sanitize_text_field( $body['otherVisaType'] );
		update_post_meta( $id, '_waitlist_other_visa_type', $other_visa );
	}

	if ( isset( $body['interests'] ) ) {
		if ( ! is_array( $body['interests'] ) ) {
			$errors[] = 'Interests must be an array.';
		} else {
			$interests = array_map( 'sanitize_text_field', $body['interests'] );
			foreach ( $interests as $interest ) {
				if ( ! in_array( $interest, WAITLIST_ALLOWED_INTERESTS, true ) ) {
					$errors[] = 'One or more selected interests are invalid.';
					break;
				}
			}
			if ( empty( $errors ) ) {
				update_post_meta( $id, '_waitlist_interests', $interests );
			}
		}
	}

	if ( ! empty( $errors ) ) {
		return new WP_REST_Response( [
			'success' => false,
			'errors'  => $errors,
		], 422 );
	}

	return new WP_REST_Response( [
		'success' => true,
		'message' => 'Entry updated successfully.',
		'data'    => waitlist_format_entry( $id ),
	], 200 );
}


/* ============================================================
   9. DELETE – Delete Entry
   ============================================================ */
function waitlist_delete_entry( WP_REST_Request $request ) {

	$id   = absint( $request->get_param( 'id' ) );
	$post = get_post( $id );

	if ( ! $post || $post->post_type !== 'waitlist_entry' ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'Entry not found.',
		], 404 );
	}

	$entry = waitlist_format_entry( $id );
	wp_delete_post( $id, true );

	return new WP_REST_Response( [
		'success' => true,
		'message' => 'Entry deleted successfully.',
		'data'    => $entry,
	], 200 );
}


/* ============================================================
   10. PATCH – Toggle Pin/Unpin Entry
   ============================================================ */
function waitlist_toggle_pin( WP_REST_Request $request ) {

	$id   = absint( $request->get_param( 'id' ) );
	$post = get_post( $id );

	if ( ! $post || $post->post_type !== 'waitlist_entry' ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'Entry not found.',
		], 404 );
	}

	$current = get_post_meta( $id, '_waitlist_pinned', true );
	$new_val = ( $current === '1' ) ? '0' : '1';
	update_post_meta( $id, '_waitlist_pinned', $new_val );

	return new WP_REST_Response( [
		'success' => true,
		'message' => $new_val === '1' ? 'Entry pinned.' : 'Entry unpinned.',
		'data'    => waitlist_format_entry( $id ),
	], 200 );
}


/* ============================================================
   11. HELPER – Format entry for API response
   ============================================================ */
function waitlist_format_entry( $post_id ) {

	$interests = get_post_meta( $post_id, '_waitlist_interests', true );
	if ( ! is_array( $interests ) ) {
		$interests = [];
	}

	$pin_raw = get_post_meta( $post_id, '_waitlist_pinned', true );

	return [
		'id'            => (int) $post_id,
		'email'         => get_post_meta( $post_id, '_waitlist_email', true ),
		'firstName'     => get_post_meta( $post_id, '_waitlist_firstname', true ),
		'visaType'      => get_post_meta( $post_id, '_waitlist_visa_type', true ),
		'otherVisaType' => get_post_meta( $post_id, '_waitlist_other_visa_type', true ),
		'interests'     => $interests,
		'pinned'        => ( $pin_raw === '1' || $pin_raw === 1 || $pin_raw === true ),
		'ip'            => get_post_meta( $post_id, '_waitlist_ip', true ),
		'createdAt'     => get_post_meta( $post_id, '_waitlist_date', true ),
	];
}


/* ============================================================
   12. HELPER – Get real visitor IP
   ============================================================ */
function waitlist_get_ip() {
	$keys = [
		'HTTP_CF_CONNECTING_IP',
		'HTTP_X_FORWARDED_FOR',
		'HTTP_X_REAL_IP',
		'REMOTE_ADDR',
	];
	foreach ( $keys as $key ) {
		if ( ! empty( $_SERVER[ $key ] ) ) {
			$ip = explode( ',', sanitize_text_field( wp_unslash( $_SERVER[ $key ] ) ) );
			return trim( $ip[0] );
		}
	}
	return 'unknown';
}


/* ============================================================
   13. HELPER – Admin notification email
   ============================================================ */
function waitlist_send_admin_email( $email, $first_name, $visa_type, $other_visa_type, array $interests ) {

	$to      = get_option( 'admin_email' );
	$subject = '[Waitlist] New submission from ' . $first_name;
	$body    = "A new waitlist submission has been received.\n\n"
		. "Email           : {$email}\n"
		. "First Name      : {$first_name}\n"
		. "Visa Type       : {$visa_type}" . ( $visa_type === 'Other' && $other_visa_type ? " ({$other_visa_type})" : "" ) . "\n"
		. "Interests       : " . ( $interests ? implode( ', ', $interests ) : 'None selected' ) . "\n"
		. "Time            : " . current_time( 'Y-m-d H:i:s' ) . "\n\n"
		. "View all entries: " . admin_url( 'edit.php?post_type=waitlist_entry' );

	wp_mail( $to, $subject, $body );
}