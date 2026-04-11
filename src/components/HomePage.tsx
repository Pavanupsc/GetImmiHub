"use client";

import Image from "next/image";
import { AnimatedSection, HeroFade, WaitlistForm } from "@/components/ui";
import { colors, layout } from "@/lib/design-tokens";
import {
  ShieldIcon,
  LockIcon,
  TrashIcon,
  AzureMarkIcon,
  FingerprintIcon,
  DatabaseIcon,
  BrainIcon,
  DocIcon,
  FolderPlusIcon,
  BuildingIcon,
} from "@/components/icons";

// Immigration-relevant imagery: Unsplash (passport, travel docs, diverse professionals). Attribution in footer.
const IMAGES = {
  // Hero: warm, personal (WhatsApp-style) — person with smartphone
  hero: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=85",
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
      <section className="home-hero" style={{
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
                <span className="hero-title-line" style={{
                  display: "block",
                  fontSize: "clamp(40px, 4.8vw, 54px)",
                  fontWeight: 800,
                  color: colors.textDark,
                  lineHeight: 1.1,
                }}>
                  Never miss an
                </span>
                <span className="hero-title-line" style={{
                  display: "block",
                  fontSize: "clamp(40px, 4.8vw, 54px)",
                  fontWeight: 800,
                  color: colors.textDark,
                  lineHeight: 1.1,
                }}>
                  immigration
                </span>
                <span className="hero-accent-line" style={{
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

      {/* Product preview — clip to top 50% of image (aspect-ratio box + overflow:hidden) */}
      <section className="home-social-section" style={{  padding: `0 ${layout.pagePaddingX} 96px` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", minWidth: 0 }}>
          <AnimatedSection>
            <div
              className="home-social-shell"
              style={{
                position: "relative",
                borderRadius: "28px",
                background: "#F4F6F9",
                overflow: "hidden",
              }}
            >
              <div className="home-social-inner" style={{ padding: "44px 56px 52px" }}>
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "16px",
                    width: "100%",
                    maxWidth: "100%",
                    aspectRatio: "1600 / 490",
                  }}
                >
                  <Image
                    src="/Images/social-media-image.png"
                    alt="ImmiHub product preview"
                    width={1600}
                    height={980}
                    sizes="(max-width: 768px) calc(100vw - 48px), 1200px"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      filter: "drop-shadow(0 0 50px #1353801F)",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== THE PROBLEM — centered phone with 4 surrounding cards ===== */}
      <section className="home-section-stack" style={{ padding: `120px ${layout.pagePaddingX} 140px`, background: colors.bgWhite, overflow: "hidden" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <div className="problem-section-header" style={{ textAlign: "center", marginBottom: "64px"}}>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: colors.brandPrimary,
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "16px",
              }}>
                The Problem
              </p>
              <h2 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                color: colors.textDark,
                marginBottom: "8px",
                lineHeight: 1.2,
              }}>
                780,000+ H-1B Holders.
              </h2>
              <h2 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                color: colors.textDark,
                marginBottom: "20px",
                lineHeight: 1.2,
                fontStyle: "italic",
              }}>
                No One Looking Out for Their Deadlines.
              </h2>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "16px",
                color: colors.textBody,
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}>
                A single missed date can put your job, your status, and your entire life in the US at risk. Yet there&apos;s no tool built specifically to help you stay on top of it all.
              </p>
            </div>
          </AnimatedSection>

          <div className="problem-phone-layout" style={{ position: "relative" ,backgroundImage: "url('/Images/the-problem-background.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"  }}>
            <div className="problem-phone" style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "280px",
              zIndex: 2,
              pointerEvents: "none",
            }}>
              <Image
                src="/Images/immihub-mobile.png"
                alt="ImmiHub app dashboard on mobile"
                width={560}
                height={1120}
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>

            <div className="problem-cards-row" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "360px",
              marginBottom: "40px",
              position: "relative",
              zIndex: 1,
            }}>
              <AnimatedSection>
                <div className="problem-card problem-card-top-left" style={{
                  background: colors.bgWhite,
                  borderRadius: "16px",
                  padding: "28px 28px 32px",
                  boxShadow: "0 4px 20px rgba(26,35,50,0.08), 0 0 0 1px rgba(26,35,50,0.04)",
                  position: "relative",
                }}>
                  <h3 style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: colors.textDark,
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}>
                    A Renewal Deadline Lost in Your Inbox
                  </h3>
                  <p style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "14px",
                    color: colors.textBody,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    Your I-797 approval notice arrived a year ago. The renewal date was buried somewhere in that email. By the time you realize it, you&apos;re filing on an emergency basis and hoping for the best.
                  </p>
                  <div className="card-arrow card-arrow-right" style={{
                    position: "absolute",
                    right: "-16px",
                    bottom: "32px",
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: `16px solid ${colors.bgWhite}`,
                    filter: "drop-shadow(2px 0 2px rgba(26,35,50,0.06))",
                  }} aria-hidden />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.08}>
                <div className="problem-card problem-card-top-right" style={{
                  background: colors.bgWhite,
                  borderRadius: "16px",
                  padding: "28px 28px 32px",
                  boxShadow: "0 4px 20px rgba(26,35,50,0.08), 0 0 0 1px rgba(26,35,50,0.04)",
                  position: "relative",
                }}>
                  <h3 style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: colors.textDark,
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}>
                    An Expired Passport You Didn&apos;t See Coming
                  </h3>
                  <p style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "14px",
                    color: colors.textBody,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    You&apos;re at the boarding gate, bags checked, ready to go — and the agent tells you your passport expired last month. Trip cancelled, money gone, and a stressful renewal ahead.
                  </p>
                  <div className="card-arrow card-arrow-left" style={{
                    position: "absolute",
                    left: "-16px",
                    bottom: "32px",
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: `16px solid ${colors.bgWhite}`,
                    filter: "drop-shadow(-2px 0 2px rgba(26,35,50,0.06))",
                  }} aria-hidden />
                </div>
              </AnimatedSection>
            </div>

            <div className="problem-cards-row" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "360px",
              position: "relative",
              zIndex: 1,
            }}>
              <AnimatedSection delay={0.12}>
                <div className="problem-card problem-card-bottom-left" style={{
                  background: colors.bgWhite,
                  borderRadius: "16px",
                  padding: "28px 28px 32px",
                  boxShadow: "0 4px 20px rgba(26,35,50,0.08), 0 0 0 1px rgba(26,35,50,0.04)",
                  position: "relative",
                }}>
                  <h3 style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: colors.textDark,
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}>
                    Critical Documents Scattered Everywhere
                  </h3>
                  <p style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "14px",
                    color: colors.textBody,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    Some are in your email, some in phone photos, some in a folder at home you haven&apos;t opened in months. When you need something urgently, you can never find it fast enough.
                  </p>
                  <div className="card-arrow card-arrow-right" style={{
                    position: "absolute",
                    right: "-16px",
                    top: "32px",
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: `16px solid ${colors.bgWhite}`,
                    filter: "drop-shadow(2px 0 2px rgba(26,35,50,0.06))",
                  }} aria-hidden />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.16}>
                <div className="problem-card problem-card-bottom-right" style={{
                  background: colors.bgWhite,
                  borderRadius: "16px",
                  padding: "28px 28px 32px",
                  boxShadow: "0 4px 20px rgba(26,35,50,0.08), 0 0 0 1px rgba(26,35,50,0.04)",
                  position: "relative",
                }}>
                  <h3 style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: colors.textDark,
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}>
                    Spreadsheets and Calendar Reminders That Fail You
                  </h3>
                  <p style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "14px",
                    color: colors.textBody,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    You&apos;ve tried tracking dates in Google Sheets and setting phone reminders. But life gets busy, entries go stale, and the one date you forgot to add is the one that matters most.
                  </p>
                  <div className="card-arrow card-arrow-left" style={{
                    position: "absolute",
                    left: "-16px",
                    top: "32px",
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: `16px solid ${colors.bgWhite}`,
                    filter: "drop-shadow(-2px 0 2px rgba(26,35,50,0.06))",
                  }} aria-hidden />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — centered header + left PNG (blurred mock + cards) + right GIF (sharp UI) */}
      <section className="home-section-stack" style={{ padding: `100px ${layout.pagePaddingX} 120px`, background: colors.white }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <AnimatedSection>
            <div className="home-section-header-tight" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: colors.brandPrimary,
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "14px",
              }}>
                How It Works
              </p>
              <h2 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 800,
                color: colors.textDark,
                marginBottom: "20px",
                lineHeight: 1.15,
              }}>
                Three Steps to{" "}
                <span style={{ color: colors.brandPrimary }}>Peace of Mind</span>
              </h2>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "16px",
                color: colors.textBody,
                lineHeight: 1.7,
                maxWidth: "640px",
                margin: "0 auto",
              }}>
                A missed date can put your job, your status, and your entire life in the US at risk. Yet there&apos;s no tool built specifically to help you stay on top of it all.
              </p>
            </div>
          </AnimatedSection>

          <div
            className="how-it-works-row"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
              gap: "clamp(24px, 4vw, 48px)",
              alignItems: "center",
            }}
          >
            <AnimatedSection>
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                minWidth: 0,
              }}
              >
                <div
                  className="how-it-left-visual"
                  style={{
                    position: "relative",
                    width: "min(100%, 560px)",
                    maxWidth: "100%",
                  }}
                >
                  <Image
                    src="/Images/how-it-works-left-image.png"
                    alt="ImmiHub onboarding: suggested H-1B documents and upload prompts"
                    width={900}
                    height={1020}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    priority
                  />
                  {/* Callout boxes — white + blue border (design overlay on blurred phone) */}
                  <div
                    className="how-it-callout how-it-callout-top"
                    style={{
                      position: "absolute",
                      top: "10%",
                      left: "4%",
                      right: "auto",
                      maxWidth: "354px",
                      width: "min(354px, calc(100% - 20px))",
                      zIndex: 2,
                      background: colors.white,
                      border: `1px solid ${colors.brandPrimary}`,
                      borderRadius: "12px",
                      padding: "14px 16px",
                      boxShadow: "0 8px 28px rgba(26,35,50,0.1)",
                    }}
                  >
                    <p style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: colors.textDark,
                      lineHeight: 1.4,
                      margin: "0 0 8px 0",
                    }}>
                      Let&apos;s start with the most important documents for your H-1B Visa.
                    </p>
                    <p style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: colors.textBody,
                      lineHeight: 1.55,
                      margin: 0,
                    }}>
                      You can upload your passport, I-94, I-797 (Approval Notice), Visa stamp (if available), Employment letter (optional).
                    </p>
                  </div>
                  <div
                    className="how-it-callout how-it-callout-bottom"
                    style={{
                      position: "absolute",
                      top: "52%",
                      left: "18%",
                      right: "auto",
                      maxWidth: "354px",
                      width: "min(354px, calc(100% - 24px))",
                      zIndex: 2,
                      background: colors.white,
                      border: `1px solid ${colors.brandPrimary}`,
                      borderRadius: "12px",
                      padding: "14px 16px",
                      boxShadow: "0 8px 28px rgba(26,35,50,0.1)",
                    }}
                  >
                    <p style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: colors.textDark,
                      lineHeight: 1.4,
                      margin: "0 0 8px 0",
                    }}>
                      Upload any immigration document to get started ——
                    </p>
                    <p style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: colors.textBody,
                      lineHeight: 1.55,
                      margin: 0,
                    }}>
                      (We will extract expiry dates and remind you before deadlines.)
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <div style={{
                display: "flex",
                justifyContent: "flex-start",
                minWidth: 0,
              }}
              >
                <Image
                  src="/Images/how-it-works-right-image.gif"
                  alt="ImmiHub H-1B document vault chat: Passport, I-94, I-797, Visa Stamp, and more"
                  width={420}
                  height={900}
                  unoptimized
                  style={{
                    width: "min(100%, 300px)",
                    height: "auto",
                    display: "block",
                    borderRadius: "28px",
                    boxShadow: "0 24px 48px rgba(26,35,50,0.12), 0 0 0 1px rgba(26,35,50,0.06)",
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features — centered header, 2×3 grid; horizontal cards (visual left, copy right) */}
      <section id="features" className="home-section-stack features-section" style={{ padding: `120px ${layout.pagePaddingX} 140px`, background: colors.white, overflowX: "hidden" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", width: "100%", minWidth: 0 }}>
          <AnimatedSection>
            <div className="home-section-header-tight" style={{ textAlign: "center", marginBottom: "48px" }}>
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
                    width: "100%",
                    minWidth: 0,
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    background: colors.white,
                    borderRadius: "18px",
                    padding: "18px 20px",
                    boxShadow: "0 6px 24px rgba(26,35,50,0.06), 0 0 0 1px rgba(26,35,50,0.04)",
                  }}
                >
                  <div
                    className="feature-card-image-wrap"
                    style={{
                      flex: "0 0 42%",
                      maxWidth: "200px",
                      minWidth: 0,
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
                      sizes="(max-width: 900px) calc(100vw - 80px), 200px"
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
      <section className="roadmap-section home-section-stack" style={{ padding: `120px ${layout.pagePaddingX} 140px`, background: colors.white }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <AnimatedSection>
            <div className="home-section-header-tight-lg" style={{ textAlign: "center", marginBottom: "64px" }}>
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

      {/* What people say — three testimonial cards */}
      <section className="home-section-stack" style={{ padding: `100px ${layout.pagePaddingX} 120px`, background: colors.white }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <AnimatedSection>
            <div className="home-section-header-tight" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: colors.brandPrimary,
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "14px",
              }}>
                What People Say
              </p>
              <h2 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 800,
                lineHeight: 1.2,
                margin: 0,
              }}>
                <span style={{ color: colors.brandPrimary }}>Stories</span>
                {" "}
                <span style={{ color: colors.textDark }}>We Hear Every Day</span>
              </h2>
            </div>
          </AnimatedSection>
          <div
            className="testimonials-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "28px",
            }}
          >
            {[
              {
                name: "Priya S",
                role: "Software Engineer",
                quote: "My I-797 renewal date was sitting in a year-old email I never thought to check. I found out two weeks before it expired. Something like ImmiHub would have caught that months in advance.",
              },
              {
                name: "Rahul M",
                role: "Data Analyst",
                quote: "Every time I travel, I&apos;m scrambling to find my passport, visa stamp, and I-94 across three different apps and folders. Having everything in one secure place — that&apos;s all I&apos;ve ever wanted.",
              },
              {
                name: "Amit K",
                role: "Product Manager",
                quote: "My wife&apos;s EAD renewal crept up on us and she couldn&apos;t work for three months while we waited for a new card. A simple reminder at 180 days would have changed everything.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.name} delay={i * 0.06}>
                <div className="home-testimonial-card" style={{
                  background: colors.white,
                  borderRadius: "18px",
                  padding: "24px 22px 26px",
                  boxShadow: "0 8px 32px rgba(26,35,50,0.08), 0 0 0 1px rgba(26,35,50,0.05)",
                  textAlign: "left",
                  height: "100%",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
                    <div
                      aria-hidden
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: colors.bgAlt,
                        flexShrink: 0,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: colors.textDark,
                        margin: "0 0 4px 0",
                        lineHeight: 1.25,
                      }}>
                        {item.name}
                      </p>
                      <p style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: colors.textMuted,
                        margin: 0,
                        lineHeight: 1.35,
                      }}>
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <p style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "14px",
                    color: colors.textBody,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Data secured — centered headline + left-aligned trust list */}
      <section className="data-secured-section" style={{ padding: `100px ${layout.pagePaddingX} 120px`, background: colors.white }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", width: "100%", minWidth: 0 }}>
          <AnimatedSection>
            <div className="data-secured-head" style={{ textAlign: "center", marginBottom: "44px" }}>
              <p className="data-secured-label" style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: colors.brandPrimary,
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "14px",
              }}>
                Data Secured
              </p>
              <h2 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(24px, 5.2vw, 40px)",
                fontWeight: 800,
                lineHeight: 1.15,
                margin: "0 0 16px 0",
              }}>
                <span style={{ color: colors.textDark, display: "block" }}>
                  Your Documents Deserve
                </span>
                <span style={{ color: colors.brandPrimary, display: "block" }}>
                  Serious Protection
                </span>
              </h2>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "clamp(15px, 3.8vw, 16px)",
                color: colors.textBody,
                lineHeight: 1.65,
                maxWidth: "520px",
                margin: "0 auto",
                padding: "0 4px",
              }}>
                We know how sensitive immigration documents are. That&apos;s why security isn&apos;t an afterthought — it&apos;s the foundation.
              </p>
            </div>
          </AnimatedSection>
          <div className="data-secured-list" style={{ maxWidth: "420px", margin: "0 auto", width: "100%", minWidth: 0 }}>
            {[
              { icon: <AzureMarkIcon />, text: "Hosted on Microsoft Azure" },
              { icon: <LockIcon />, text: "Encrypted at rest and in transit" },
              { icon: <FingerprintIcon />, text: "No biometric data collected" },
              { icon: <DatabaseIcon />, text: "Data stored in the United States" },
              { icon: <TrashIcon />, text: "Delete all your data anytime" },
            ].map((item, i) => (
              <AnimatedSection key={item.text} delay={i * 0.05}>
                <div className="data-secured-row" style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  marginBottom: i < 4 ? "18px" : 0,
                }}>
                  <div style={{ color: colors.textMuted, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 28, marginTop: "2px" }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: colors.textDark,
                    lineHeight: 1.45,
                    minWidth: 0,
                    flex: 1,
                  }}>
                    {item.text}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — charcoal footer band (#1A2332); green CTA in form */}
      <section className="home-cta-band" style={{ padding: `180px ${layout.pagePaddingX}`, background: colors.textDark, textAlign: "center" }}>
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