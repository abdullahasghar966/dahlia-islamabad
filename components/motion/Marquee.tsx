"use client";

import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. Higher = slower. */
  duration?: number;
  direction?: "left" | "right";
  pausable?: boolean;
  gap?: string;
  className?: string;
  /** Decorative marquees are hidden from screen readers (13 §3). */
  decorative?: boolean;
};

/**
 * Infinite ticker (07 §8). Pure CSS — no JS, no RAF, and it simply stops under
 * prefers-reduced-motion (the media query in globals.css turns the animation
 * off and lets the row scroll manually instead).
 *
 * The track is duplicated once and translated by exactly its own width plus one
 * gap, which is what makes the loop seamless.
 */
export function Marquee({
  children,
  duration = 40,
  direction = "left",
  pausable = true,
  gap = "2rem",
  className,
  decorative = false,
}: MarqueeProps) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn("marquee", className)}
      data-direction={direction}
      data-pausable={pausable}
      aria-hidden={decorative || undefined}
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-gap": gap,
        } as React.CSSProperties
      }
    >
      <div className="marquee__track">{items}</div>
      {/* The seamless loop needs a second copy. `inert` keeps its controls out
          of the tab order and off the accessibility tree entirely. */}
      <div className="marquee__track" aria-hidden="true" inert>
        {items}
      </div>
    </div>
  );
}
