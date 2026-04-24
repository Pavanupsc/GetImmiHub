"use client";

import { colors, layout } from "@/lib/design-tokens";

// WEB-12: Terms of Service — written for Apple App Store & Google Play Store submission.
// Covers all required sections including Data Handling (new), updated disclaimers,
// liability limitations, and app-store-compliant language.

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By downloading, accessing, or using ImmiHub, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service. These terms apply to all users of the ImmiHub mobile application and website.",
  },
  {
    title: "2. Description of Service",
    content:
      "ImmiHub is a mobile application that provides: secure document storage for immigration documents; OCR-based date extraction from uploaded documents (powered by AWS Textract); automated expiry reminders via push notifications (Firebase Cloud Messaging) and email; and a personalized dashboard for tracking immigration deadlines. ImmiHub does NOT provide legal, immigration, or tax advice of any kind.",
  },
  {
    title: "3. User Accounts",
    content:
      "You must register with a valid phone number and verify via one-time passcode (OTP) to create an account. You are responsible for maintaining the confidentiality and security of your account. You must provide accurate, current information during registration. One account per person is permitted. You agree to notify us immediately at support@getimmihub.com if you suspect unauthorized access to your account.",
  },
  {
    title: "4. User Content",
    content:
      "Documents and information you upload to ImmiHub remain your property at all times. By uploading content, you grant ImmiHub a limited, non-exclusive license solely to store, process (including OCR extraction), and display your documents within the app for the purpose of providing the service. You may delete your documents and account at any time. You are solely responsible for the accuracy of information you provide, including confirming extracted expiry dates before reminders are activated.",
  },
  {
    title: "5. Acceptable Use",
    content:
      "You agree not to: upload illegal, harmful, or fraudulent content; share your account credentials with others; attempt to reverse-engineer, decompile, or exploit the service; use ImmiHub for any purpose other than personal immigration document management; upload documents belonging to other individuals without their explicit consent; or use the service in any manner that violates applicable local, state, national, or international law.",
  },
  {
    title: "6. Data Handling",
    content:
      "ImmiHub stores your documents in AWS S3 and your profile and immigration data in AWS RDS (PostgreSQL), both hosted in the United States with encryption at rest and TLS encryption in transit. OCR processing is performed by AWS Textract; raw OCR output is not retained beyond the extraction step. Push notifications are delivered via Firebase Cloud Messaging. For full details on how your data is collected, used, and protected, please review our Privacy Policy at www.getimmihub.com/privacy-policy.",
  },
  {
    title: "7. Disclaimers",
    content:
      "ImmiHub is NOT affiliated with USCIS, DHS, the Department of State, or any government agency. ImmiHub does NOT provide legal, immigration, or tax advice. Nothing in this app constitutes legal counsel or creates an attorney-client relationship. Expiry reminders are based solely on dates you review and confirm — ImmiHub is not responsible for incorrect or missed dates. ImmiHub is a document management tool and is not a substitute for professional immigration counsel. Users are solely responsible for verifying their own document expiry dates and compliance with applicable immigration requirements.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "ImmiHub is provided 'as is' and 'as available' without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. To the maximum extent permitted by law, ImmiHub and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to missed deadlines, incorrect OCR readings, visa lapses, or any immigration consequences arising from use or inability to use the service. Our total aggregate liability to you for any claims arising from these terms or the service is limited to the amount you paid for the service in the twelve months preceding the claim (which is $0 for the free beta tier).",
  },
  {
    title: "9. Termination",
    content:
      "You may delete your account and all associated data at any time from within the app or by contacting support@getimmihub.com. ImmiHub reserves the right to suspend or terminate accounts that violate these Terms of Service, with or without notice. Upon termination, your data will be deleted in accordance with our Privacy Policy.",
  },
  {
    title: "10. Changes to Terms",
    content:
      "We may update these Terms of Service from time to time. Material changes will be communicated via email or in-app notification at least 7 days before taking effect. Continued use of ImmiHub after changes constitutes your acceptance of the revised terms. The current version will always be available at www.getimmihub.com/terms.",
  },
  {
    title: "11. Governing Law",
    content:
      "These Terms of Service are governed by and construed in accordance with the laws of the State of Texas, United States of America, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Texas.",
  },
  {
    title: "12. Contact",
    content:
      "For questions about these Terms of Service: legal@getimmihub.com. For general support: support@getimmihub.com. Website: www.getimmihub.com.",
  },
];

export default function TermsPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: `100px ${layout.pagePaddingX} 48px`, background: colors.warmWhite }}>
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
            Terms of Service
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

      <section style={{ padding: `48px ${layout.pagePaddingX} 100px`, background: colors.warmWhite }}>
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