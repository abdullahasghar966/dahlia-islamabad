"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap-setup";

/**
 * Route-change housekeeping.
 *
 * NO VISUAL TRANSITION — 07 §11 asks for one and it is deliberately deferred.
 * Every cross-fade approach shares one failure mode: the incoming page has to
 * start at `opacity: 0`, and whenever the animation does not run to completion
 * the page is left blank. Browsers pause animations and transitions in a
 * backgrounded tab, so a fade paused at 0% renders nothing until the tab is
 * focused. That was reproduced here with a JS fade, a keyframe animation, and a
 * transition out of `@starting-style` — all three.
 *
 * It is a narrow window and the visual gain is small, so shipping a plain fade
 * was not worth an invisible-page failure mode that could not be verified
 * visually in this environment. The right implementation is the View
 * Transitions API (07 §11's own first choice), which the browser drives against
 * a snapshot and cannot leave half-applied. See PLACEHOLDERS.md §7.
 *
 * What remains is the part that earns its keep: rebuilding scroll measurements
 * after a route swap, once the new layout has settled.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Two frames: one for React to commit, one for layout/fonts to settle.
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh()),
    );
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
