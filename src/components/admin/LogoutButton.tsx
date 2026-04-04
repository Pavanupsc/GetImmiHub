"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { colors } from "@/lib/design-tokens";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      style={{
        padding: "10px 18px",
        borderRadius: "10px",
        border: `1px solid ${colors.border}`,
        background: colors.white,
        color: colors.textDark,
        fontWeight: 600,
        fontSize: "14px",
        fontFamily: "'Source Sans 3', sans-serif",
        cursor: busy ? "wait" : "pointer",
      }}
    >
      {busy ? "Signing out…" : "Log out"}
    </button>
  );
}
