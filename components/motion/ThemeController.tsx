"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap-setup";

/**
 * The Mana "flavor color" mechanic (07 §6): as each `[data-bg]` section takes
 * the viewport, the page background and ink cross-fade to that section's stop.
 *
 * Only `setProperty` happens here — `--page-bg` / `--page-fg` are registered as
 * `<color>` in globals.css, so the browser performs the interpolation. That is
 * cheaper than tweening a variable from JS and it collapses to an instant swap
 * under prefers-reduced-motion without any extra branching.
 *
 * Keyed on the pathname, and that is load-bearing. This component lives in the
 * layout, so it is NOT remounted by navigation — with an empty dependency array
 * it scanned `[data-bg]` once and then held detached nodes forever after the
 * first client-side route change. Detached elements report a zero rect, so the
 * resolver treated every one as "above the midline", the triggers never fired,
 * and the page kept whichever colour it had (usually bone, which reads as a
 * white page where a green one was expected) until a hard refresh rebuilt it.
 */
export function ThemeController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const sections = gsapSections();
    if (!sections.length) return;

    const apply = (el: HTMLElement) => {
      const bg = el.dataset.bg;
      const fg = el.dataset.fg;
      if (bg) root.style.setProperty("--page-bg", bg);
      if (fg) root.style.setProperty("--page-fg", fg);
      if (bg) {
        // Keeps the browser/OS chrome in step with the journey on mobile.
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute("content", bg);
      }
    };

    /**
     * `top 50%` / `bottom 50%` rather than 07 §6's 60/40.
     *
     * With 60/40 the windows overlap by a fifth of a viewport, so a section
     * shorter than ~1.2 screens hands its color to the next one while its own
     * content is still front and centre. Anchoring both edges to the midline
     * makes the ranges tile exactly — each section owns the theme for precisely
     * as long as it is crossing the middle of the screen, with no gaps and no
     * overlap, and short bands (Pillars, Offers) hold their color properly.
     */
    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => apply(section),
        onEnterBack: () => apply(section),
      }),
    );

    /**
     * Paint the stop the page actually loads at.
     *
     * This can't just be `sections[0]`: a trigger only fires on a *crossing*, so
     * whichever section already contains the load position never calls onEnter,
     * and blindly applying the first section would leave the wrong color stuck
     * until the next boundary. Resolve it from geometry instead — the last
     * section that starts above the viewport's midline.
     */
    const applyActive = () => {
      const line = window.scrollY + window.innerHeight * 0.5;
      // `isConnected` guards the window between a route swap and this effect
      // re-running: a detached node measures 0 and would otherwise win.
      const live = sections.filter((section) => section.isConnected);
      if (!live.length) return;

      let active = live[0];
      for (const section of live) {
        if (section.getBoundingClientRect().top + window.scrollY <= line) active = section;
      }
      apply(active);
    };

    applyActive();
    // Heights settle as fonts and images land; re-resolve when they do.
    ScrollTrigger.addEventListener("refresh", applyActive);

    return () => {
      ScrollTrigger.removeEventListener("refresh", applyActive);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}

function gsapSections() {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-bg]"));
}
