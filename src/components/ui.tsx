"use client";

import { useState, useEffect, useCallback } from "react";
import { track } from "@vercel/analytics";
import { colors } from "@/lib/design-tokens";
import { ChevronIcon, CheckCircleIcon, CloseIcon, MailIcon } from "./icons";
import { WAITLIST_INTEREST_OPTIONS as INTEREST_OPTIONS, WAITLIST_VISA_TYPES as VISA_TYPES } from "@/lib/waitlist-options";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [visaType, setVisaType] = useState<(typeof VISA_TYPES)[number] | "">("");
  const [interests, setInterests] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isHero = variant === "hero";
  const buttonPadding = isHero ? "18px 36px" : "14px 28px";
  const buttonRadius = isHero ? "12px" : "10px";
  const fontSize = isHero ? "17px" : "15px";

  const resetModalFields = () => {
    setFirstName("");
    setVisaType("");
    setInterests({});
  };

  const resetAll = () => {
    setEmail("");
    setFirstName("");
    setVisaType("");
    setInterests({});
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
    resetModalFields();
    setSubmitError(null);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen, closeModal]);

  const toggleInterest = (key: string) => {
    setInterests((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitError(null);
    setSubmitting(true);
    const selectedInterests = INTEREST_OPTIONS.filter((o) => interests[o]);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          visaType,
          interests: selectedInterests,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setSubmitError(
          typeof data.error === "string" && data.error
            ? data.error
            : "Something went wrong. Please try again."
        );
        return;
      }

      track("waitlist_signup", {
        variant,
        visa_type: visaType,
        interests: selectedInterests.join(", ") || undefined,
        interest_count: selectedInterests.length,
      });
      setSubmitted(true);
      resetAll();
      setModalOpen(false);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: `2px solid ${colors.border}`,
    background: colors.white,
    color: colors.textDark,
    fontSize: "16px",
    fontFamily: "'Source Sans 3', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: colors.textBody,
    marginBottom: "6px",
    fontFamily: "'Source Sans 3', sans-serif",
  };

  if (submitted) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "18px 24px", borderRadius: "14px",
        background: colors.greenLight, color: colors.green,
        fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
      }}>
        <CheckCircleIcon /> You&apos;re on the list! We&apos;ll notify you when ImmiHub launches.
      </div>
    );
  }

  const inputPadding = isHero ? "18px 20px 18px 52px" : "14px 16px 14px 44px";
  const inputRadius = isHero ? "12px" : "10px";

  const openModalFromInline = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <form
        onSubmit={openModalFromInline}
        style={{
          display: "flex",
          gap: isHero ? "12px" : "8px",
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: isHero ? "100%" : "480px",
          alignItems: "stretch",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 280px", minWidth: "200px" }}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: inputPadding,
              borderRadius: inputRadius,
              border: `2px solid ${isHero ? colors.border : "rgba(255,255,255,0.3)"}`,
              background: isHero ? colors.white : "rgba(255,255,255,0.1)",
              color: isHero ? colors.textDark : colors.white,
              fontSize,
              fontFamily: "'Source Sans 3', sans-serif",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => { (e.target as HTMLElement).style.borderColor = colors.brandPrimary; }}
            onBlur={(e) => { (e.target as HTMLElement).style.borderColor = isHero ? colors.border : "rgba(255,255,255,0.3)"; }}
          />
          <div style={{
            position: "absolute",
            left: isHero ? "18px" : "14px",
            top: "50%",
            transform: "translateY(-50%)",
            color: isHero ? colors.textMuted : "rgba(255,255,255,0.5)",
            pointerEvents: "none",
          }}>
            <MailIcon />
          </div>
        </div>
        <button
          type="submit"
          style={{
            padding: buttonPadding,
            borderRadius: buttonRadius,
            border: "none",
            background: isHero ? colors.accentGreen : colors.white,
            color: isHero ? colors.white : colors.textDark,
            fontWeight: 700,
            fontSize,
            fontFamily: "'Source Sans 3', sans-serif",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: isHero ? "0 4px 14px rgba(52,184,124,0.25)" : "none",
          }}
        >
          Join the Waitlist
        </button>
      </form>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 16px",
            background: "rgba(26, 35, 50, 0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "480px",
              maxHeight: "min(90vh, 720px)",
              overflowY: "auto",
              padding: "28px 24px 24px",
              borderRadius: "16px",
              background: colors.white,
              boxShadow: "0 24px 48px rgba(26, 35, 50, 0.18)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                padding: "8px",
                border: "none",
                background: "transparent",
                color: colors.textMuted,
                cursor: "pointer",
                borderRadius: "8px",
                lineHeight: 0,
              }}
            >
              <CloseIcon />
            </button>

            <h2
              id="waitlist-modal-title"
              style={{
                margin: "0 40px 8px 0",
                fontSize: "22px",
                fontWeight: 700,
                color: colors.textDark,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Join the waitlist
            </h2>
            <p style={{
              margin: "0 0 20px",
              fontSize: "15px",
              color: colors.textBody,
              lineHeight: 1.5,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>
              Tell us a bit about you — we&apos;ll use your email as your signup reference.
            </p>

            <form onSubmit={handleModalSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <span style={labelStyle}>Email address</span>
                <div
                  style={{
                    ...inputStyle,
                    background: colors.bgAlt,
                    color: colors.textBody,
                    borderColor: colors.border,
                  }}
                >
                  {email || "—"}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="waitlist-first" style={labelStyle}>
                  First name <span style={{ color: colors.danger }}>*</span>
                </label>
                <input
                  id="waitlist-first"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = colors.brandPrimary; }}
                  onBlur={(e) => { e.target.style.borderColor = colors.border; }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="waitlist-visa" style={labelStyle}>
                  Visa type <span style={{ color: colors.danger }}>*</span>
                </label>
                <select
                  id="waitlist-visa"
                  name="visaType"
                  required
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value as (typeof VISA_TYPES)[number])}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    appearance: "auto",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = colors.brandPrimary; }}
                  onBlur={(e) => { e.target.style.borderColor = colors.border; }}
                >
                  <option value="" disabled>
                    Select visa type
                  </option>
                  {VISA_TYPES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset style={{ margin: "0 0 20px", padding: 0, border: "none" }}>
                <legend style={{ ...labelStyle, marginBottom: "10px" }}>
                  What interests you most? <span style={{ fontWeight: 400, color: colors.textMuted }}>(optional)</span>
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {INTEREST_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        cursor: "pointer",
                        fontSize: "15px",
                        color: colors.textDark,
                        fontFamily: "'Source Sans 3', sans-serif",
                        lineHeight: 1.4,
                      }}
                    >
                      <input
                        type="checkbox"
                        name="interests"
                        value={opt}
                        checked={!!interests[opt]}
                        onChange={() => toggleInterest(opt)}
                        style={{ marginTop: "3px", width: "18px", height: "18px", accentColor: colors.brandPrimary, cursor: "pointer" }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>

              {submitError && (
                <div
                  role="alert"
                  style={{
                    marginBottom: "16px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: colors.dangerLight,
                    color: colors.danger,
                    fontSize: "14px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    lineHeight: 1.45,
                  }}
                >
                  {submitError}
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  style={{
                    padding: "14px 22px",
                    borderRadius: "10px",
                    border: `2px solid ${colors.border}`,
                    background: colors.bgAlt,
                    color: colors.textDark,
                    fontWeight: 600,
                    fontSize: "15px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "10px",
                    border: "none",
                    background: colors.accentGreen,
                    color: colors.white,
                    fontWeight: 700,
                    fontSize: "15px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 14px rgba(52,184,124,0.25)",
                    opacity: submitting ? 0.85 : 1,
                  }}
                >
                  {submitting ? "Submitting…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
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
