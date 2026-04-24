"use client";

import { colors, layout } from "@/lib/design-tokens";

export default function ContactPage() {
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
            Contact
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
            For help with the app or your account, email{" "}
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

