"use client";

import Image from "next/image";
import Link from "next/link";
import { colors } from "@/lib/design-tokens";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer style={{
      background: colors.navy, color: colors.white, padding: "60px 24px 30px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px", marginBottom: "40px",
        }}>
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "16px", textDecoration: "none" }}>
              <Image
                src="/Images/Immihub-logo.png"
                alt="ImmiHub"
                width={120}
                height={34}
                style={{ height: "34px", width: "auto", objectFit: "contain" }}
              />
            </Link>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
              color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: "280px",
            }}>
              Never miss an immigration deadline again. The secure document vault built for H-1B visa holders.
            </p>
          </div>

          <div>
            <h4 style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
              fontWeight: 700, marginBottom: "16px", color: "rgba(255,255,255,0.9)",
              textTransform: "uppercase", letterSpacing: "1px",
            }}>
              Navigate
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {links.slice(0, 4).map((link) => (
                <Link key={link.label} href={link.href} style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
                  color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = colors.brandPrimaryLight)}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
              fontWeight: 700, marginBottom: "16px", color: "rgba(255,255,255,0.9)",
              textTransform: "uppercase", letterSpacing: "1px",
            }}>
              Legal
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {links.slice(4).map((link) => (
                <Link key={link.label} href={link.href} style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
                  color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = colors.brandPrimaryLight)}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
              fontWeight: 700, marginBottom: "16px", color: "rgba(255,255,255,0.9)",
              textTransform: "uppercase", letterSpacing: "1px",
            }}>
              Contact
            </h4>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
              color: "rgba(255,255,255,0.6)", lineHeight: 1.8,
            }}>
              support@getimmihub.com<br />
              Plano, Texas, USA
            </p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "24px", textAlign: "center",
          fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px",
          color: "rgba(255,255,255,0.4)",
        }}>
          © 2025 ImmiHub. All rights reserved. ImmiHub is not affiliated with USCIS or any government agency.
          {" · "}
          <a href="https://unsplash.com/?utm_source=getimmihub&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>Imagery: Unsplash</a>
        </div>
      </div>
    </footer>
  );
}
