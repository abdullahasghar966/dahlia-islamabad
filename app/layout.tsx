import type { Metadata, Viewport } from "next";
import { fraunces, generalSans } from "@/lib/fonts";
import { siteSettings } from "@/lib/content/site";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteSettings.seo.metaTitle,
    template: "%s — DAHLIA Islamabad (Café + Nursery)",
  },
  description: siteSettings.seo.metaDescription,
  applicationName: "DAHLIA Islamabad",
  authors: [{ name: "DAHLIA Islamabad" }],
  keywords: [
    "Dahlia Islamabad",
    "café F-6 Markaz",
    "plant nursery Islamabad",
    "brunch Islamabad",
    "whipped ricotta pizza",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "DAHLIA Islamabad",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Kept in step with the color journey by ThemeController.
  themeColor: "#F6F1E4",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${generalSans.variable}`}>
      <body>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
