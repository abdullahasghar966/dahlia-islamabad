import { MapPin, MessageCircle, Phone, UtensilsCrossed } from "lucide-react";
import { BankDiscounts } from "@/components/sections/BankDiscounts";
import { ReserveForm } from "@/components/layout/ReserveForm";
import { Button } from "@/components/ui/Button";
import { HoursTable } from "@/components/ui/HoursTable";
import { JsonLd } from "@/components/ui/JsonLd";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteSettings } from "@/lib/content/site";
import { localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Visit",
  description:
    "1 Agha Khan Rd, F-6 Markaz, Islamabad. Opening hours, directions, reservations and how to order from Dahlia — café and plant nursery.",
  path: "/visit",
});

export default function VisitPage() {
  const { address, phone, phoneHref, whatsapp, foodpandaUrl, mapsUrl } = siteSettings;

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />

      <PageHero
        eyebrow="Come and see us"
        theme="forest"
        title="F-6's greenest corner."
        lead="One address, two joys. We run on walk-ins — tables of eight or more can be reserved ahead."
      />

      <Section theme="forest" className="pt-0">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ---- where & when ---- */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="eyebrow mb-4 opacity-65">Where</h2>
              <address className="font-display-sm text-h3 leading-[1.2] not-italic">
                {address.line1},<br />
                {address.area},<br />
                {address.city} {address.postal}
              </address>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button href={mapsUrl} variant="secondary">
                  <MapPin size={16} aria-hidden />
                  Get directions
                </Button>
                <Button href={phoneHref} variant="secondary">
                  <Phone size={16} aria-hidden />
                  {phone}
                </Button>
              </div>
            </div>

            <div>
              <h2 className="eyebrow mb-4 opacity-65">When</h2>
              <HoursTable className="max-w-md" />
              <p className="mt-3 max-w-md text-small opacity-55">
                Weekend brunch opens at 10. Kitchen closes a little before we do.
              </p>
            </div>

            <MapEmbed />

            <div>
              <h2 className="eyebrow mb-4 opacity-65">Or reach us</h2>
              <div className="flex flex-wrap gap-2.5">
                <Button href={whatsapp} variant="secondary">
                  <MessageCircle size={16} aria-hidden />
                  WhatsApp
                </Button>
                <Button href={foodpandaUrl} variant="secondary">
                  <UtensilsCrossed size={16} aria-hidden />
                  Order on foodpanda
                </Button>
              </div>
              <SocialLinks className="mt-5" />
            </div>

            <BankDiscounts />
          </div>

          {/* ---- reserve ---- */}
          <div className="rounded-card bg-cream p-6 text-ink sm:p-9 lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <h2 className="font-display-sm text-h3">Reserve a table</h2>
            <p className="mt-2 mb-7 text-small text-ink-soft">
              Tell us how many first — that decides whether we can hold a table or you&apos;re
              better off walking in.
            </p>
            <ReserveForm />
          </div>
        </div>
      </Section>
    </>
  );
}
