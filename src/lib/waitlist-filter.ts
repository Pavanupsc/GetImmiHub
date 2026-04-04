export type WaitlistAdminFilters = {
  q: string;
  visa: string;
  interest: string;
};

function lowerField(row: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v != null && v !== "") return String(v).toLowerCase();
  }
  return "";
}

function rowVisa(row: Record<string, unknown>): string {
  return String(row.visaType ?? row.visa_type ?? "").trim();
}

function rowInterestsList(row: Record<string, unknown>): string[] {
  const raw = row.interests ?? row.interest;
  if (Array.isArray(raw)) return raw.map((x) => String(x).trim()).filter(Boolean);
  if (typeof raw === "string") {
    const t = raw.trim();
    if (!t) return [];
    try {
      const parsed = JSON.parse(t) as unknown;
      if (Array.isArray(parsed)) return parsed.map((x) => String(x).trim()).filter(Boolean);
    } catch {
      /* not JSON */
    }
    return t.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export function hasActiveFilters(f: WaitlistAdminFilters): boolean {
  return Boolean(f.q.trim() || f.visa.trim() || f.interest.trim());
}

export function filterWaitlistRows(
  rows: Record<string, unknown>[],
  f: WaitlistAdminFilters
): Record<string, unknown>[] {
  const q = f.q.trim().toLowerCase();
  const visa = f.visa.trim();
  const interest = f.interest.trim();

  if (!q && !visa && !interest) return rows;

  return rows.filter((row) => {
    if (q) {
      const email = lowerField(row, ["email", "Email", "user_email"]);
      const name = lowerField(row, ["firstName", "first_name", "name", "display_name"]);
      if (!email.includes(q) && !name.includes(q)) return false;
    }
    if (visa && rowVisa(row) !== visa) return false;
    if (interest) {
      const list = rowInterestsList(row);
      if (!list.includes(interest)) return false;
    }
    return true;
  });
}
