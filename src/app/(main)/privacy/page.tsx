"use client";

import { colors } from "@/lib/design-tokens";

const sections = [
  { title: "1. What We Collect", content: "We collect: name, phone number, and email address; immigration information (visa type, selected goals); uploaded documents (Passport, I-797, I-94, Visa Stamp, EAD, Employment Letters); OTP login data via Azure Communication Services; push notification tokens via Firebase Cloud Messaging. We do NOT collect: biometric data, location data, financial or banking data, Social Security numbers." },
  { title: "2. How We Use Data", content: "We use your data to: authenticate your login via OTP; store and organize your immigration documents; extract expiry dates via OCR processing (Azure Cognitive Services); deliver push and email reminders before document deadlines; personalize your dashboard and checklist; improve ImmiHub's user experience." },
  { title: "3. OCR Processing", content: "When you upload a document photo, it is processed by Azure Cognitive Services to extract text and dates. The OCR results are stored alongside your document. You always review and confirm extracted dates before any reminders are created. Raw OCR data is retained for accuracy improvements." },
  { title: "4. Data Storage", content: "All data is hosted on Microsoft Azure infrastructure in the United States. Documents are stored in Azure Blob Storage with encryption at rest. All data transmission uses TLS encryption in transit. Access logs and secure authentication protect your account." },
  { title: "5. Data Sharing", content: "We do not sell your data. We only share minimal data with third-party providers if you explicitly opt-in for integrated services (e.g., legal consultations in future versions). Service providers we use: Microsoft Azure (hosting, OCR), Firebase (push notifications)." },
  { title: "6. Your Rights", content: "You may delete your account and all associated data at any time. You may request access to your personal data. You may request correction of inaccurate data. California residents have additional rights under CCPA. Contact support@getimmihub.com for any data requests." },
  { title: "7. Children's Privacy", content: "ImmiHub is not intended for users under 13 years of age. We do not knowingly collect data from children." },
  { title: "8. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of material changes via email or in-app notification. Continued use of ImmiHub after changes constitutes acceptance." },
  { title: "9. Contact", content: "Privacy inquiries: legal@getimmihub.com. General support: support@getimmihub.com. Website: www.getimmihub.com/privacy-policy." },
];

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "100px 24px 48px", background: colors.warmWhite }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800,
            color: colors.navy, marginBottom: "8px",
          }}>Privacy Policy</h1>
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
