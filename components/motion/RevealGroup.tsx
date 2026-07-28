"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-setup";
import { cn } from "@/lib/utils";

/**
 * Batched grid stagger (07 §4). One ScrollTrigger for the whole group rather
 * than one per card — the efficient pattern for the menu, plant and gallery grids.
 *
 * Children opt in with `data-reveal`; globals.css hides them and the batch
 * releases them. Reduced motion reveals everything immediately via CSS.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  start = "top 85%",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  start?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
    if (!items.length) return;

    if (prefersReducedMotion()) {
      items.forEach((item) => item.classList.add("is-revealed"));
      return;
    }

    const batch = ScrollTrigger.batch(items, {
      start,
      onEnter: (targets) =>
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          stagger,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
          onComplete: () =>
            (targets as HTMLElement[]).forEach((t) => {
              t.style.willChange = "auto";
            }),
        }),
    });

    return () => batch.forEach((t) => t.kill());
  }, [stagger, start]);

  return (
    <div ref={root} className={cn(className)}>
      {children}
    </div>
  );
}
