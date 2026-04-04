import { NextResponse } from "next/server";
import { getWaitlistEntriesUrl } from "@/lib/waitlist-entries";

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function extractWpMessage(data: unknown): string | undefined {
  if (data && typeof data === "object" && "message" in data && typeof (data as { message: unknown }).message === "string") {
    return (data as { message: string }).message;
  }
  return undefined;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { email, firstName, visaType, interests } = body as Record<string, unknown>;

  if (typeof email !== "string" || !email.trim() || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (typeof firstName !== "string" || !firstName.trim()) {
    return NextResponse.json({ error: "First name is required" }, { status: 400 });
  }
  if (typeof visaType !== "string" || !visaType.trim()) {
    return NextResponse.json({ error: "Visa type is required" }, { status: 400 });
  }

  let interestList: string[] = [];
  if (interests !== undefined) {
    if (!Array.isArray(interests) || !interests.every((x) => typeof x === "string")) {
      return NextResponse.json({ error: "interests must be an array of strings" }, { status: 400 });
    }
    interestList = interests;
  }

  const url = getWaitlistEntriesUrl();
  const payload = {
    email: email.trim(),
    firstName: firstName.trim(),
    visaType: visaType.trim(),
    interests: interestList,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      const msg =
        extractWpMessage(data) ||
        (typeof data === "object" && data !== null && "code" in data
          ? `Error ${String((data as { code: unknown }).code)}`
          : null) ||
        `Request failed (${res.status})`;
      return NextResponse.json(
        { error: msg, details: data },
        { status: res.status >= 400 && res.status < 600 ? res.status : 502 }
      );
    }

    return NextResponse.json(data ?? { ok: true });
  } catch (err) {
    console.error("waitlist proxy:", err);
    return NextResponse.json({ error: "Could not reach waitlist server" }, { status: 502 });
  }
}
