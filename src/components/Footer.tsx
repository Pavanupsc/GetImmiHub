"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { colors, layout } from "@/lib/design-tokens";

/** Footer surface */
const FOOTER_BG = "#135380";

const navigateLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

const headingStyle = {
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: "13px",
  fontWeight: 700 as const,
  marginBottom: "18px",
  color: colors.white,
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
};

const linkStyle: CSSProperties = {
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: "15px",
  color: "rgba(255,255,255,0.88)",
  textDecoration: "none",
  transition: "color 0.2s, opacity 0.2s",
};

export function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        background: FOOTER_BG,
        color: colors.white,
        padding: "clamp(56px, 8vw, 88px) 0 clamp(28px, 5vw, 40px)",
      }}
    >
      <div style={{ maxWidth: layout.pageMaxWidth, margin: "0 auto", padding: `0 ${layout.pagePaddingX}` }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          className="site-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.35fr) repeat(3, minmax(0, 1fr))",
            gap: "clamp(32px, 5vw, 56px)",
            marginBottom: "clamp(36px, 5vw, 48px)",
          }}
        >
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "20px", textDecoration: "none" }}>
              <Image
                src="/Images/immihub-footer.png"
                alt="ImmiHub-footer-logo"
                width={140}
                height={40}
                style={{ height: "auto", width: "min(160px, 100%)", maxHeight: "40px", objectFit: "contain" }}
              />
            </Link>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.65,
                maxWidth: "300px",
                margin: 0,
              }}
            >
              Never miss an immigration deadline again. The secure document vault built for H-1B visa holders.
            </p>
          </div>

          <div>
            <h4 style={headingStyle}>Navigate</h4>
            <nav aria-label="Footer navigate" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {navigateLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={linkStyle}
                  className="site-footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 style={headingStyle}>Legal</h4>
            <nav aria-label="Footer legal" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={linkStyle}
                  className="site-footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 style={headingStyle}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="mailto:support@getimmihub.com"
                style={linkStyle}
                className="site-footer-link"
              >
                support@getimmihub.com
              </a>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.88)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Plano, Texas, USA
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.22)",
            paddingTop: "28px",
            textAlign: "center",
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.6,
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} ImmiHub. All rights reserved. ImmiHub is not affiliated with USCIS or any
            government agency.
          </p>
          <p style={{ margin: "12px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
            <a
              href="https://unsplash.com/?utm_source=getimmihub&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}
            >
              Imagery: Unsplash
            </a>
          </p>
        </div>
      </div>
        </div>
    </footer>
  );
}
