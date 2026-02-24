"use client";

import Image from "next/image";
import { AnimatedSection, HeroFade, WaitlistForm } from "@/components/ui";
import { colors } from "@/lib/design-tokens";
import {
  ShieldIcon,
  LockIcon,
  CloudIcon,
  TrashIcon,
  GlobeIcon,
} from "@/components/icons";

// Immigration-relevant imagery: Unsplash (passport, travel docs, diverse professionals). Attribution in footer.
const IMAGES = {
  // Hero: warm, personal (WhatsApp-style) — person with smartphone
  hero: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=85",
  problem: [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80", // passport / airport
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", // professionals collaborating
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80", // documents (scattered)
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",   // calendar / tracking
  ],
  howItWorks: [
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80", // person smartphone / upload
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500&q=80", // passport / document scan
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80", // person relaxed / team
  ],
  features: [
    "https://images.pexels.com/photos/1370294/pexels-photo-1370294.jpeg?w=500&q=80",   // secure document vault (file cabinet / safe storage)
    "https://images.pexels.com/photos/9810172/pexels-photo-9810172.jpeg?w=500&q=80",   // smart expiry tracking (calendar with pins / deadlines)
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500&q=80", // passport — OCR (no duplicate)
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80",   // notification / device
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80", // diverse professional
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80", // diverse group / conversation
  ],
} as const;

