"use client";

import { SplitHeading } from "@/components/motion/SplitHeading";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { BotanicalArt } from "@/components/ui/BotanicalArt";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { useReserveDrawer } from "@/components/layout/ReserveProvider";
import { offers } from "@/lib/content/site";

/** S9 · the reddest point of the color journey, and the conversion moment. */
export function OffersCTA() {
  const { openDrawer } = useReserveDrawer();
  const offer = offers.find((o) => o.active) ?? offers[0];

  // overflow-hidden: the bloom below is deliberately hung off the right edge,
  // and this band is not otherwise a clipping context.
  return (
    <Section
      theme="dahlia"
      id="reserve"
      aria-labelledby="offers-heading"
      className="overflow-hidden"
    >
      <BotanicalArt
        motif="bloom"
        className="pointer-events-none absolute -top-16 -right-16 -z-10 w-[28rem] opacity-[0.09]"
        strokeWidth={2}
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-5">This weekend</Eyebrow>

          <SplitHeading
            as="h2"
            id="offers-heading"
            className="font-display-lg text-h2 leading-[1.02]"
          >
            {offer.title}
          </SplitHeading>

          <p className="mt-7 max-w-lg text-lead opacity-80">{offer.body}</p>

          <div className="mt-9">
            <Button size="lg" onClick={openDrawer} magnetic data-cursor="hover">
              Reserve a table
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-end lg:col-span-5">
          <h3 className="font-display-sm text-h3 leading-tight">
            Events and seasonal drops, occasionally.
          </h3>
          <p className="mt-3 text-small opacity-75">
            No spam, no daily nonsense. Just the things worth turning up for.
          </p>

          <NewsletterForm className="mt-6" />

          <p className="mt-6 text-small opacity-55">
            We don&apos;t deliver to the balcony next door yet. But you can carry a fern that far.
          </p>
        </div>
      </div>
    </Section>
  );
}
