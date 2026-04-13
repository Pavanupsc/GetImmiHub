/** Same base URL as POST in api/waitlist — list uses GET on this URL. */
const DEFAULT_ENTRIES_URL = "https://pncreators.com/wp-json/waitlist/v1/entries";

export function getWaitlistEntriesUrl(): string {
  return process.env.WAITLIST_API_URL || DEFAULT_ENTRIES_URL;
}

export type WaitlistFetchMeta = {
  total: string | null;
  totalPages: string | null;
};

/**
 * Fetches waitlist rows from WordPress REST (GET /entries).
 * Response shape depends on the plugin; we normalize in the table.
 */
export type WaitlistPinnedFilter = "0" | "1";

export async function fetchWaitlistEntriesFromWp(opts?: {
  page?: number;
  per_page?: number;
  /** WordPress: `pinned=1` pinned only, `pinned=0` unpinned only; omit for all (pinned first). */
  pinned?: WaitlistPinnedFilter;
}): Promise<{ payload: unknown; meta: WaitlistFetchMeta }> {
  const base = getWaitlistEntriesUrl();
  const url = new URL(base);
  if (opts?.page != null && opts.page > 0) {
    url.searchParams.set("page", String(opts.page));
  }
  if (opts?.per_page != null && opts.per_page > 0) {
    url.searchParams.set("per_page", String(opts.per_page));
  } else {
    url.searchParams.set("per_page", "100");
  }
  if (opts?.pinned === "0" || opts?.pinned === "1") {
    url.searchParams.set("pinned", opts.pinned);
  }

  const res = await fetch(url.toString(), {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Invalid JSON from waitlist API (${res.status})`);
  }

  if (!res.ok) {
    const msg =
      data && typeof data === "object" && data !== null && "message" in data
        ? String((data as { message: unknown }).message)
        : `HTTP ${res.status}`;
    throw new Error(msg);
  }

  const meta: WaitlistFetchMeta = {
    total: res.headers.get("x-wp-total") ?? res.headers.get("X-WP-Total"),
    totalPages: res.headers.get("x-wp-total-pages") ?? res.headers.get("X-WP-Total-Pages"),
  };

  return { payload: data, meta };
}

/** Normalize plugin response to an array of record-like rows for the table. */
export function normalizeWaitlistRows(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload.filter((x) => x && typeof x === "object") as Record<string, unknown>[];
  }
  if (payload && typeof payload === "object") {
    const o = payload as Record<string, unknown>;
    if (Array.isArray(o.data)) {
      return o.data.filter((x) => x && typeof x === "object") as Record<string, unknown>[];
    }
    if (Array.isArray(o.items)) {
      return o.items.filter((x) => x && typeof x === "object") as Record<string, unknown>[];
    }
  }
  return [];
}

const DEFAULT_FETCH_ALL_MAX_PAGES = 50;
const DEFAULT_FETCH_ALL_PER_PAGE = 100;

async function fetchAllWaitlistRowsForPinMode(
  pinned: WaitlistPinnedFilter,
  maxPages: number,
  perPage: number
): Promise<{ rows: Record<string, unknown>[]; reportedTotal: string | null }> {
  const merged: Record<string, unknown>[] = [];
  const seenIds = new Set<string>();
  let reportedTotal: string | null = null;

  for (let p = 1; p <= maxPages; p++) {
    const { payload, meta } = await fetchWaitlistEntriesFromWp({
      page: p,
      per_page: perPage,
      pinned,
    });
    if (reportedTotal === null) {
      reportedTotal = meta.total;
    }
    const rows = normalizeWaitlistRows(payload);
    if (rows.length === 0) break;

    for (const row of rows) {
      const id = row.id != null ? String(row.id) : null;
      if (id) {
        if (seenIds.has(id)) continue;
        seenIds.add(id);
      }
      merged.push(row);
    }

    const totalPages = meta.totalPages ? parseInt(meta.totalPages, 10) : 0;
    if (totalPages > 0 && p >= totalPages) break;
    if (rows.length < perPage) break;
  }

  return { rows: merged, reportedTotal };
}

/**
 * Loads all waitlist pages from WordPress (for admin filtering).
 * When `pinned` is omitted, loads pinned=1 and pinned=0 and concatenates (pinned first).
 * Many WordPress setups only return pinned rows for an unfiltered GET; explicit flags avoid that.
 */
export async function fetchAllWaitlistRows(opts?: {
  maxPages?: number;
  perPage?: number;
  pinned?: WaitlistPinnedFilter;
}): Promise<{ rows: Record<string, unknown>[]; reportedTotal: string | null }> {
  const perPage = Math.min(100, Math.max(1, opts?.perPage ?? DEFAULT_FETCH_ALL_PER_PAGE));
  const maxPages = Math.max(1, opts?.maxPages ?? DEFAULT_FETCH_ALL_MAX_PAGES);

  if (opts?.pinned === "0" || opts?.pinned === "1") {
    return fetchAllWaitlistRowsForPinMode(opts.pinned, maxPages, perPage);
  }

  const pinnedOnly = await fetchAllWaitlistRowsForPinMode("1", maxPages, perPage);
  const unpinnedOnly = await fetchAllWaitlistRowsForPinMode("0", maxPages, perPage);
  const t1 = parseInt(pinnedOnly.reportedTotal ?? "0", 10) || pinnedOnly.rows.length;
  const t2 = parseInt(unpinnedOnly.reportedTotal ?? "0", 10) || unpinnedOnly.rows.length;

  return {
    rows: [...pinnedOnly.rows, ...unpinnedOnly.rows],
    reportedTotal: String(t1 + t2),
  };
}

/**
 * One admin table page: merged order pinned first, then unpinned, with correct pagination
 * (without loading the entire list).
 */
export async function fetchWaitlistMergedPinnedFirstPage(opts: {
  page: number;
  per_page: number;
}): Promise<{
  rows: Record<string, unknown>[];
  meta: WaitlistFetchMeta;
  safePage: number;
}> {
  const perPage = Math.min(100, Math.max(1, opts.per_page));
  const reqPage = Math.max(1, opts.page);

  const [h1, h2] = await Promise.all([
    fetchWaitlistEntriesFromWp({ page: 1, per_page: 1, pinned: "1" }),
    fetchWaitlistEntriesFromWp({ page: 1, per_page: 1, pinned: "0" }),
  ]);

  const T1 = parseInt(h1.meta.total ?? "0", 10) || 0;
  const T2 = parseInt(h2.meta.total ?? "0", 10) || 0;
  const total = T1 + T2;
  const totalPages = Math.max(1, Math.ceil(total / perPage) || 1);
  const safePage = Math.min(reqPage, totalPages);
  const start = (safePage - 1) * perPage;
  const end = Math.min(start + perPage, total);

  const rowsOut: Record<string, unknown>[] = [];

  const appendPinnedSlice = async (ps: number, pe: number) => {
    let idx = ps;
    while (idx < pe) {
      const wpPage = Math.floor(idx / perPage) + 1;
      const { payload } = await fetchWaitlistEntriesFromWp({
        page: wpPage,
        per_page: perPage,
        pinned: "1",
      });
      const chunk = normalizeWaitlistRows(payload);
      const offsetInChunk = idx % perPage;
      if (chunk.length <= offsetInChunk) break;
      const take = Math.min(pe - idx, chunk.length - offsetInChunk);
      rowsOut.push(...chunk.slice(offsetInChunk, offsetInChunk + take));
      idx += take;
    }
  };

  const appendUnpinnedSlice = async (us: number, ue: number) => {
    let localIdx = us - T1;
    const localEnd = ue - T1;
    while (localIdx < localEnd) {
      const wpPage = Math.floor(localIdx / perPage) + 1;
      const { payload } = await fetchWaitlistEntriesFromWp({
        page: wpPage,
        per_page: perPage,
        pinned: "0",
      });
      const chunk = normalizeWaitlistRows(payload);
      const offsetInChunk = localIdx % perPage;
      if (chunk.length <= offsetInChunk) break;
      const take = Math.min(localEnd - localIdx, chunk.length - offsetInChunk);
      rowsOut.push(...chunk.slice(offsetInChunk, offsetInChunk + take));
      localIdx += take;
    }
  };

  const ps = Math.max(start, 0);
  const pe = Math.min(end, T1);
  if (ps < pe) {
    await appendPinnedSlice(ps, pe);
  }

  const us = Math.max(start, T1);
  const ue = Math.min(end, T1 + T2);
  if (us < ue) {
    await appendUnpinnedSlice(us, ue);
  }

  return {
    rows: rowsOut,
    meta: {
      total: String(total),
      totalPages: String(totalPages),
    },
    safePage,
  };
}
