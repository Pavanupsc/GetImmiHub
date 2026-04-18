import Link from "next/link";
import type { CSSProperties } from "react";
import { colors } from "@/lib/design-tokens";
import {
  fetchAllWaitlistRows,
  fetchWaitlistEntriesFromWp,
  fetchWaitlistMergedPinnedFirstPage,
  normalizeWaitlistRows,
  type WaitlistPinnedFilter,
} from "@/lib/waitlist-entries";
import { WaitlistAdminTable } from "@/components/admin/WaitlistAdminTable";
import {
  filterWaitlistRows,
  hasActiveFilters,
  type WaitlistAdminFilters,
} from "@/lib/waitlist-filter";
import { WAITLIST_INTEREST_OPTIONS, WAITLIST_VISA_TYPES } from "@/lib/waitlist-options";

const PREFERRED_KEYS = [
  "id",
  "email",
  "firstName",
  "first_name",
  "visaType",
  "visa_type",
  "interests",
  "created_at",
  "date",
  "date_created",
];

const HIDE_COLUMN_KEYS = new Set(["pinned", "_waitlist_pinned", "otherVisaType", "ip"]);

function collectColumnKeys(rows: Record<string, unknown>[]): string[] {
  const seen = new Set<string>();
  rows.forEach((r) => Object.keys(r).forEach((k) => seen.add(k)));
  const ordered: string[] = [];
  for (const k of PREFERRED_KEYS) {
    if (HIDE_COLUMN_KEYS.has(k)) {
      seen.delete(k);
      continue;
    }
    if (seen.has(k)) {
      ordered.push(k);
      seen.delete(k);
    }
  }
  [...seen].sort().forEach((k) => {
    if (!HIDE_COLUMN_KEYS.has(k)) ordered.push(k);
  });
  return ordered;
}

function parsePinnedParam(raw: string | string[] | undefined): "" | WaitlistPinnedFilter {
  const s = Array.isArray(raw) ? raw[0] : raw;
  if (s === "1" || s === "0") return s;
  return "";
}

function buildAdminHref(
  nextPage: number,
  perPage: number,
  f: WaitlistAdminFilters,
  pinned: "" | WaitlistPinnedFilter
) {
  const q = new URLSearchParams();
  const tq = f.q.trim();
  if (tq) q.set("q", tq);
  if (f.visa.trim()) q.set("visa", f.visa.trim());
  if (f.interest.trim()) q.set("interest", f.interest.trim());
  if (pinned === "0" || pinned === "1") q.set("pinned", pinned);
  if (nextPage > 1) q.set("page", String(nextPage));
  if (perPage !== 20) q.set("per_page", String(perPage));
  const s = q.toString();
  return s ? `/admin?${s}` : "/admin";
}

const filterInputStyle: CSSProperties = {
  padding: "10px 12px",
  borderRadius: "10px",
  border: `2px solid ${colors.border}`,
  fontSize: "14px",
  fontFamily: "'Source Sans 3', sans-serif",
  color: colors.textDark,
  background: colors.white,
  minWidth: "0",
};

