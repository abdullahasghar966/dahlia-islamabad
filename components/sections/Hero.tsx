"use client";

import { ArrowDown } from "lucide-react";
import { DraggableShowcase } from "@/components/sections/DraggableShowcase";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Parallax } from "@/components/motion/Parallax";
import { BotanicalArt } from "@/components/ui/BotanicalArt";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Figure } from "@/components/ui/Figure";
import { Pill } from "@/components/ui/Pill";
import { useReserveDrawer } from "@/components/layout/ReserveProvider";
import { themeStop } from "@/lib/theme";
import type { ColorTheme, ImageRef } from "@/lib/types";

type ShowcaseItem = {
  kind: string;
  name: string;
  note: string;
  tone: ColorTheme;
  image: ImageRef;
  priority?: boolean;
};

/**
 * The hero subjects: one signature dish, one signature plant, one room.
 * TODO: real photography — 12-ASSETS-CHECKLIST.md §2 "hero subjects".
 */
const ITEMS: ShowcaseItem[] = [
  {
    kind: "From the pass",
    name: "Whipped Ricotta",
    note: "Detroit-style. Grilled chicken, pesto, fresh whipped ricotta.",
    tone: "dahlia",
    image: { alt: "Whipped ricotta Detroit-style pizza" },
    priority: true,
  },
  {
    kind: "From the shelves",
    name: "Monstera deliciosa",
    note: "Bright indirect light. Give it something to climb.",
    tone: "forest",
    image: { alt: "Monstera deliciosa in a terracotta pot" },
  },
  {
    kind: "The room",
    name: "The long table",
    note: "Golden hour, four rows of plants deep.",
    tone: "clay",
    image: { alt: "The long communal table at Dahlia, mid-afternoon" },
  },
  {
    kind: "House special",
    name: "Lotus French Toast",
    note: "House-baked brioche, egg bath, Lotus Biscoff, whipped cream.",
    tone: "clay",
    image: { alt: "Lotus Biscoff french toast with whipped cream" },
  },
];

/** S3 · the identity hit — "café + nursery" in one breath. */
export function Hero() {
  const stop = themeStop("bone");
  const { openDrawer } = useReserveDrawer();

  return (
    <section
      data-bg={stop.bg}
      data-fg={stop.fg}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16"
    >
      {/* botanical accents, drifting at different rates */}
      <Parallax
        speed={0.28}
        className="pointer-events-none absolute -top-10 -left-16 -z-10 hidden w-[26rem] text-fern/[0.09] md:block"
      >
        <BotanicalArt motif="monstera" className="w-full" strokeWidth={2.5} />
      </Parallax>
      <Parallax
        speed={0.2}
        className="pointer-events-none absolute -right-20 bottom-0 -z-10 w-[22rem] text-terracotta/[0.10]"
      >
        <BotanicalArt motif="sprig" className="w-full" strokeWidth={2.5} />
      </Parallax>

      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ---- copy ---- */}
        <div className="lg:col-span-5">
          <Eyebrow className="mb-6">F-6 Markaz · Islamabad</Eyebrow>

          <SplitHeading
            as="h1"
            id="hero-heading"
            immediate
            delay={0.15}
            className="font-display-lg text-h1 leading-[0.95]"
          >
            Home to a café <span className="italic">&amp;</span> a plant nursery.
          </SplitHeading>

          <p className="mt-7 max-w-md text-lead opacity-75">
            Sit down for from-scratch plates. Walk out with something green. One address, two joys.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/menu" size="lg" magnetic data-cursor="hover">
              See the menu
            </Button>
            <Button variant="secondary" size="lg" onClick={openDrawer} data-cursor="hover">
              Reserve a table
            </Button>
          </div>

          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-small opacity-65">
            <Pill>Open till 11pm</Pill>
            <span>Walk-ins welcome</span>
            <span aria-hidden>·</span>
            <span>Tables of 8+ can reserve</span>
          </p>
        </div>

        {/* ---- draggable showcase ---- */}
        <div className="lg:col-span-7">
          <DraggableShowcase label="Dahlia highlights" hint="drag">
            {ITEMS.map((item, i) => (
              <li
                key={item.name}
                className="w-[clamp(14rem,62vw,20rem)] shrink-0 snap-start sm:w-[clamp(16rem,32vw,21rem)]"
              >
                <figure className="float" style={{ animationDelay: `${i * 0.7}s` }}>
                  <Figure
                    image={item.image}
                    label={item.name}
                    tone={item.tone}
                    ratio="portrait"
                    seed={item.name}
                    priority={item.priority}
                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 40vw, 21rem"
                    className="shadow-[0_20px_60px_-20px_rgb(23_19_14/0.25)]"
                  />
                  <figcaption className="mt-4">
                    <span className="eyebrow block opacity-55">{item.kind}</span>
                    <span className="font-display-sm mt-1 block text-lead leading-snug">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-small opacity-60">{item.note}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </DraggableShowcase>
        </div>
      </div>

      {/* scroll cue */}
      <div className="shell mt-12 hidden md:block">
        <span className="eyebrow inline-flex items-center gap-2 opacity-45">
          <ArrowDown size={14} className="animate-bounce motion-reduce:animate-none" aria-hidden />
          Scroll
        </span>
      </div>
    </section>
  );
}
