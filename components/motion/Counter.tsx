"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Ticks 0 → target when it enters view (07 §13). Under reduced motion the final
 * value is rendered immediately, which is also what a screen reader announces.
 */
export function Counter({
  to,
  duration = 1.8,
  format = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n)),
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  format?: (value: number) => string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
      {suffix}
    </span>
  );
}
