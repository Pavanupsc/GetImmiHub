"use client";

import { colors } from "@/lib/design-tokens";

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing or using ImmiHub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service." },
  { title: "2. Description of Service", content: "ImmiHub is a mobile application that provides: secure document storage for immigration documents, OCR-based date extraction from uploaded documents, automated expiry reminders via push notifications and email, a personalized dashboard for tracking immigration deadlines. ImmiHub does NOT provide legal, immigration, or tax advice." },
  { title: "3. User Accounts", content: "You must register with a valid phone number and verify via OTP to create an account. You are responsible for maintaining the security of your account. You must provide accurate information during registration. One account per person." },
  { title: "4. User Content", content: "Documents you upload remain your property. By uploading, you grant ImmiHub a limited license to store, process (OCR), and display your documents within the app. You may delete your documents and account at any time. You are responsible for the accuracy of information you provide." },
  { title: "5. Acceptable Use", content: "You agree not to: upload illegal, harmful, or fraudulent content; share your account credentials; attempt to reverse-engineer or exploit the service; use ImmiHub for any purpose other than personal immigration document management; upload documents belonging to others without their consent." },
  { title: "6. Disclaimers", content: "ImmiHub is NOT affiliated with USCIS, DHS, or any government agency. ImmiHub does NOT provide legal advice. Reminders are based on dates YOU confirm — we are not responsible for incorrect dates. ImmiHub is a document management tool, not a substitute for professional immigration counsel." },
  { title: "7. Limitation of Liability", content: "ImmiHub is provided 'as is' without warranties of any kind. We are not liable for any damages arising from missed deadlines, incorrect OCR readings, or any immigration consequences. Our total liability is limited to the amount you paid for the service (which is $0 for the free tier)." },
  { title: "8. Termination", content: "You may delete your account at any time. ImmiHub may terminate accounts that violate these terms. Upon termination, your data will be deleted per our Privacy Policy." },
  { title: "9. Changes to Terms", content: "We may update these terms from time to time. Material changes will be communicated via email or in-app notification. Continued use after changes constitutes acceptance." },
  { title: "10. Governing Law", content: "These terms are governed by the laws of the State of Texas, United States of America." },
  { title: "11. Contact", content: "Questions about these terms: legal@getimmihub.com. General support: support@getimmihub.com." },
];

export default function TermsPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "100px 24px 48px", background: colors.warmWhite }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800,
            color: colors.navy, marginBottom: "8px",
          }}>Terms of Service</h1>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: colors.gray500,
          }}>Last updated: February 2026</p>
        </div>
      </section>
      <section style={{ padding: "48px 24px 100px", background: colors.warmWhite }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: "32px" }}>
              <h2 style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px",
                fontWeight: 700, color: colors.navy, marginBottom: "10px",
              }}>{s.title}</h2>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px",
                color: colors.gray600, lineHeight: 1.8,
              }}>{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
