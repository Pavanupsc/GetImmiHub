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
                background: colors.warningLight, color: colors.warning,
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", fontWeight: 700,
                marginBottom: "28px", border: `1px solid ${colors.warning}`,
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
                One secure place to store your H-1B documents, track every expiry date, and get reminders months before deadlines arrive. So you can stop worrying and start living.
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
              780,000+ H-1B Holders. <span style={{ color: colors.brandPrimary }}>No One Looking Out for Their Deadlines.</span>
            </h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", color: colors.textBody, maxWidth: "640px", lineHeight: 1.75, marginBottom: "80px" }}>
              A single missed date can put your job, your status, and your entire life in the US at risk. Yet there's no tool built specifically to help you stay on top of it all.
            </p>
          </AnimatedSection>

          {[
            { image: IMAGES.problem[0], title: "An Expired Passport You Didn't See Coming", desc: "You're at the boarding gate, bags checked, ready to go — and the agent tells you your passport expired last month. Trip cancelled, money gone, and a stressful renewal ahead.", imageLeft: true },
            { image: IMAGES.problem[1], title: "A Renewal Deadline Lost in Your Inbox", desc: "Your I-797 approval notice arrived a year ago. The renewal date was buried somewhere in that email. By the time you realize it, you're filing on an emergency basis and hoping for the best.", imageLeft: false },
            { image: IMAGES.problem[2], title: "Critical Documents Scattered Everywhere", desc: "Some are in your email, some in phone photos, some in a folder at home you haven't opened in months. When you need something urgently, you can never find it fast enough.", imageLeft: true },
            { image: IMAGES.problem[3], title: "Spreadsheets and Calendar Reminders That Fail You", desc: "You've tried tracking dates in Google Sheets and setting phone reminders. But life gets busy, entries go stale, and the one date you forgot to add is the one that matters most.", imageLeft: false },
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
                { step: "01", title: "Upload Your Documents", desc: "Snap a photo or upload a file — Passport, I-94, I-797, Visa Stamp, or EAD. It takes less than a minute to get everything in one secure place." },
                { step: "02", title: "We Read the Dates for You", desc: "Our OCR technology scans your documents and pulls out expiry dates automatically. You review and confirm everything before it's saved — you're always in control." },
                { step: "03", title: "Relax and Live Your Life", desc: "ImmiHub watches your deadlines and sends you push notifications and email reminders at 180 days and 90 days before each one. No more mental math, no more surprises." },
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
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: colors.textBody, lineHeight: 1.7, marginBottom: "64px", maxWidth: "560px" }}>Built from the ground up for H-1B holders. One secure home for your documents, your deadlines, and your peace of mind.</p>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "36px" }}>
            {[
              { image: IMAGES.features[0], title: "Secure Document Vault", desc: "All your immigration documents in one encrypted vault, hosted on Microsoft Azure. Access them anytime, from any device." },
              { image: IMAGES.features[1], title: "Smart Expiry Tracking", desc: "Every document type monitored automatically. See exactly what's expiring and when — at a glance, on your dashboard." },
              { image: IMAGES.features[2], title: "OCR Date Extraction", desc: "Take a photo of any document and our AI reads the expiry dates for you. You review and confirm before anything is saved." },
              { image: IMAGES.features[3], title: "Push + Email Reminders", desc: "Get notified at 180 days and 90 days before every deadline. Enough lead time to renew, file, or consult your attorney." },
              { image: IMAGES.features[4], title: "Purpose-Built for H-1B", desc: "Not a generic file manager. ImmiHub understands Passport, I-94, I-797, Visa Stamp, and EAD — and what each deadline means for you." },
              { image: IMAGES.features[5], title: "Guided Onboarding", desc: "Our Immi Bot walks you through setup with a simple conversation. No confusing forms, no guesswork — just answer a few questions and you're ready." },
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
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: colors.textBody, lineHeight: 1.8, marginBottom: "56px" }}>The document vault is just the beginning. Here's where ImmiHub is headed — built around what H-1B holders actually need.</p>
          </AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {[
              { title: "AI-Powered Visa Assistant", desc: "Ask questions about your immigration situation in plain English and get clear, personalized guidance." },
              { title: "Compliance Engine", desc: "Track your visa status, monitor days spent in the US, and understand your travel risks before you book a flight." },
              { title: "Multi-Visa Support", desc: "F-1, Green Card, O-1, L-1 — every visa type gets its own tailored toolkit and deadline tracking." },
              { title: "Family Vault", desc: "Manage documents and deadlines for your spouse and dependents alongside your own, all in one place." },
              { title: "Attorney & Employer Portals", desc: "Share documents securely with your immigration lawyer or HR team. No more emailing sensitive files back and forth." },
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
            <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, color: colors.textDark, marginBottom: "48px", lineHeight: 1.2 }}>Stories We Hear Every Day</h2>
          </AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {[
              { quote: "My I-797 renewal date was sitting in a year-old email I never thought to check. I found out two weeks before it expired. Something like ImmiHub would have caught that months in advance.", name: "Priya S., Software Engineer" },
              { quote: "Every time I travel, I'm scrambling to find my passport, visa stamp, and I-94 across three different apps and folders. Having everything in one secure place — that's all I've ever wanted.", name: "Rahul M., Data Analyst" },
              { quote: "My wife's EAD renewal crept up on us and she couldn't work for three months while we waited for a new card. A simple reminder at 180 days would have changed everything.", name: "Amit K., Product Manager" },
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
              Your Documents Deserve Serious Protection
            </h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: colors.textBody, marginBottom: "48px", lineHeight: 1.6 }}>
              We know how sensitive immigration documents are. That's why security isn't an afterthought — it's the foundation.
            </p>
          </AnimatedSection>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px 40px" }}>
            {[
              { icon: <CloudIcon />, text: "Hosted on Microsoft Azure" },
              { icon: <LockIcon />, text: "Encrypted at rest and in transit" },
              { icon: <ShieldIcon />, text: "No biometric data collected" },
              { icon: <GlobeIcon />, text: "Data stored in the United States" },
              { icon: <TrashIcon />, text: "Delete all your data anytime" },
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
              Stop Worrying About Deadlines. Start Living Your Life.
            </h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.65)", marginBottom: "40px", lineHeight: 1.75 }}>
              Join thousands of H-1B holders who want a better way. Free forever for individuals — no credit card, no catch.
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