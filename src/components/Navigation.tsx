"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "@/lib/design-tokens";
import { MenuIcon, CloseIcon } from "./icons";

const navItems: { label: string; href: string; section?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/", section: "features" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string, section?: string) => {
    if (section) return pathname === "/" && false; // section highlight handled by scroll
    return pathname === href;
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "rgba(250,251,253,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${colors.border}` : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{
          cursor: "pointer", display: "flex", alignItems: "center",
          textDecoration: "none",
        }}>
          <Image
            src="/Images/Immihub-logo.png"
            alt="ImmiHub"
            width={140}
            height={40}
            style={{ height: "40px", width: "auto", objectFit: "contain" }}
            priority
          />
        </Link>

        <div className="desktop-nav" style={{
          display: "flex", alignItems: "center", gap: "32px",
        }}>
          {navItems.map((item) => (
            item.section ? (
              <Link key={item.label} href="/#features" style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 500,
                color: colors.textBody, transition: "color 0.2s", padding: 0, textDecoration: "none",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = colors.brandPrimary)}
              onMouseOut={(e) => (e.currentTarget.style.color = colors.textBody)}
              >
                {item.label}
              </Link>
            ) : (
              <Link key={item.label} href={item.href} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 500,
                color: isActive(item.href) ? colors.brandPrimary : colors.textBody,
                transition: "color 0.2s", padding: 0, textDecoration: "none",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = colors.brandPrimary)}
              onMouseOut={(e) => (e.currentTarget.style.color = isActive(item.href) ? colors.brandPrimary : colors.textBody)}
              >
                {item.label}
              </Link>
            )
          ))}
          <Link href="/" style={{
            padding: "12px 24px", borderRadius: "12px", border: "none",
            background: colors.accentGreen,
            color: colors.white, fontWeight: 600, fontSize: "14px",
            fontFamily: "'Source Sans 3', sans-serif", cursor: "pointer",
            boxShadow: "0 2px 8px rgba(52,184,124,0.25)",
            textDecoration: "none", display: "inline-block",
          }}
          >
            Get Early Access
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          color: colors.textDark, padding: "4px",
        }}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: colors.white,           borderBottom: `1px solid ${colors.border}`,
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.section ? "/#features" : item.href} onClick={() => setMobileOpen(false)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px", fontWeight: 500,
              color: colors.textDark, padding: "8px 0", textDecoration: "none",
            }}>
              {item.label}
            </Link>
          ))}
          <Link href="/" onClick={() => setMobileOpen(false)} style={{
            padding: "14px", borderRadius: "12px", border: "none",
            background: colors.accentGreen, color: colors.white,
            fontWeight: 600, fontSize: "15px", fontFamily: "'Source Sans 3', sans-serif",
            cursor: "pointer", marginTop: "4px", textAlign: "center", textDecoration: "none",
          }}>
            Get Early Access
          </Link>
        </div>
      )}
    </nav>
  );
}
