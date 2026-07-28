import { AestheticStrip } from "@/components/sections/AestheticStrip";
import { Hero } from "@/components/sections/Hero";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { KineticBand } from "@/components/sections/KineticBand";
import { NurseryHighlight } from "@/components/sections/NurseryHighlight";
import { OffersCTA } from "@/components/sections/OffersCTA";
import { Pillars } from "@/components/sections/Pillars";
import { Preloader } from "@/components/sections/Preloader";
import { SignatureCarousel } from "@/components/sections/SignatureCarousel";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteSettings } from "@/lib/content/site";
import { localBusinessJsonLd, SITE_URL } from "@/lib/seo";

export const metadata = {
  // The root layout supplies title/description; the canonical has to be
  // declared per route or the homepage ships without one.
  alternates: { canonical: new URL("/", SITE_URL).toString() },
  description: siteSettings.seo.metaDescription,
};

/**
 * The showpiece. Section order and the color journey follow
 * 06-HOMEPAGE-SECTIONS.md:
 *   bone → bone → bone → moss → terracotta → forest → blush → dahlia → bone → forest
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Preloader />

      {/* S1 (the announcement marquee) renders inside <Header>, which is fixed. */}
      <Hero />
      <Pillars />
      <KineticBand />
      <SignatureCarousel />
      <NurseryHighlight />
      <AestheticStrip />
      <OffersCTA />
      <InstagramFeed />
    </>
  );
}
