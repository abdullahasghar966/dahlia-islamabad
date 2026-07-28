"use client";

import { ArrowUpRight } from "lucide-react";
import { DraggableShowcase } from "@/components/sections/DraggableShowcase";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { DishCard } from "@/components/menu/DishCard";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { signatureDishes } from "@/lib/content/menu";

/** S6 · make the food irresistible, then funnel to /menu. */
export function SignatureCarousel() {
  return (
    <Section theme="terracotta" aria-labelledby="signature-heading" contained={false}>
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow className="mb-5">The café</Eyebrow>
          <SplitHeading
            as="h2"
            id="signature-heading"
            className="font-display-lg max-w-2xl text-h2 leading-[1.02]"
          >
            Straight from the pass.
          </SplitHeading>
        </div>

        <Button href="/menu" variant="secondary" magnetic>
          View full menu
          <ArrowUpRight size={18} aria-hidden />
        </Button>
      </div>

      <div className="shell mt-12">
        <DraggableShowcase label="Signature dishes" hint="drag">
          {signatureDishes.map((dish) => (
            <li
              key={dish.slug}
              className="w-[clamp(13rem,58vw,17rem)] shrink-0 snap-start sm:w-[clamp(15rem,26vw,19rem)]"
            >
              <DishCard
                dish={dish}
                sizes="(max-width: 640px) 58vw, (max-width: 1024px) 34vw, 19rem"
              />
            </li>
          ))}
        </DraggableShowcase>
      </div>
    </Section>
  );
}
