"use client";

import Image from "next/image";
import { AnimatedSection, HeroFade, WaitlistForm } from "@/components/ui";
import { colors, layout } from "@/lib/design-tokens";
import {
  ShieldIcon,
  LockIcon,
  CloudIcon,
  TrashIcon,
  GlobeIcon,
  BrainIcon,
  DocIcon,
  FolderPlusIcon,
  BuildingIcon,
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
  // Feature cards — curated Unsplash (documents, calendar, desk work, phone, team, onboarding)
  features: [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=88&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=88&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&q=88&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=88&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=88&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=88&auto=format&fit=crop",
  ],
} as const;

export function HomePage() {
  return (
    <div>
      {/* Hero banner */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: colors.bgWhite,
        padding: `140px ${layout.pagePaddingX} 160px`, position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative" }}>
          <HeroFade>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 8vw, 120px)", alignItems: "center",
          }} className="hero-grid">
            <div>
              <div style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "transparent",
                color: colors.brandPrimary,
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "18px",
                border: `1px solid ${colors.brandPrimaryLight}`,
              }}>
                Coming Soon – Join the Waitlist
              </div>
              <h1 style={{ margin: 0, fontFamily: "'Satoshi', sans-serif", letterSpacing: "-0.02em", marginBottom: "18px" }}>
                <span style={{
                  display: "block",
                  fontSize: "clamp(40px, 4.8vw, 54px)",
                  fontWeight: 800,
                  color: colors.textDark,
                  lineHeight: 1.1,
                }}>
                  Never miss an
                </span>
                <span style={{
                  display: "block",
                  fontSize: "clamp(40px, 4.8vw, 54px)",
                  fontWeight: 800,
                  color: colors.textDark,
                  lineHeight: 1.1,
                }}>
                  immigration
                </span>
                <span style={{
                  display: "block",
                  fontSize: "clamp(50px, 6.2vw, 78px)",
                  fontWeight: 900,
                  color: colors.brandPrimary,
                  lineHeight: 1.06,
                  marginTop: "6px",
                }}>
                  Deadline Again
                </span>
              </h1>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "13px",
                color: colors.textMuted,
                lineHeight: 1.6,
                marginBottom: "20px",
                maxWidth: "520px",
              }}>
                One secure place to store your H-1B documents, track every expiry date, and get reminders months before deadlines arrive. So you can stop worrying and start living.
              </p>
              <WaitlistForm variant="banner" />
            </div>

            <div>
              <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <div style={{ position: "relative", width: "100%", maxWidth: "520px" }}>
                  <Image
                    src="/Images/banner-image-r.png"
                    alt="ImmiHub app preview on phones"
                    width={900}
                    height={900}
                    priority
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
          </HeroFade>
        </div>
      </section>

      {/* Social preview image section (below banner) */}
      <section style={{ background: colors.bgWhite, padding: `0 ${layout.pagePaddingX} 96px` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <AnimatedSection>
            <div
              style={{
                position: "relative",
                borderRadius: "28px",
                background: "#F4F6F9",
                boxShadow: "0 18px 40px rgba(26,35,50,0.10)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(900px 280px at 50% 0%, rgba(79,158,214,0.10), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(244,246,249,1) 70%)",
                }}
                aria-hidden
              />
              <div style={{ position: "relative", padding: "44px 56px 52px" }}>
                <Image
                  src="/Images/social-media-image.png"
                  alt="ImmiHub product preview"
                  width={1600}
                  height={980}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Problem — alternating image left / right; bg-alt for rhythm */}
      <section style={{ padding: `180px ${layout.pagePaddingX}`, background: colors.bgAlt }}>
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
      <section style={{ padding: `180px ${layout.pagePaddingX}`, background: colors.bgWhite }}>
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

      {/* Features — centered header, 2×3 grid; horizontal cards (visual left, copy right) */}
      <section id="features" style={{ padding: `120px ${layout.pagePaddingX} 140px`, background: colors.white }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: colors.brandPrimary,
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "14px",
              }}>
                Features
              </p>
              <h2 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(28px, 3.6vw, 42px)",
                fontWeight: 800,
                color: colors.textDark,
                marginBottom: "16px",
                lineHeight: 1.15,
              }}>
                Everything You Need,{" "}
                <span style={{ color: colors.brandPrimary }}>Nothing You Don&apos;t</span>
              </h2>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "16px",
                color: colors.textBody,
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}>
                Built from the ground up for H-1B holders. One secure home for your documents, your deadlines, and your peace of mind.
              </p>
            </div>
          </AnimatedSection>
          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "28px",
            }}
          >
            {[
              { title: "Secure Document Vault", desc: "All your immigration documents in one encrypted vault, hosted on Microsoft Azure. Access them anytime, from any device." },
              { title: "Smart Expiry Tracking", desc: "Every document type monitored automatically. See exactly what's expiring and when — at a glance, on your dashboard." },
              { title: "OCR Date Extraction", desc: "Take a photo of any document and our AI reads the expiry dates for you. You review and confirm before anything is saved." },
              { title: "Push + Email Reminders", desc: "Get notified at 180 days and 90 days before every deadline. Enough lead time to renew, file, or consult your attorney." },
              { title: "Purpose-Built for H-1B", desc: "Not a generic file manager. ImmiHub understands Passport, I-94, I-797, Visa Stamp, and EAD — and what each deadline means for you." },
              { title: "Guided Onboarding", desc: "Our Immi Bot walks you through setup with a simple conversation. No confusing forms, no guesswork — just answer a few questions and you're ready." },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div
                  className="feature-card-row"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                    gap: "20px",
                    height: "100%",
                    background: colors.white,
                    borderRadius: "18px",
                    padding: "18px 20px",
                    boxShadow: "0 6px 24px rgba(26,35,50,0.06), 0 0 0 1px rgba(26,35,50,0.04)",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 42%",
                      maxWidth: "200px",
                      minWidth: "120px",
                      borderRadius: "14px",
                      background: "#E8EAED",
                      aspectRatio: "1.05",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={IMAGES.features[i]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 900px) 40vw, 200px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "left" }}>
                    <h3 style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: colors.textDark,
                      marginBottom: "8px",
                      lineHeight: 1.3,
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "14px",
                      color: colors.textBody,
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap — vertical timeline, alternating cards */}
      <section className="roadmap-section" style={{ padding: `120px ${layout.pagePaddingX} 140px`, background: colors.white }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: colors.brandPrimary,
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "14px",
              }}>
                Roadmap
              </p>
              <h2 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(28px, 3.8vw, 40px)",
                fontWeight: 800,
                color: colors.textDark,
                marginBottom: "16px",
                lineHeight: 1.2,
              }}>
                What&apos;s Coming{" "}
                <span style={{ color: colors.brandPrimary }}>Next</span>
              </h2>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "16px",
                color: colors.textBody,
                lineHeight: 1.75,
                maxWidth: "560px",
                margin: "0 auto",
              }}>
                The document vault is just the beginning. Here&apos;s where ImmiHub is headed — built around what H-1B holders actually need.
              </p>
            </div>
          </AnimatedSection>

          <div className="roadmap-timeline" style={{ position: "relative", paddingBottom: "8px" }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: "50%",
                top: "12px",
                bottom: "12px",
                width: 0,
                borderLeft: `2px dashed ${colors.border}`,
                transform: "translateX(-50%)",
                zIndex: 0,
              }}
              className="roadmap-center-line"
            />

            {[
              {
                side: "left" as const,
                title: "AI-Powered Visa Assistant",
                desc: "Ask questions about your immigration situation in plain English and get clear, personalized guidance.",
                icon: <BrainIcon />,
              },
              {
                side: "right" as const,
                title: "Compliance Engine",
                desc: "Track your visa status, monitor days spent in the US, and understand your travel risks before you book a flight.",
                icon: <ShieldIcon />,
              },
              {
                side: "left" as const,
                title: "Multi-Visa Support",
                desc: "F-1, Green Card, O-1, L-1 — every visa type gets its own tailored toolkit and deadline tracking.",
                icon: <DocIcon />,
              },
              {
                side: "right" as const,
                title: "Family Vault",
                desc: "Manage documents and deadlines for your spouse and dependents alongside your own, all in one place.",
                icon: <FolderPlusIcon />,
              },
              {
                side: "left" as const,
                title: "Attorney & Employer Portals",
                desc: "Share documents securely with your immigration lawyer or HR team. No more emailing sensitive files back and forth.",
                icon: <BuildingIcon />,
              },
            ].map((item, i) => {
              const iconBox = (
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: colors.brandPrimaryPale,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.brandPrimary,
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
              );
              const cardInner = (
                <div
                  className="roadmap-card"
                  style={{
                  background: colors.white,
                  borderRadius: 16,
                  padding: "22px 24px",
                  boxShadow: "0 8px 28px rgba(26,35,50,0.08), 0 0 0 1px rgba(26,35,50,0.05)",
                  maxWidth: "380px",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  flexDirection: item.side === "left" ? "row-reverse" : "row",
                  textAlign: item.side === "left" ? "right" : "left",
                }}
                >
                  {iconBox}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: colors.brandPrimary,
                      marginBottom: "8px",
                      lineHeight: 1.3,
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "14px",
                      color: colors.textBody,
                      lineHeight: 1.65,
                      margin: 0,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
              const node = (
                <div style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: `2px solid ${colors.brandPrimary}`,
                  background: colors.white,
                  flexShrink: 0,
                  zIndex: 2,
                  boxShadow: `0 0 0 4px ${colors.white}`,
                }} aria-hidden />
              );

              return (
                <AnimatedSection key={item.title} delay={i * 0.06}>
                  <div
                    className="roadmap-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 48px 1fr",
                      alignItems: "center",
                      marginBottom: i < 4 ? 40 : 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {item.side === "left" ? (
                      <>
                        <div style={{ justifySelf: "end", paddingRight: 20 }}>{cardInner}</div>
                        <div className="roadmap-node-col" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{node}</div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div className="roadmap-node-col" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{node}</div>
                        <div style={{ justifySelf: "start", paddingLeft: 20 }}>{cardInner}</div>
                      </>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials — casual quotes, no stars; bg-alt */}
      <section style={{ padding: `180px ${layout.pagePaddingX}`, background: colors.bgAlt }}>
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
      <section style={{ padding: `180px ${layout.pagePaddingX}`, background: colors.bgWhite }}>
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
      <section style={{ padding: `180px ${layout.pagePaddingX}`, background: colors.textDark, textAlign: "center" }}>
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