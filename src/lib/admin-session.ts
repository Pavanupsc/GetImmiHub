import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "waitlist_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "immihub-admin-dev-change-me";
}

export function createSessionToken(): string {
  const payload = JSON.stringify({
    v: 1 as const,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  const b64 = Buffer.from(payload, "utf8").toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(b64).digest("base64url");
  return `${b64}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token?.includes(".")) return false;
  const dot = token.indexOf(".");
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!b64 || !sig) return false;
  const expected = createHmac("sha256", getSecret()).update(b64).digest("base64url");
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(Buffer.from(b64, "base64url").toString("utf8")) as { v?: number; exp?: number };
    if (data.v !== 1 || typeof data.exp !== "number") return false;
    if (data.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value);
}
