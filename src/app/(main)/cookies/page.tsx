"use client";

import { colors, layout } from "@/lib/design-tokens";

export default function CookiesPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: `100px ${layout.pagePaddingX} 80px`, background: colors.warmWhite }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(32px, 5vw, 44px)",
              fontWeight: 800,
              color: colors.navy,
              marginBottom: "10px",
            }}
          >
            Cookies
          </h1>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "16px",
              color: colors.gray600,
              lineHeight: 1.7,
              maxWidth: "720px",
            }}
          >
            This website uses cookies and similar technologies to help it work, understand usage, and improve
            performance. If you have questions, contact{" "}
            <a href="mailto:support@getimmihub.com" style={{ color: colors.brandPrimary, textDecoration: "none" }}>
              support@getimmihub.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

