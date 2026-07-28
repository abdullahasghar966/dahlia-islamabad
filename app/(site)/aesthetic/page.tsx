import { Instagram } from "lucide-react";
import { AestheticGallery } from "@/components/sections/AestheticGallery";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { siteSettings } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aesthetic",
  description:
    "The Dahlia lookbook — interiors, golden hour, plants and plates from the greenest corner of F-6 Markaz, Islamabad.",
  path: "/aesthetic",
});

export default function AestheticPage() {
  return (
    <>
      <PageHero
        eyebrow="The lookbook"
        theme="blush"
        title="The room does half the work."
        lead="Interiors, golden hour, and the plates people photograph before they eat them."
      >
        <Button href={siteSettings.socials.instagram} magnetic>
          <Instagram size={18} aria-hidden />
          Follow @dahliaislamabad
        </Button>
      </PageHero>

      <Section theme="blush" className="pt-0">
        <AestheticGallery />
      </Section>
    </>
  );
}
