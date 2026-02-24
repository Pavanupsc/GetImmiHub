"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { colors } from "@/lib/design-tokens";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: colors.warmWhite }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${colors.blueMist}; color: ${colors.navy}; }
        input::placeholder { color: ${colors.gray400}; }
        @media (max-width: 900px) {
          .problem-row { grid-template-columns: 1fr !important; gap: 32px !important; margin-bottom: 80px !important; }
          .problem-image, .problem-text { order: unset !important; }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 900px) {
          .how-row { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
