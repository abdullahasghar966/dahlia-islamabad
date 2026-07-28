"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-setup";

/**
 * Smooth inertia scroll + a single RAF loop shared with GSAP (07 §1).
 * Under prefers-reduced-motion Lenis never starts and the browser scrolls natively.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      // ScrollTrigger still drives reveals; it just listens to native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Native momentum on touch feels better than a simulated one.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // One ticker, not two competing RAF loops (16-GPU-ANIMATION-NOTES.md §3).
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    window.__lenis = lenis;

    // Late-loading images change page height; recalculate trigger positions.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
