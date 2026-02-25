"use client";

import { useState, useEffect } from "react";
import { track } from "@vercel/analytics";
import { colors } from "@/lib/design-tokens";
import { ChevronIcon, MailIcon, CheckCircleIcon } from "./icons";

/** Simple wrapper — no scroll-triggered animation. Kept for API compatibility. */
export function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

/** Optional: subtle fade on mount only. Use for hero or similar one-time effect. */
export function HeroFade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div
      className={className}
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {children}
    </div>
  );
}

export function WaitlistForm({ variant = "hero" }: { variant?: "hero" | "footer" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      track("waitlist_signup", { variant });
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "18px 24px", borderRadius: "14px",
        background: colors.greenLight, color: colors.green,
        fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
      }}>
        <CheckCircleIcon /> You're on the list! We'll notify you when ImmiHub launches.
      </div>
    );
  }

  const isHero = variant === "hero";

  const inputPadding = isHero ? "18px 20px 18px 52px" : "14px 16px 14px 44px";
  const inputRadius = isHero ? "12px" : "10px";
  const buttonPadding = isHero ? "18px 36px" : "14px 28px";
  const buttonRadius = isHero ? "12px" : "10px";
  const fontSize = isHero ? "17px" : "15px";

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", gap: isHero ? "12px" : "8px",
      flexDirection: "row",
      flexWrap: "wrap",
      maxWidth: isHero ? "100%" : "480px",
    }}>
      <div style={{ position: "relative", flex: "1 1 280px", minWidth: "200px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%", padding: inputPadding,
            borderRadius: inputRadius,             border: `2px solid ${isHero ? colors.border : "rgba(255,255,255,0.3)"}`,
            background: isHero ? colors.white : "rgba(255,255,255,0.1)",
            color: isHero ? colors.textDark : colors.white,
            fontSize, fontFamily: "'Source Sans 3', sans-serif",
            outline: "none", transition: "border-color 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target as HTMLElement).style.borderColor = colors.brandPrimary}
          onBlur={(e) => (e.target as HTMLElement).style.borderColor = isHero ? colors.border : "rgba(255,255,255,0.3)"}
        />
        <div style={{
          position: "absolute", left: isHero ? "18px" : "14px", top: "50%", transform: "translateY(-50%)",
          color: isHero ? colors.textMuted : "rgba(255,255,255,0.5)", pointerEvents: "none",
        }}>
          <MailIcon />
        </div>
      </div>
      <button type="submit" style={{
        padding: buttonPadding, borderRadius: buttonRadius, border: "none",
        background: isHero ? colors.accentGreen : colors.white,
        color: isHero ? colors.white : colors.textDark,
        fontWeight: 700, fontSize, fontFamily: "'Source Sans 3', sans-serif",
        cursor: "pointer", whiteSpace: "nowrap",
        boxShadow: isHero ? "0 4px 14px rgba(52,184,124,0.25)" : "none",
      }}
      >
        Join the Waitlist
      </button>
    </form>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {items.map((item, i) => (
        <div key={i} style={{
          border: `1px solid ${openIndex === i ? colors.brandPrimary : colors.border}`,
          borderRadius: "16px", overflow: "hidden", transition: "all 0.2s",
          background: openIndex === i ? colors.brandPrimaryPale : colors.white,
        }}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
            width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between",
            alignItems: "center", background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", fontWeight: 600,
            color: colors.textDark, textAlign: "left",
          }}>
            {item.q}
            <ChevronIcon open={openIndex === i} />
          </button>
          <div style={{
            maxHeight: openIndex === i ? "300px" : "0", overflow: "hidden",
            transition: "max-height 0.3s ease-in-out",
          }}>
            <div style={{
              padding: "0 20px 18px", fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "14px", color: colors.textBody, lineHeight: 1.7,
            }}>
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
