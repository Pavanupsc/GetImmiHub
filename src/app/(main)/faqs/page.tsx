"use client";

import { AnimatedSection, Accordion } from "@/components/ui";
import { colors } from "@/lib/design-tokens";

const categories = [
  {
    title: "About ImmiHub",
    items: [
      { q: "What is ImmiHub?", a: "ImmiHub is a secure mobile app that helps H-1B visa holders store immigration documents, automatically extract expiry dates using OCR technology, and receive push and email reminders before critical deadlines." },
      { q: "Who is ImmiHub for?", a: "ImmiHub is built specifically for H-1B visa holders in the United States. Support for F-1, Green Card, O-1, and other visa types is on our roadmap." },
      { q: "What documents does ImmiHub support?", a: "ImmiHub supports 7 document types: Passport, I-94, I-797 Approval Notice, Visa Stamp, and Spouse EAD (with expiry tracking), plus Employment Letters and Other documents (storage only)." },
      { q: "Is ImmiHub free?", a: "Yes. ImmiHub is free for all individual immigrants and always will be. We believe immigration tools should be accessible to everyone." },
      { q: "Is ImmiHub affiliated with USCIS or any government agency?", a: "No. ImmiHub is a private platform designed to help immigrants manage their documents. We are not affiliated with USCIS, DHS, or any government entity." },
    ],
  },
  {
    title: "Security & Privacy",
    items: [
      { q: "How is my data stored?", a: "All data is stored on Microsoft Azure cloud infrastructure in the United States. Documents are encrypted at rest and in transit using industry-standard encryption." },
      { q: "Can ImmiHub employees see my documents?", a: "No. Your documents are stored encrypted and are only accessible through your authenticated account. We do not access, review, or share your personal documents." },
      { q: "Does ImmiHub collect biometric or financial data?", a: "No. We do not collect biometric data, location data, or financial/banking information. We only collect what's needed: name, email, phone, visa type, and your uploaded documents." },
      { q: "Can I delete my account and all data?", a: "Yes. You can delete your account and all associated data at any time. Contact support@getimmihub.com for data access or deletion requests." },
      { q: "Does ImmiHub sell my data?", a: "No. We do not sell your data. We only share minimal data with third-party providers if you explicitly opt-in for integrated services." },
    ],
  },
  {
    title: "Features & Usage",
    items: [
      { q: "How does OCR date extraction work?", a: "When you upload a photo of your document, our OCR (powered by Azure Cognitive Services) automatically reads the text and extracts expiry dates. You always review and confirm the dates before they're saved — we never assume the OCR is correct." },
      { q: "What reminders will I receive?", a: "For each tracked document, you'll receive two reminders: one at 180 days before expiry and another at 90 days before expiry. Reminders are sent via push notification and email." },
      { q: "Can I use ImmiHub for my spouse's documents?", a: "Currently, ImmiHub supports Spouse EAD tracking if you select the 'Have Dependents' goal during setup. Full family vault support with separate profiles for dependents is on our roadmap." },
      { q: "What if my document is already expired?", a: "You can still upload expired documents. ImmiHub will flag them as expired and store them in your vault, but no reminders will be set since the expiry date has already passed." },
      { q: "What happens if OCR reads the wrong date?", a: "You always confirm dates before they're saved. If the OCR gets it wrong, you can manually correct the dates during the confirmation step. ImmiHub never creates reminders without your explicit confirmation." },
    ],
  },
];

export default function FaqsPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{
        padding: "100px 24px",
        background: colors.warmWhite,
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <h1 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800,
              color: colors.navy, lineHeight: 1.15, marginBottom: "16px",
            }}>
              Frequently Asked <span style={{ color: colors.blue }}>Questions</span>
            </h1>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px",
              color: colors.gray500, lineHeight: 1.7,
            }}>
              Everything you need to know about ImmiHub.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ padding: "80px 24px 100px", background: colors.warmWhite }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {categories.map((cat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div style={{ marginBottom: "40px" }}>
                <h2 style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "22px", fontWeight: 700, color: colors.navy,
                  marginBottom: "16px", paddingBottom: "8px",
                  borderBottom: `2px solid ${colors.bluePale}`,
                }}>{cat.title}</h2>
                <Accordion items={cat.items} />
              </div>
            </AnimatedSection>
          ))}

          <div style={{
            padding: "32px", borderRadius: "20px",
            background: colors.gray50, border: `1px solid ${colors.gray200}`,
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px",
              fontWeight: 600, color: colors.gray800, marginBottom: "8px",
            }}>
              Still have questions?
            </p>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px",
              color: colors.gray500,
            }}>
              Email us at{" "}
              <span style={{ color: colors.blue, fontWeight: 600 }}>support@getimmihub.com</span>
              {" "}and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
