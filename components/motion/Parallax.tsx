"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, isCompactViewport } from "@/lib/gsap-setup";
import { cn } from "@/lib/utils";

/**
 * Scroll-scrubbed translate (07 §15 · transform only, never layout props).
 * Travel is halved on compact viewports and disabled entirely for reduced motion.
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: React.ReactNode;
  /** Fraction of the element's height to travel across the scroll range. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const travel = (isCompactViewport() ? speed * 0.5 : speed) * 100;

    const tween = gsap.fromTo(
      el,
      { yPercent: travel * -0.5 },
      {
        yPercent: travel * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
