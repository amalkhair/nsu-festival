import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: {
    default: "NSU International Cultural Festival",
    template: "%s · NSU Cultural Festival",
  },
  description: "A World of Cultures, One Community. Map, schedule, country booths, quizzes and recipes.",
};

export const viewport: Viewport = {
  themeColor: "#1d5bff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-dvh font-sans text-ink antialiased">
        <I18nProvider>
          <SiteHeader />
          <main className="pb-28 md:pb-0">{children}</main>
          <SiteFooter />
          <BottomNav />
        </I18nProvider>
      </body>
    </html>
  );
}