export function HomePage() {
  return (
    <div>
      {/* Hero — bigger, more inviting; warm personal image; prominent waitlist; clean minimal bg */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: colors.bgWhite,
        padding: "140px clamp(24px, 5vw, 64px) 160px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative" }}>
          <HeroFade>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 8vw, 120px)", alignItems: "center",
          }} className="hero-grid">
            <div>
              <div style={{
                display: "inline-block", padding: "10px 20px", borderRadius: "100px",
                background: colors.brandPrimaryPale, color: colors.brandPrimary,
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 700,
                marginBottom: "28px", border: `1px solid ${colors.brandPrimaryLight}`,
              }}>
                🚀 Coming Soon — Join the Waitlist
              </div>
              <h1 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(48px, 6.5vw, 80px)", fontWeight: 800,
                color: colors.textDark, lineHeight: 1.05, marginBottom: "28px",
                letterSpacing: "-1px",
              }}>
                Never Miss an Immigration{" "}
                <span style={{ color: colors.brandPrimary }}>
                  Deadline Again
                </span>
              </h1>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "clamp(18px, 2vw, 21px)",
                color: colors.textBody, lineHeight: 1.75, marginBottom: "40px",
                maxWidth: "520px",
              }}>
                ImmiHub securely stores your H-1B documents, automatically extracts expiry dates, and sends you reminders before deadlines hit. Free for all immigrants.
              </p>
              <div style={{
                background: colors.white,
                padding: "36px 44px",
                borderRadius: "24px",
                boxShadow: "0 8px 32px rgba(26,35,50,0.06), 0 0 0 1px rgba(26,35,50,0.06)",
                maxWidth: "560px",
              }}>
                <WaitlistForm variant="hero" />
              </div>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
                color: colors.textMuted, marginTop: "24px",
              }}>
                ✓ Free forever for individuals &nbsp;&nbsp; ✓ No spam, just launch updates
              </p>
            </div>

            <div>
              <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                  position: "relative", width: "100%", maxWidth: "600px", aspectRatio: "4/5",
                  borderRadius: "28px", overflow: "hidden", boxShadow: "0 32px 64px rgba(26,35,50,0.08), 0 0 0 1px rgba(26,35,50,0.06)",
                }}>
                  <Image
                    src={IMAGES.hero}
                    alt="Diverse professional with smartphone — warm, personal. Stay on top of your immigration documents."
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          </HeroFade>
        </div>
      </section>

      {/* The Problem — alternating image left / right; bg-alt for rhythm */}
      <section style={{ padding: "180px clamp(24px, 5vw, 48px)", background: colors.bgAlt }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 700, color: colors.brandPrimary, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>The Problem</p>
            <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800, color: colors.textDark, marginBottom: "24px", lineHeight: 1.2 }}>
              780,000+ H-1B Holders. <span style={{ color: colors.brandPrimary }}>Zero Tools Built for Them.</span>
            </h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", color: colors.textBody, maxWidth: "640px", lineHeight: 1.75, marginBottom: "80px" }}>
              One missed deadline can mean losing your job, your status, and your life in the US. Yet most H-1B holders manage critical dates with spreadsheets and scattered files.
            </p>
          </AnimatedSection>

          {[
            { image: IMAGES.problem[0], title: "Passport Expires at the Airport", desc: "Caught at the boarding gate with an expired passport. Trip cancelled, money lost.", imageLeft: true },
            { image: IMAGES.problem[1], title: "Missed I-797 Renewal", desc: "Forgot the renewal deadline buried in an old email. Now scrambling for emergency filing.", imageLeft: false },
            { image: IMAGES.problem[2], title: "Documents Everywhere", desc: "Scattered across email, phone photos, filing cabinets, and old laptops. Nothing organized.", imageLeft: true },
            { image: IMAGES.problem[3], title: "Tracking in Spreadsheets", desc: "Manually entering dates into Google Sheets and hoping calendar reminders work.", imageLeft: false },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", marginBottom: i < 3 ? "140px" : 0,
              }} className="problem-row">
                <div style={{ order: item.imageLeft ? 1 : 2 }} className="problem-image">
                  <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: "24px", overflow: "hidden" }}>
                    <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 500px" style={{ objectFit: "cover" }} />
                  </div>
                </div>
                <div style={{ order: item.imageLeft ? 2 : 1 }} className="problem-text">
                  <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, color: colors.textDark, marginBottom: "16px", lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: colors.textBody, lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* How It Works — image left, simple list right; warm white */}
      <section style={{ padding: "180px clamp(24px, 5vw, 48px)", background: colors.bgWhite }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="how-row">
            <AnimatedSection>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", maxWidth: "480px", borderRadius: "28px", overflow: "hidden" }}>
                <Image src={IMAGES.howItWorks[0]} alt="Upload documents from your phone" fill sizes="(max-width: 900px) 100vw, 480px" style={{ objectFit: "cover" }} />
              </div>
            </AnimatedSection>
            <div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 700, color: colors.brandPrimary, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>How It Works</p>
              <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800, color: colors.textDark, marginBottom: "48px", lineHeight: 1.2 }}>
                Three Steps to <span style={{ color: colors.brandPrimary }}>Peace of Mind</span>
              </h2>
              {[
                { step: "01", title: "Upload", desc: "Snap a photo or upload your documents — Passport, I-94, I-797, Visa Stamp, or EAD." },
                { step: "02", title: "Auto-Extract", desc: "Our OCR reads your expiry dates automatically. You review and confirm — always in control." },
                { step: "03", title: "Relax", desc: "Get push and email reminders at 180 and 90 days before every deadline. Never miss a date." },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div style={{ marginBottom: "48px" }}>
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "14px", fontWeight: 800, color: colors.brandPrimary, letterSpacing: "1px" }}>{item.step}</span>
                    <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "22px", fontWeight: 700, color: colors.textDark, marginTop: "8px", marginBottom: "12px" }}>{item.title}</h3>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px", color: colors.textBody, lineHeight: 1.75 }}>{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features — left-aligned intro, then grid; bg-alt for rhythm */}
      <section id="features" style={{ padding: "180px clamp(24px, 5vw, 48px)", background: colors.bgAlt }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 700, color: colors.brandPrimary, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Features</p>
            <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800, color: colors.textDark, marginBottom: "16px", lineHeight: 1.2 }}>
              Everything You Need, <span style={{ color: colors.brandPrimary }}>Nothing You Don't</span>
            </h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: colors.textBody, lineHeight: 1.7, marginBottom: "64px", maxWidth: "560px" }}>One secure place for your documents, deadlines, and reminders.</p>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "36px" }}>
            {[
              { image: IMAGES.features[0], title: "Secure Document Vault", desc: "Your immigration documents stored safely on Microsoft Azure with encryption at rest and in transit." },
              { image: IMAGES.features[1], title: "Smart Expiry Tracking", desc: "Automatic deadline monitoring for every document type. Know exactly when things expire." },
              { image: IMAGES.features[2], title: "OCR Date Extraction", desc: "Snap a photo — our AI reads expiry dates from your documents automatically. You always confirm." },
              { image: IMAGES.features[3], title: "Push + Email Reminders", desc: "Get notified 180 days and 90 days before every deadline. Enough time to take action." },
              { image: IMAGES.features[4], title: "Built for H-1B", desc: "Designed specifically for H-1B visa holders. Passport, I-94, I-797, Visa Stamp, and EAD tracking." },
              { image: IMAGES.features[5], title: "Guided Onboarding", desc: "Our Immi Bot walks you through setup step by step. No confusing forms — just a simple conversation." },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div style={{
                  borderRadius: "20px", background: colors.white, border: `1px solid ${colors.border}`,
                  textAlign: "left", overflow: "hidden",
                }}>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                    <Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, 300px" style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "24px 20px" }}>
                    <h3 style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px", fontWeight: 700, color: colors.textDark, marginBottom: "8px" }}>{item.title}</h3>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: colors.textBody, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap — left-aligned, simple list; warm white */}
      <section style={{ padding: "180px clamp(24px, 5vw, 48px)", background: colors.bgWhite }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 700, color: colors.brandPrimary, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Roadmap</p>
            <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 4vw, 40px)", fontWeight: 800, color: colors.textDark, marginBottom: "20px", lineHeight: 1.2 }}>What's Coming Next</h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: colors.textBody, lineHeight: 1.8, marginBottom: "56px" }}>We're just getting started. Here's where ImmiHub is heading.</p>
          </AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {[
              { title: "AI-Powered Visa Assistant", desc: "Ask questions about your immigration situation and get personalized guidance." },
              { title: "Compliance Engine", desc: "Track your visa status, count days in the US, and assess travel risks." },
              { title: "Multi-Visa Support", desc: "F-1, Green Card, O-1, L-1 — every visa type gets its own toolkit." },
              { title: "Family Vault", desc: "Manage documents for your spouse and dependents in one place." },
              { title: "Attorney & Employer Portals", desc: "Seamless collaboration with your immigration lawyer and HR team." },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", textAlign: "left" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: colors.brandPrimary, flexShrink: 0, marginTop: "10px" }} />
                  <div>
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px", fontWeight: 700, color: colors.textDark }}>{item.title}</span>
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", color: colors.textBody, marginLeft: "8px", lineHeight: 1.6 }}>— {item.desc}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — casual quotes, no stars; bg-alt */}
      <section style={{ padding: "180px clamp(24px, 5vw, 48px)", background: colors.bgAlt }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <AnimatedSection>
            <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, color: colors.textDark, marginBottom: "48px", lineHeight: 1.2 }}>What people are saying</h2>
          </AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {[
              { quote: "I almost missed my I-797 renewal — the date was buried in an old email. Something like this would've saved me a lot of stress.", name: "Priya S." },
              { quote: "Every time I travel I'm digging through my phone and email to check passport, visa stamp, I-94... Having it in one place would be huge.", name: "Rahul M." },
              { quote: "My spouse's EAD renewal snuck up on us and she couldn't work for months. Reminders would've made a real difference.", name: "Amit K." },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: colors.textBody, lineHeight: 1.75, marginBottom: "12px" }}>"{item.quote}"</p>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: colors.textMuted }}>— {item.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Security — light, reassuring trust badges; warm white */}
      <section style={{ padding: "180px clamp(24px, 5vw, 48px)", background: colors.bgWhite }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, color: colors.textDark, marginBottom: "12px", lineHeight: 1.3 }}>
              Your data is safe
            </h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: colors.textBody, marginBottom: "48px", lineHeight: 1.6 }}>
              We use industry-standard security so you can focus on what matters.
            </p>
          </AnimatedSection>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px 40px" }}>
            {[
              { icon: <CloudIcon />, text: "Microsoft Azure Cloud" },
              { icon: <LockIcon />, text: "Encrypted at rest & in transit" },
              { icon: <ShieldIcon />, text: "No biometric data collected" },
              { icon: <GlobeIcon />, text: "US-based data storage" },
              { icon: <TrashIcon />, text: "Delete your data anytime" },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  color: colors.textBody, minWidth: "140px",
                }}>
                  <div style={{ color: colors.brandPrimary, flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 500, color: colors.textBody, textAlign: "left" }}>{item.text}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — charcoal footer band (#1A2332); green CTA in form */}
      <section style={{ padding: "180px clamp(24px, 5vw, 48px)", background: colors.textDark, textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <AnimatedSection>
            <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800, color: colors.white, marginBottom: "24px", lineHeight: 1.2 }}>
              Be the First to Know When ImmiHub Launches
            </h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.65)", marginBottom: "40px", lineHeight: 1.75 }}>
              Free for all H-1B holders. No spam, just launch updates.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WaitlistForm variant="footer" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
