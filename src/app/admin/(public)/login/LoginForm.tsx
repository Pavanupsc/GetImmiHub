"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties, type FormEvent } from "react";
import { colors } from "@/lib/design-tokens";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "40px 36px",
        borderRadius: "16px",
        background: colors.white,
        boxShadow: "0 24px 48px rgba(26, 35, 50, 0.12)",
        border: `1px solid ${colors.border}`,
      }}
    >
      <h1
        style={{
          margin: "0 0 8px",
          fontSize: "24px",
          fontWeight: 700,
          color: colors.textDark,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        Admin login
      </h1>
      <p
        style={{
          margin: "0 0 28px",
          fontSize: "15px",
          color: colors.textBody,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        Sign in to view waitlist entries.
      </p>

      <label style={labelStyle}>
        Username
        <input
          type="text"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
      </label>

      <label style={{ ...labelStyle, marginTop: "16px" }}>
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
      </label>

      {error && (
        <div
          role="alert"
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: colors.dangerLight,
            color: colors.danger,
            fontSize: "14px",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        style={{
          marginTop: "24px",
          width: "100%",
          padding: "14px 20px",
          borderRadius: "10px",
          border: "none",
          background: colors.brandPrimary,
          color: colors.white,
          fontWeight: 700,
          fontSize: "16px",
          fontFamily: "'Source Sans 3', sans-serif",
          cursor: busy ? "wait" : "pointer",
        }}
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: colors.textBody,
  fontFamily: "'Source Sans 3', sans-serif",
};

const inputStyle: CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: `2px solid ${colors.border}`,
  fontSize: "16px",
  fontFamily: "'Source Sans 3', sans-serif",
  color: colors.textDark,
  boxSizing: "border-box",
};