export default async function AdminWaitlistPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    per_page?: string;
    q?: string;
    visa?: string;
    interest?: string;
    pinned?: string | string[];
  }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(sp.per_page || "20", 10) || 20));
  const pinnedParam = parsePinnedParam(sp.pinned);

  const filters: WaitlistAdminFilters = {
    q: sp.q ?? "",
    visa: sp.visa ?? "",
    interest: sp.interest ?? "",
  };

  const filtersOn = hasActiveFilters(filters);
  const pinnedForFetch: WaitlistPinnedFilter | undefined =
    pinnedParam === "" ? undefined : pinnedParam;

  let rows: Record<string, unknown>[] = [];
  let error: string | null = null;
  let wpTotal: string | null = null;
  let wpTotalPages = 0;
  let safePage = page;
  let totalForPagination = 0;
  let filteredCount: number | null = null;
  let loadedForFilter = 0;

  try {
    if (filtersOn) {
      const { rows: all, reportedTotal } = await fetchAllWaitlistRows({ pinned: pinnedForFetch });
      loadedForFilter = all.length;
      wpTotal = reportedTotal;
      const filtered = filterWaitlistRows(all, filters);
      filteredCount = filtered.length;
      const filteredPages = Math.max(1, Math.ceil(filtered.length / perPage));
      safePage = Math.min(page, filteredPages);
      totalForPagination = filteredPages;
      rows = filtered.slice((safePage - 1) * perPage, safePage * perPage);
    } else if (pinnedForFetch === undefined) {
      const { payload, meta } = await fetchWaitlistEntriesFromWp({
        page,
        per_page: perPage,
        pinned: "all",
      });
      rows = normalizeWaitlistRows(payload);
      wpTotal = meta.total;
      wpTotalPages = meta.totalPages ? parseInt(meta.totalPages, 10) : 0;
      safePage = page;
      totalForPagination = wpTotalPages;
    } else {
      const { payload, meta } = await fetchWaitlistEntriesFromWp({
        page,
        per_page: perPage,
        pinned: pinnedForFetch,
      });
      rows = normalizeWaitlistRows(payload);
      wpTotal = meta.total;
      wpTotalPages = meta.totalPages ? parseInt(meta.totalPages, 10) : 0;
      safePage = page;
      totalForPagination = wpTotalPages;
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load entries";
  }

  const columns = collectColumnKeys(rows);

  const showPagination = !error && totalForPagination > 1;
  const hasPrev = safePage > 1;
  const hasNext = safePage < totalForPagination;

  return (
    <div>
      <form
        method="get"
        action="/admin"
        style={{
          marginBottom: "20px",
          padding: "20px",
          borderRadius: "12px",
          background: colors.white,
          border: `1px solid ${colors.border}`,
          display: "grid",
          gap: "14px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          alignItems: "end",
        }}
      >
        <div style={{ gridColumn: "1 / -1", marginBottom: "4px" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: colors.textDark,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Filters
          </span>
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: colors.textBody,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Search (email or name)
          </span>
          <input
            type="search"
            name="q"
            defaultValue={filters.q}
            placeholder="Type to filter…"
            style={{ ...filterInputStyle, width: "100%" }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: colors.textBody,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Visa type
          </span>
          <select
            name="visa"
            defaultValue={filters.visa}
            style={{ ...filterInputStyle, width: "100%", cursor: "pointer" }}
          >
            <option value="">All types</option>
            {WAITLIST_VISA_TYPES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: colors.textBody,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Interest
          </span>
          <select
            name="interest"
            defaultValue={filters.interest}
            style={{ ...filterInputStyle, width: "100%", cursor: "pointer" }}
          >
            <option value="">All interests</option>
            {WAITLIST_INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: colors.textBody,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Pinned (WordPress)
          </span>
          <select
            name="pinned"
            defaultValue={pinnedParam}
            style={{ ...filterInputStyle, width: "100%", cursor: "pointer" }}
          >
            <option value="">All (pinned first)</option>
            <option value="1">Pinned only</option>
            <option value="0">Unpinned only</option>
          </select>
        </label>
        {perPage !== 20 && <input type="hidden" name="per_page" value={String(perPage)} />}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: colors.brandPrimary,
              color: colors.white,
              fontWeight: 700,
              fontSize: "14px",
              fontFamily: "'Source Sans 3', sans-serif",
              cursor: "pointer",
            }}
          >
            Apply filters
          </button>
          <Link
            href={perPage !== 20 ? `/admin?per_page=${perPage}` : "/admin"}
            style={{
              fontSize: "14px",
              color: colors.textMuted,
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 600,
            }}
          >
            Clear filters
          </Link>
        </div>
      </form>

      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: colors.textBody,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {error ? (
            <span style={{ color: colors.danger }}>{error}</span>
          ) : filtersOn ? (
            <>
              <strong style={{ color: colors.textDark }}>{filteredCount ?? 0}</strong> matching
              {filteredCount != null && filteredCount > 0 && (
                <>
                  {" "}
                  · page <strong style={{ color: colors.textDark }}>{safePage}</strong> of{" "}
                  <strong style={{ color: colors.textDark }}>{totalForPagination}</strong>
                </>
              )}
              <span style={{ color: colors.textMuted }}>
                {" "}
                · {loadedForFilter} entr{loadedForFilter === 1 ? "y" : "ies"} loaded for search
                {wpTotal != null && (
                  <>
                    {" "}
                    (WordPress total <strong style={{ color: colors.textBody }}>{wpTotal}</strong>)
                  </>
                )}
              </span>
            </>
          ) : wpTotal != null ? (
            <>
              <strong style={{ color: colors.textDark }}>{wpTotal}</strong> total
              {wpTotalPages > 1 && (
                <>
                  {" "}
                  · page {safePage} of {wpTotalPages}
                </>
              )}
            </>
          ) : (
            <>
              <strong style={{ color: colors.textDark }}>{rows.length}</strong>{" "}
              {rows.length === 1 ? "entry" : "entries"} on this page
            </>
          )}
        </p>
        <Link
          href={buildAdminHref(safePage, perPage, filters, pinnedParam)}
          style={{
            fontSize: "14px",
            color: colors.brandPrimary,
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 600,
          }}
        >
          Refresh
        </Link>
      </div>

      {!filtersOn && !error && (
        <p
          style={{
            margin: "0 0 16px",
            fontSize: "13px",
            color: colors.textMuted,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          Tip: the full list loads pinned and unpinned entries separately from WordPress and merges them
          (pinned first), so you always see every row. Search filters still scan up to 5,000 merged rows
          client-side.
        </p>
      )}

      {!error && rows.length === 0 && (
        <p
          style={{
            padding: "24px",
            borderRadius: "12px",
            background: colors.white,
            border: `1px solid ${colors.border}`,
            color: colors.textBody,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {filtersOn ? "No entries match these filters." : "No entries yet."}
        </p>
      )}

      {!error && rows.length > 0 && (
        <WaitlistAdminTable
          rows={rows}
          columns={columns}
          rowKeyPrefix={`${safePage}-${filtersOn ? "f" : "a"}-${pinnedParam || "p"}`}
        />
      )}

      {showPagination && (
        <nav
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "14px",
          }}
        >
          {hasPrev ? (
            <Link
              href={buildAdminHref(safePage - 1, perPage, filters, pinnedParam)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                background: colors.white,
                border: `1px solid ${colors.border}`,
                color: colors.textDark,
                fontWeight: 600,
              }}
            >
              Previous
            </Link>
          ) : (
            <span style={{ color: colors.textMuted }}>Previous</span>
          )}
          {hasNext ? (
            <Link
              href={buildAdminHref(safePage + 1, perPage, filters, pinnedParam)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                background: colors.white,
                border: `1px solid ${colors.border}`,
                color: colors.textDark,
                fontWeight: 600,
              }}
            >
              Next
            </Link>
          ) : (
            <span style={{ color: colors.textMuted }}>Next</span>
          )}
        </nav>
      )}
    </div>
  );
}