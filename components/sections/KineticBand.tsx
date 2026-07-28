"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, isCompactViewport } from "@/lib/gsap-setup";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { themeStop } from "@/lib/theme";
import { cn } from "@/lib/utils";

const WORDS = ["GATHER", "GROW", "GOOD DAYS"];

/**
 * S5 · the reference's 297px "FLAVORS" moment, re-cast.
 *
 * The band is three viewports tall with a sticky stage inside. Scroll progress
 * is split into one slot per word: inside its slot a word fades in, drifts
 * horizontally, and fades out, while its letters ride slightly different
 * vertical offsets (07 §5, per-letter parallax).
 *
 * Everything is written through gsap quickSetters — only `transform` and
 * `opacity` are touched, never a layout property.
 */
export function KineticBand() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const stop = themeStop("moss");

  useEffect(() => {
    const root = section.current;
    const stageEl = stage.current;
    if (!root || !stageEl) return;

    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }

    const words = Array.from(stageEl.querySelectorAll<HTMLElement>("[data-word]"));
    if (!words.length) return;

    const compact = isCompactViewport();
    const drift = compact ? 9 : 22; // % of the word's own width
    const lift = compact ? 3 : 8; // % of line height, per letter

    // How far a word rides vertically across its slot, as % of its own height.
    // Big enough that an outgoing and incoming word never occupy the same band.
    const rise = compact ? 45 : 65;

    const setters = words.map((word) => ({
      opacity: gsap.quickSetter(word, "opacity"),
      x: gsap.quickSetter(word, "xPercent"),
      y: gsap.quickSetter(word, "yPercent"),
      letters: Array.from(word.querySelectorAll<HTMLElement>("[data-letter]")).map((letter) =>
        gsap.quickSetter(letter, "yPercent"),
      ),
    }));

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress * WORDS.length;

        setters.forEach((setter, index) => {
          /**
           * 0 → 1 across this word's own slot, with a little spill either side
           * so consecutive words cross-fade rather than cutting.
           *
           * The overlap only works because the words also *rise*: all three are
           * stacked in one grid cell, so a pure opacity cross-fade printed one
           * word through another and read as ghosting. Riding them upward means
           * the outgoing word has already cleared the centre by the time the
           * incoming one arrives, so the two are never legible in the same
           * place — and there is no dead moment where the stage is empty.
           */
          const local = progress - index;
          const inSlot = local > -0.25 && local < 1.25;

          setter.opacity(inSlot ? fade(local) : 0);
          if (!inSlot) return;

          setter.x((0.5 - local) * drift * 2);
          setter.y((0.5 - local) * rise * 2);

          setter.letters.forEach((setY, li) => {
            const phase = ((li % 3) - 1) * lift;
            setY(phase * (local - 0.5) * 2);
          });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={section}
      data-bg={stop.bg}
      data-fg={stop.fg}
      aria-labelledby="kinetic-heading"
      className={cn("relative", reduced ? "py-[var(--spacing-section)]" : "h-[300vh]")}
    >
      {/* Screen readers get the statement once, as plain prose. */}
      <h2 id="kinetic-heading" className="sr-only">
        Gather, grow, good days.
      </h2>

      <div
        className={cn(
          "flex flex-col items-center justify-center gap-10 overflow-hidden",
          reduced ? "" : "sticky top-0 h-[100svh]",
        )}
      >
        <div ref={stage} className="grid w-full place-items-center" aria-hidden="true">
          {WORDS.map((word, index) => (
            <div
              key={word}
              data-word
              className={cn(
                "font-display-lg col-start-1 row-start-1 flex whitespace-nowrap",
                "text-mega leading-[0.78] tracking-[-0.02em] select-none",
                reduced && index > 0 && "hidden",
              )}
              style={{ opacity: reduced ? 1 : index === 0 ? 1 : 0, willChange: "transform, opacity" }}
            >
              {[...word].map((char, i) => (
                <span key={`${char}-${i}`} data-letter className="inline-block">
                  {char === " " ? " " : char}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="shell">
          <SplitHeading
            as="p"
            className="mx-auto max-w-2xl text-center text-lead opacity-80"
          >
            Long lunches, slow afternoons, and something green to take home. This is what we grow
            here.
          </SplitHeading>
        </div>
      </div>
    </section>
  );
}

/** Ease in over the first quarter of the slot, out over the last. */
function fade(local: number) {
  if (local < 0.25) return smooth((local + 0.25) / 0.5);
  if (local > 0.75) return smooth((1.25 - local) / 0.5);
  return 1;
}

function smooth(t: number) {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}
