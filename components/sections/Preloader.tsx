"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap-setup";
import { Wordmark } from "@/components/layout/Wordmark";

const SESSION_KEY = "dahlia.preloaded";

/**
 * S0 · sets the tone and hides first-paint jank. Under 1.2s, skipped on repeat
 * visits within the session, and skipped entirely under reduced motion.
 *
 * It renders nothing on the server: a full-screen cover in the SSR HTML would
 * hide the page for anyone whose JS fails, and would be a needless LCP delay.
 */
export function Preloader() {
  const overlay = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage blocked — treat as seen and skip */
    }

    if (seen || prefersReducedMotion()) return;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = overlay.current;
    if (!el) return;

    const tl = gsap.timeline({ onComplete: () => setActive(false) });

    tl.fromTo(
      el.querySelector("[data-preloader-mark]"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
    )
      .fromTo(
        el.querySelector("[data-preloader-line]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, ease: "power2.inOut" },
        "-=0.2",
      )
      .to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "expo.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={overlay}
      aria-hidden="true"
      className="fixed inset-0 z-[190] grid place-items-center bg-bone text-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex flex-col items-center gap-5">
        <span data-preloader-mark className="opacity-0">
          <Wordmark className="text-h3" />
        </span>
        <span
          data-preloader-line
          className="block h-px w-40 origin-left bg-current/40"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
