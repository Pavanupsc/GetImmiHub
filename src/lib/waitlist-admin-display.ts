export function formatWaitlistCell(value: unknown): string {
  if (value == null) return "—";
  if (Array.isArray(value)) return value.map((x) => String(x)).join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function getNumericEntryId(row: Record<string, unknown>): string | null {
  if (row.id == null) return null;
  const s = String(row.id).trim();
  return /^\d+$/.test(s) ? s : null;
}

export function isRowPinned(row: Record<string, unknown>): boolean {
  const p = row.pinned ?? row._waitlist_pinned;
  if (typeof p === "boolean") return p;
  if (p === 1 || p === "1") return true;
  if (p === 0 || p === "0" || p === false) return false;
  if (typeof p === "string") {
    const s = p.toLowerCase();
    if (s === "true" || s === "yes") return true;
    if (s === "false" || s === "no") return false;
  }
  return false;
}
