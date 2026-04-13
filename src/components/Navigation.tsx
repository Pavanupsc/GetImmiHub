"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors, layout } from "@/lib/design-tokens";
import { WaitlistForm } from "@/components/ui";
import { MenuIcon, CloseIcon } from "./icons";

const navItems: { label: string; href: string; section?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/", section: "features" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
];

const linkBase = {
  background: "none" as const,
  border: "none" as const,
  cursor: "pointer" as const,
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  color: colors.textDark,
  transition: "color 0.2s",
  padding: 0,
  textDecoration: "none" as const,
};

const ghostCta = {
  padding: "10px 22px",
  borderRadius: "14px",
  border: `1px solid ${colors.brandPrimary}`,
  background: "transparent",
  color: colors.brandPrimary,
  fontWeight: 600,
  fontSize: "14px",
  fontFamily: "'Source Sans 3', sans-serif",
  cursor: "pointer" as const,
  textDecoration: "none" as const,
  display: "inline-block" as const,
  transition: "background 0.2s, border-color 0.2s, color 0.2s",
};

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
    if (section) return pathname === "/" && false;
    return pathname === href;
  };

  const renderNavLink = (item: (typeof navItems)[0]) => {
    const active = isActive(item.href, item.section);
    const color = active ? colors.brandPrimary : colors.textDark;
    const handlers = {
      onMouseOver: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.color = colors.brandPrimary;
      },
      onMouseOut: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.color = active ? colors.brandPrimary : colors.textDark;
      },
    };
    if (item.section) {
      return (
        <Link
          key={item.label}
          href="/#features"
          style={{ ...linkBase, color }}
          {...handlers}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <Link
        key={item.label}
        href={item.href}
        style={{ ...linkBase, color }}
        {...handlers}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "14px 0" : "18px 0",
        background: colors.white,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${colors.border}` : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.04)" : "none",
        transition: "padding 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <div
        style={{
          maxWidth: layout.pageMaxWidth,
          margin: "0 auto",
          padding: `0 ${layout.pagePaddingX}`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          minHeight: 44,
        }}
      >
        <Link
          href="/"
          style={{
            cursor: "pointer",
            textDecoration: "none",
            position: "relative",
            zIndex: 2,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/Images/immihib-icon.png"
            alt="ImmiHub"
            width={180}
            height={56}
            style={{ height: "42px", width: "auto", objectFit: "contain" }}
            priority
          />
        </Link>

        <div
          className="desktop-nav"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
              pointerEvents: "auto",
            }}
          >
            {navItems.map((item) => renderNavLink(item))}
          </div>
        </div>

        <div className="desktop-nav" style={{ marginLeft: "auto", position: "relative", zIndex: 2 }}>
          <WaitlistForm variant="button" buttonLabel="Get Early Access" />
        </div>

        <button
          className="mobile-menu-btn"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: colors.textDark,
            padding: "4px",
            marginLeft: "auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: colors.white,
            borderBottom: `1px solid ${colors.border}`,
            padding: `16px ${layout.pagePaddingX}`,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.section ? "/#features" : item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: colors.textDark,
                padding: "8px 0",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ marginTop: "4px" }} onClick={() => setMobileOpen(false)}>
            <WaitlistForm variant="button" buttonLabel="Get Early Access" />
          </div>
        </div>
      )}
    </nav>
  );
}
