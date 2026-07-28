"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/motion/Marquee";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Figure } from "@/components/ui/Figure";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { gallery } from "@/lib/content/gallery";
import { themeStop } from "@/lib/theme";

/** S8 · sell the vibe — their "Aesthetic" highlight, in two directions. */
export function AestheticStrip() {
  const [open, setOpen] = useState<number | null>(null);
  const stop = themeStop("blush");

  const items: LightboxItem[] = gallery;
  const rowA = items.slice(0, 6);
  const rowB = items.slice(6);

  return (
    <section
      data-bg={stop.bg}
      data-fg={stop.fg}
      aria-labelledby="aesthetic-heading"
      className="band-y relative overflow-hidden"
    >
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow className="mb-5">The aesthetic</Eyebrow>
          <SplitHeading
            as="h2"
            id="aesthetic-heading"
            className="font-display-lg max-w-2xl text-h2 leading-[1.02]"
          >
            The room does half the work.
          </SplitHeading>
        </div>

        <Button href="/aesthetic" variant="secondary" magnetic>
          See the gallery
          <ArrowUpRight size={18} aria-hidden />
        </Button>
      </div>

      <div className="mt-14 flex flex-col gap-5">
        <StripRow items={rowA} direction="left" duration={62} onOpen={setOpen} offset={0} />
        <StripRow
          items={rowB}
          direction="right"
          duration={74}
          onOpen={setOpen}
          offset={rowA.length}
        />
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}

function StripRow({
  items,
  direction,
  duration,
  onOpen,
  offset,
}: {
  items: LightboxItem[];
  direction: "left" | "right";
  duration: number;
  onOpen: (index: number) => void;
  offset: number;
}) {
  return (
    <div className="strip">
      <Marquee direction={direction} duration={duration} gap="1.25rem">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(offset + i)}
            data-cursor="hover"
            aria-label={`Open image: ${item.caption}`}
            className="strip-tile w-[clamp(11rem,34vw,20rem)] shrink-0 rounded-img transition-[transform,filter,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dahlia motion-reduce:transition-none"
          >
            <Figure
              image={item.image}
              label={item.caption}
              tone={item.colorTheme}
              ratio="landscape"
              seed={item.id}
              sizes="(max-width: 640px) 34vw, 20rem"
            />
          </button>
        ))}
      </Marquee>
    </div>
  );
}
