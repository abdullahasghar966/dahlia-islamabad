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
 * Line-by-line mask-up reveal (07 §3). SplitText wraps each line in an
 * overflow-hidden parent, then the lines slide out from under it.
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

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;

    // Wait for webfonts so lines are split at their final measured widths.
    const run = () => {
      split = new SplitText(el, {
        type: "lines",
        linesClass: "split-line",
        mask: "lines",
      });

      tween = gsap.from(split.lines, {
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
    };

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      run();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [immediate, delay]);

  return (
    <Tag ref={ref} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
