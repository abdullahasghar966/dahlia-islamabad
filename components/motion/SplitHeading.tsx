"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap-setup";
import { cn } from "@/lib/utils";

type SplitHeadingProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Play as soon as it mounts (hero) instead of waiting for scroll. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Line-by-line mask-up reveal (07 §3).
 *
 * `autoSplit` is not optional here. SplitText sets `white-space: nowrap` on
 * every line it creates, so a split is only correct for the width it was
 * measured at — split once and the lines can never re-wrap. On a phone that
 * produced a headline running straight off the screen, clipped by the
 * `overflow-x: hidden` on body (which is also why a document-level overflow
 * check reported zero while the text was visibly cut). `autoSplit` re-splits on
 * font load and width change, which is what keeps it honest across viewports.
 *
 * The animation is created inside `onSplit` and returned, so GSAP reverts the
 * previous one on every re-split rather than leaving orphaned tweens behind.
 */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  id,
  immediate = false,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const split = SplitText.create(el, {
      type: "lines",
      linesClass: "split-line",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) => {
        // A re-split (rotation, font swap) must not replay the reveal — it
        // would look like the page reloading. Only the first split animates.
        if (hasPlayed.current) {
          gsap.set(self.lines, { yPercent: 0, opacity: 1 });
          return undefined;
        }
        hasPlayed.current = true;

        return gsap.from(self.lines, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          delay,
          ease: "expo.out",
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: "top 82%", once: true } }),
        });
      },
    });

    // Line boxes change height as they split; re-measure dependent triggers.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(id);
      split.revert();
    };
  }, [immediate, delay]);

  return (
    <Tag ref={ref} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
