"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap-setup";

/**
 * S11 · the footer easter egg (06, 07 §12) — our answer to the reference's
 * "Press Space to jump". Click, or focus and press Enter/Space: the stem draws
 * itself, leaves unfurl, a dahlia blooms, a few motes drift off. Resets after a
 * few seconds.
 *
 * Non-essential by design: it is keyboard-triggerable, announces nothing
 * intrusive, and under reduced motion it simply shows the bloomed end state.
 */
export function SeedlingEasterEgg() {
  const root = useRef<SVGSVGElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [grown, setGrown] = useState(false);

  // Reduced motion: skip the animation and render the finished bloom.
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll(".seed-stem"), { strokeDashoffset: 0 });
      gsap.set(el.querySelectorAll(".seed-leaf, .seed-petal, .seed-core"), {
        scale: 1,
        opacity: 1,
      });
      setGrown(true);
      return;
    }

    reset(el);
  }, []);

  const grow = useCallback(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    if (timeline.current?.isActive()) return;

    setGrown(true);
    timeline.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.delayedCall(2.6, () => {
          if (!root.current) return;
          gsap.to(root.current.querySelectorAll(".seed-petal, .seed-core, .seed-leaf"), {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            stagger: 0.02,
            onComplete: () => {
              if (root.current) reset(root.current);
              setGrown(false);
            },
          });
          gsap.to(root.current.querySelectorAll(".seed-stem"), {
            strokeDashoffset: 200,
            duration: 0.5,
            ease: "power2.in",
          });
        });
      },
    });

    tl.to(el.querySelectorAll(".seed-stem"), {
      strokeDashoffset: 0,
      duration: 0.75,
      ease: "power2.out",
    })
      .to(
        el.querySelectorAll(".seed-leaf"),
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
        "-=0.35",
      )
      .to(
        el.querySelectorAll(".seed-petal"),
        { scale: 1, opacity: 1, duration: 0.55, stagger: 0.035, ease: "back.out(2.2)" },
        "-=0.15",
      )
      .to(el.querySelectorAll(".seed-core"), { scale: 1, opacity: 1, duration: 0.3 }, "-=0.25")
      .fromTo(
        el.querySelectorAll(".seed-mote"),
        { scale: 0, opacity: 0, x: 0, y: 0 },
        {
          scale: 1,
          opacity: 1,
          x: (i: number) => (i % 2 === 0 ? 1 : -1) * (14 + i * 5),
          y: () => -18 - Math.random() * 22,
          duration: 1.1,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(el.querySelectorAll(".seed-mote"), { opacity: 0, duration: 0.5 }, "-=0.4");

    timeline.current = tl;
  }, []);

  useEffect(() => () => void timeline.current?.kill(), []);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={grow}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            grow();
          }
        }}
        aria-label="Grow a seedling"
        data-cursor="hover"
        className="grid h-20 w-16 place-items-center rounded-card transition-colors hover:bg-current/5"
      >
        <svg
          ref={root}
          viewBox="0 0 100 130"
          className="h-full w-full overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          {/* pot */}
          <path
            d="M32 104h36l-5 20a3 3 0 0 1-3 2H40a3 3 0 0 1-3-2l-5-20Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect
            x="28"
            y="96"
            width="44"
            height="10"
            rx="4"
            stroke="currentColor"
            strokeWidth="3"
          />

          {/* stem */}
          <path
            className="seed-stem"
            d="M50 96C50 76 50 60 50 44"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="200"
            strokeDashoffset="200"
          />

          {/* leaves */}
          <path
            className="seed-leaf"
            d="M50 80c14-2 22-12 20-24-12 1-20 11-20 24Z"
            fill="currentColor"
            opacity="0"
            style={{ transformOrigin: "50px 80px" }}
          />
          <path
            className="seed-leaf"
            d="M50 68c-14-2-22-12-20-24 12 1 20 11 20 24Z"
            fill="currentColor"
            opacity="0"
            style={{ transformOrigin: "50px 68px" }}
          />

          {/* bloom */}
          <g style={{ transformOrigin: "50px 34px" }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <ellipse
                key={i}
                className="seed-petal"
                cx="50"
                cy="22"
                rx="4.5"
                ry="11"
                fill="currentColor"
                opacity="0"
                transform={`rotate(${i * 36} 50 34)`}
                style={{ transformOrigin: "50px 34px" }}
              />
            ))}
            <circle
              className="seed-core"
              cx="50"
              cy="34"
              r="5"
              fill="currentColor"
              opacity="0"
              style={{ transformOrigin: "50px 34px" }}
            />
          </g>

          {/* motes */}
          {Array.from({ length: 5 }).map((_, i) => (
            <circle
              key={`mote-${i}`}
              className="seed-mote"
              cx={50 + (i - 2) * 3}
              cy="34"
              r="1.8"
              fill="currentColor"
              opacity="0"
            />
          ))}
        </svg>
      </button>

      <p aria-hidden className="max-w-[9rem] text-small opacity-55">
        {grown ? "there she is." : "psst — click the seedling."}
      </p>
    </div>
  );
}

function reset(el: SVGSVGElement) {
  gsap.set(el.querySelectorAll(".seed-stem"), { strokeDashoffset: 200 });
  gsap.set(el.querySelectorAll(".seed-leaf, .seed-petal, .seed-core, .seed-mote"), {
    scale: 0,
    opacity: 0,
    x: 0,
    y: 0,
  });
}
