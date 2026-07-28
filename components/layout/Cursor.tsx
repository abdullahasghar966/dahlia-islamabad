"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap-setup";

/**
 * A small leaf that lerps toward the pointer and swells over anything marked
 * `data-cursor="hover"` (07 §9).
 *
 * The native cursor stays visible. 13-SEO-PERF-A11Y.md §3 is explicit that a
 * custom cursor must never be the only affordance, so this is purely additive —
 * it never replaces hover or focus states, and it does not render at all on
 * touch devices or under reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });

    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;

    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
      x(event.clientX);
      y(event.clientY);

      const target = (event.target as HTMLElement | null)?.closest?.(
        '[data-cursor="hover"], a, button',
      );
      const isDrag =
        (event.target as HTMLElement | null)?.closest?.('[data-cursor="drag"]') != null;

      gsap.to(el, {
        scale: isDrag ? 2.6 : target ? 1.9 : 1,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      visible = false;
      gsap.to(el, { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed top-0 left-0 z-[150] opacity-0 mix-blend-difference"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#F6F1E4" aria-hidden="true">
        <path d="M12 2c5 3.6 6.3 11.4 0 20-6.3-8.6-5-16.4 0-20Z" />
      </svg>
    </div>
  );
}
