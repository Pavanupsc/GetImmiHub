import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getWaitlistEntriesUrl } from "@/lib/waitlist-entries";

export async function PATCH(
  _request: Request,
  segmentCtx: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await segmentCtx.params;
  const trimmed = id?.trim();
  if (!trimmed || !/^\d+$/.test(trimmed)) {
    return NextResponse.json({ error: "Invalid entry id" }, { status: 400 });
  }

  const entriesUrl = getWaitlistEntriesUrl().replace(/\/$/, "");
  const wpUrl = `${entriesUrl}/${encodeURIComponent(trimmed)}/pin`;

  try {
    const res = await fetch(wpUrl, {
      method: "PATCH",
      headers: { Accept: "application/json" },
      cache: "no-store",
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
        data && typeof data === "object" && data !== null && "message" in data
          ? String((data as { message: unknown }).message)
          : `Request failed (${res.status})`;
      return NextResponse.json({ error: msg, details: data }, { status: res.status });
    }

    return NextResponse.json(data ?? { success: true });
  } catch (err) {
    console.error("waitlist pin:", err);
    return NextResponse.json({ error: "Could not reach waitlist server" }, { status: 502 });
  }
}
