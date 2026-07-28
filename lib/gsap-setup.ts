"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";

/**
 * Register once, on the client only. SplitText and InertiaPlugin ship free
 * in GSAP 3.13+ (03-TECH-STACK.md §2).
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, SplitText, Flip, Observer);
  registered = true;
}

export { gsap, ScrollTrigger, Draggable, InertiaPlugin, SplitText, Flip, Observer };

/** The one place that decides whether motion runs at all. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const EASE = {
  outExpo: "expo.out",
  inOutSoft: "power3.inOut",
  outBack: "back.out(1.6)",
} as const;

/** Cap the most expensive effects below the mobile breakpoint (07 §15). */
export function isCompactViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}
