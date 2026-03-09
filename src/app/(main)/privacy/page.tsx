"use client";

import { colors } from "@/lib/design-tokens";

// WEB-11: Updated for Beta 1.0 — removed F-1/SEVIS references, updated to AWS infra,
// clarified OCR handling, added CCPA, updated document types, updated copyright year.

const sections = [
  {
    title: "1. What We Collect",
    content:
      "We collect: name, phone number, and email address; immigration information (visa type, selected goals); uploaded documents (Passport, I-797, I-94, Visa Stamp, EAD, Employment Letters); OTP login data via Azure Communication Services; push notification tokens via Firebase Cloud Messaging; email address for expiry reminders. We do NOT collect: biometric data, location data, financial or banking data, or Social Security numbers.",
  },
  {
    title: "2. How We Use Data",
    content:
      "We use your data to: authenticate your login via OTP; store and organize your immigration documents; extract expiry dates via OCR processing (AWS Textract); deliver push and email reminders before document deadlines; personalize your dashboard and checklist; and improve ImmiHub's user experience.",
  },
  {
    title: "3. OCR Processing",
    content:
      "When you upload a document photo, it is sent to AWS Textract for text and date extraction. Extracted data (such as expiry dates) is stored to power your reminders. Raw OCR output is not retained beyond the extraction step — only the structured results are saved. You always review and confirm extracted dates before any reminders are created.",
  },
  {
    title: "4. Data Storage",
    content:
      "All data is hosted on Amazon Web Services (AWS) infrastructure in the United States. Documents are stored in AWS S3 with encryption at rest. Your profile and immigration data are stored in AWS RDS (PostgreSQL). All data transmission uses TLS encryption in transit. Access logs and secure authentication protect your account.",
  },
  {
    title: "5. Data Sharing",
    content:
      "We do not sell your data. We only share minimal data with third-party providers necessary to operate the service. Service providers we use: Amazon Web Services (hosting, document storage, OCR via Textract), Firebase (push notifications via Firebase Cloud Messaging). We may share data with additional providers in the future only with your explicit opt-in.",
  },
  {
    title: "6. Your Rights",
    content:
      "You may delete your account and all associated data at any time. You may request access to your personal data. You may request correction of inaccurate data. California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal data is collected, the right to delete personal data, and the right to opt out of any sale of personal data (we do not sell personal data). To exercise any of these rights, contact us at legal@getimmihub.com.",
  },
  {
    title: "7. Children's Privacy",
    content:
      "ImmiHub is not intended for users under 13 years of age. We do not knowingly collect data from children.",
  },
  {
    title: "8. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of material changes via email or in-app notification. Continued use of ImmiHub after changes constitutes acceptance.",
  },
  {
    title: "9. Contact",
    content:
      "Privacy & legal inquiries: legal@getimmihub.com. General support: support@getimmihub.com. Website: www.getimmihub.com/privacy-policy.",
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "100px 24px 48px", background: colors.warmWhite }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(32px, 5vw, 44px)",
              fontWeight: 800,
              color: colors.navy,
              marginBottom: "8px",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "14px",
              color: colors.gray500,
            }}
          >
            Last updated: March 2026
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 24px 100px", background: colors.warmWhite }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: colors.navy,
                  marginBottom: "10px",
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "15px",
                  color: colors.gray600,
                  lineHeight: 1.8,
                }}
              >
                {s.content}
              </p>
            </div>
          ))}

          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "13px",
              color: colors.gray500,
              marginTop: "48px",
              borderTop: `1px solid ${colors.gray200 ?? "#e5e7eb"}`,
              paddingTop: "24px",
            }}
          >
            © 2026 ImmiHub. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}