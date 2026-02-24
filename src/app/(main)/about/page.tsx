"use client";

import { AnimatedSection } from "@/components/ui";
import { colors } from "@/lib/design-tokens";

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{
        padding: "100px 24px",
        background: colors.bluePale,
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 700,
              color: colors.blue, textTransform: "uppercase", letterSpacing: "2px",
              marginBottom: "12px",
            }}>Our Mission</p>
            <h1 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800,
              color: colors.navy, lineHeight: 1.15, marginBottom: "24px",
            }}>
              No Immigrant Should Lose Their Status Because of a{" "}
              <span style={{ color: colors.blue }}>Missed Deadline</span>
            </h1>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px",
              color: colors.gray500, lineHeight: 1.8,
            }}>
              ImmiHub was born from a simple truth: over 780,000 H-1B visa holders in America manage their most critical immigration deadlines with spreadsheets, calendar reminders, and scattered files across email, phones, and filing cabinets. One missed date can mean losing your job, your status, and the life you've built in the United States. We're building the tool that should have existed years ago.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ padding: "100px 24px", background: colors.warmWhite }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <AnimatedSection>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "28px", fontWeight: 800, color: colors.navy, marginBottom: "20px",
            }}>What We're Building</h2>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px",
              color: colors.gray600, lineHeight: 1.8, marginBottom: "40px",
            }}>
              ImmiHub is a secure document vault that stores your immigration documents, automatically extracts expiry dates using OCR, and sends you timely reminders before deadlines. Upload a photo of your Passport, I-797, I-94, Visa Stamp, or EAD — we handle the rest. It's like having a personal immigration assistant that never forgets a date.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "28px", fontWeight: 800, color: colors.navy, marginBottom: "20px",
            }}>Our Vision</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
              {[
                { phase: "Now", desc: "Secure vault + OCR + expiry reminders for H-1B holders" },
                { phase: "Next", desc: "AI-powered visa assistant and compliance engine" },
                { phase: "Then", desc: "Multi-visa support (F-1, Green Card, O-1, L-1, and more)" },
                { phase: "Beyond", desc: "Family vault, attorney portals, employer dashboards, global expansion" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "16px", padding: "16px 20px",
                  borderRadius: "16px", background: colors.gray50, border: `1px solid ${colors.gray100}`,
                  alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", fontWeight: 700,
                    color: colors.blue, textTransform: "uppercase", minWidth: "60px",
                  }}>{item.phase}</span>
                  <span style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", color: colors.gray600,
                  }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "28px", fontWeight: 800, color: colors.navy, marginBottom: "20px",
            }}>Our Approach</h2>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}>
              {[
                { title: "Free for Immigrants", desc: "Individual immigrants will never pay. We believe immigration tools should be accessible to everyone." },
                { title: "Privacy First", desc: "Your documents are encrypted, stored in the US on Microsoft Azure, and never shared without your explicit consent." },
                { title: "Built with Empathy", desc: "We understand the immigrant experience because we've lived it. Every feature is designed with your anxieties in mind." },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "24px 20px", borderRadius: "16px",
                  background: colors.bluePale, border: `1px solid ${colors.blueMist}`,
                }}>
                  <h3 style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px",
                    fontWeight: 700, color: colors.navy, marginBottom: "8px",
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
                    color: colors.gray600, lineHeight: 1.6,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
