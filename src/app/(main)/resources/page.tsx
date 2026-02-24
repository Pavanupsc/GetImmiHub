"use client";

import { useState } from "react";
import { AnimatedSection, WaitlistForm } from "@/components/ui";
import { colors } from "@/lib/design-tokens";

type GuideItem = { doc: string; why: string; tracked?: boolean };

const guides: { title: string; subtitle: string; content: GuideItem[] }[] = [
  {
    title: "H-1B Document Checklist",
    subtitle: "Every document you need to track and why",
    content: [
      { doc: "Passport", why: "Your primary identity document. Must be valid for at least 6 months for most international travel. An expired passport can prevent boarding and re-entry.", tracked: true },
      { doc: "I-94 (Arrival/Departure Record)", why: "Proves your authorized stay period. Your I-94 date — not your visa stamp — determines how long you can legally stay.", tracked: true },
      { doc: "I-797 (Approval Notice)", why: "Your H-1B petition approval. Contains your validity dates and is required for H-1B extensions, transfers, and amendments.", tracked: true },
      { doc: "Visa Stamp", why: "Required for re-entry after international travel. If expired while abroad, you'll need to get a new stamp at a US consulate.", tracked: true },
      { doc: "Spouse EAD (if applicable)", why: "Your dependent's work authorization card. Renewal takes months — start early or your spouse may have a gap in work authorization.", tracked: true },
      { doc: "Employment Letter", why: "Proof of your current employment terms. Important for visa renewals, green card applications, and landlord/bank verifications.", tracked: false },
    ],
  },
  {
    title: "Understanding Expiry Dates",
    subtitle: "I-797 vs Visa Stamp vs I-94 — what expires when",
    content: [
      { doc: "I-797 Approval Period", why: "Typically 3 years. This is your H-1B petition validity. When this expires, you need an extension or a new petition." },
      { doc: "Visa Stamp", why: "Varies (usually matches I-797). Only matters for international travel and re-entry. Can be renewed at a US consulate abroad." },
      { doc: "I-94 Record", why: "Usually matches I-797 end date. This is the actual date you must leave or extend by. The most legally important date." },
      { doc: "Passport", why: "Typically 10 years. But many countries require 6+ months validity for entry. Renew well before expiry." },
      { doc: "EAD Card", why: "Usually 1-2 years. Renewal processing can take 3-6 months, so apply early to avoid work authorization gaps." },
    ],
  },
  {
    title: "What Happens If Documents Expire",
    subtitle: "Consequences and what to do",
    content: [
      { doc: "Expired Passport", why: "You can't board international flights. You can stay in the US but can't travel abroad. Renew through your home country's consulate." },
      { doc: "Expired I-797", why: "You're out of status if you didn't file an extension. Your employer should have filed Form I-129 before expiry. Consult an attorney immediately." },
      { doc: "Expired Visa Stamp", why: "You can stay in the US legally (status is tied to I-94, not visa stamp). But you can't re-enter the US after international travel without a valid stamp." },
      { doc: "Expired I-94", why: "This is the most serious. You're out of status and accruing unlawful presence. Contact an immigration attorney immediately." },
      { doc: "Expired EAD", why: "Your spouse must stop working immediately. There are automatic extensions in some cases — check with your attorney." },
    ],
  },
];

export default function ResourcesPage() {
  const [activeGuide, setActiveGuide] = useState(0);

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{
        padding: "100px 24px",
        background: colors.bluePale,
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 700,
              color: colors.blue, textTransform: "uppercase", letterSpacing: "2px",
              marginBottom: "12px",
            }}>H-1B Resources</p>
            <h1 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800,
              color: colors.navy, lineHeight: 1.15, marginBottom: "16px",
            }}>
              Your H-1B <span style={{ color: colors.blue }}>Knowledge Base</span>
            </h1>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px",
              color: colors.gray500, lineHeight: 1.7,
            }}>
              Practical guides to help you stay on top of your immigration documents and deadlines.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ padding: "60px 24px", background: colors.warmWhite }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap",
          }}>
            {guides.map((guide, i) => (
              <button key={i} onClick={() => setActiveGuide(i)} style={{
                padding: "10px 20px", borderRadius: "12px",
                border: `2px solid ${activeGuide === i ? colors.blue : colors.gray200}`,
                background: activeGuide === i ? colors.bluePale : colors.white,
                color: activeGuide === i ? colors.blue : colors.gray600,
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
              }}>
                {guide.title}
              </button>
            ))}
          </div>

          <div>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "28px", fontWeight: 800, color: colors.navy, marginBottom: "8px",
            }}>{guides[activeGuide].title}</h2>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px",
              color: colors.gray500, marginBottom: "32px",
            }}>{guides[activeGuide].subtitle}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {guides[activeGuide].content.map((item, i) => (
                <div key={i} style={{
                  padding: "20px 24px", borderRadius: "12px",
                  background: colors.gray50, border: `1px solid ${colors.gray100}`,
                  borderLeft: `4px solid ${colors.blue}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <h3 style={{
                      fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px",
                      fontWeight: 700, color: colors.gray800,
                    }}>{item.doc}</h3>
                    {item.tracked !== undefined && (
                      <span style={{
                        padding: "2px 8px", borderRadius: "4px", fontSize: "11px",
                        fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif",
                        background: item.tracked ? colors.greenLight : colors.gray200,
                        color: item.tracked ? colors.green : colors.gray500,
                      }}>
                        {item.tracked ? "Tracked by ImmiHub" : "Storage Only"}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
                    color: colors.gray600, lineHeight: 1.6,
                  }}>{item.why}</p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "40px", padding: "28px", borderRadius: "20px",
              background: colors.bluePale, border: `1px solid ${colors.blueMist}`,
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px",
                fontWeight: 600, color: colors.navy, marginBottom: "16px",
              }}>
                Want to track all these dates automatically?
              </p>
              <WaitlistForm variant="hero" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
