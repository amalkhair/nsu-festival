import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/translate";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BottomNav } from "@/components/layout/BottomNav";

// Pages depend on the visitor's language (cookie), so they render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const name = translate(locale, "brand.name");
  return {
    title: { default: name, template: `%s · ${name}` },
    description: translate(locale, "meta.description"),
  };
}

export const viewport: Viewport = {
  themeColor: "#1d5bff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-dvh font-sans text-ink antialiased">
        <I18nProvider initialLocale={locale}>
          <SiteHeader />
          <main className="pb-28 md:pb-0">{children}</main>
          <SiteFooter />
          <BottomNav />
        </I18nProvider>
      </body>
    </html>
  );
}
