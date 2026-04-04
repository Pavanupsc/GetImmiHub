import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAdminSession } from "@/lib/admin-session";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { colors } from "@/lib/design-tokens";

export const metadata: Metadata = {
  title: "Waitlist admin · GetImmiHub",
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await getAdminSession())) redirect("/admin/login");

  return (
    <div style={{ minHeight: "100vh", background: colors.bgAlt }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
          padding: "16px 24px",
          borderBottom: `1px solid ${colors.border}`,
          background: colors.white,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
              color: colors.textDark,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Waitlist admin
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "13px",
              color: colors.textMuted,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Entries from WordPress
          </p>
        </div>
        <LogoutButton />
      </header>
      <main style={{ padding: "24px" }}>{children}</main>
    </div>
  );
}
