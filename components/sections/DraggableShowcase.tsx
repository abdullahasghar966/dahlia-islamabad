"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Draggable, gsap, prefersReducedMotion } from "@/lib/gsap-setup";
import { cn } from "@/lib/utils";

type ShowcaseProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
  trackClassName?: string;
  /** Affordance hint; hidden in scroll mode, where the gesture is obvious. */
  hint?: string;
};

type Mode = "drag" | "scroll";

/**
 * Horizontal showcase (07 §7).
 *
 * Two modes, chosen by input device:
 *
 * - **scroll** — touch devices and reduced-motion. A native `overflow-x` track
 *   with scroll-snap. This is not a fallback, it is the better option: native
 *   touch scrolling has real momentum, respects OS accessibility settings, and
 *   cannot be starved of events. GSAP Draggable never received touchmove here
 *   because Lenis handles touch at the document level first, so on a phone the
 *   "drag" affordance did nothing at all.
 * - **drag** — fine pointers only, where there is no native horizontal gesture
 *   and Draggable's inertia is what gives the reference its feel.
 *
 * `data-lenis-prevent` is what stops Lenis swallowing gestures over the track.
 * Prev/next buttons and arrow keys drive both modes identically.
 */
export function DraggableShowcase({
  children,
  label,
  className,
  trackClassName,
  hint = "drag",
}: ShowcaseProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const step = useRef(0);
  /**
   * Mirrored as state as well as a ref. Held in a ref alone, measuring it never
   * re-rendered, so `disabled={index >= maxIndex}` kept the initial `0` and the
   * Next button was permanently disabled — on every device, not just phones.
   * The ref is for clamping inside callbacks; the state is for rendering.
   */
  const maxIndexRef = useRef(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [index, setIndex] = useState(0);
  /**
   * Starts as "scroll" so the server-rendered markup is already a working
   * native-scroll carousel. Drag mode is the enhancement, applied only once
   * JS confirms a fine pointer — if the script never runs, the row still
   * scrolls instead of sitting there inert.
   */
  const [mode, setMode] = useState<Mode>("scroll");

  const measure = useCallback(() => {
    const wrap = viewport.current;
    const el = track.current;
    if (!wrap || !el) return { minX: 0, maxX: 0 };

    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) return { minX: 0, maxX: 0 };

    const first = cards[0].getBoundingClientRect();
    const second = cards[1]?.getBoundingClientRect();
    step.current = second ? second.left - first.left : first.width;
    if (step.current <= 0) step.current = first.width || 1;

    const overflow = Math.max(0, el.scrollWidth - wrap.clientWidth);
    const next = Math.max(0, Math.ceil(overflow / step.current));
    maxIndexRef.current = next;
    setMaxIndex((current) => (current === next ? current : next));
    return { minX: -overflow, maxX: 0 };
  }, []);

  /** Upgrade to drag only where there is no native horizontal gesture. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setMode("drag");
  }, []);

  /** drag mode only — Draggable + inertia. */
  useEffect(() => {
    if (mode !== "drag") return;
    const wrap = viewport.current;
    const el = track.current;
    if (!wrap || !el) return;

    const syncIndex = () => {
      if (!step.current) return;
      const x = gsap.getProperty(el, "x") as number;
      setIndex(Math.min(Math.max(Math.round(-x / step.current), 0), maxIndexRef.current));
    };

    const draggable = Draggable.create(el, {
      type: "x",
      inertia: true,
      edgeResistance: 0.85,
      dragResistance: 0.05,
      cursor: "grab",
      activeCursor: "grabbing",
      bounds: measure(),
      snap: {
        x: (value: number) =>
          step.current ? Math.round(value / step.current) * step.current : value,
      },
      onDrag: syncIndex,
      onThrowUpdate: syncIndex,
      onThrowComplete: syncIndex,
    })[0];

    const observer = new ResizeObserver(() => {
      draggable?.applyBounds(measure());
      syncIndex();
    });
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      draggable?.kill();
      gsap.set(el, { x: 0 });
    };
  }, [mode, measure]);

  /** scroll mode only — derive the index from real scroll position. */
  useEffect(() => {
    if (mode !== "scroll") return;
    const wrap = viewport.current;
    if (!wrap) return;

    measure();
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!step.current) return;
        setIndex(
          Math.min(Math.max(Math.round(wrap.scrollLeft / step.current), 0), maxIndexRef.current),
        );
      });
    };

    wrap.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(() => measure());
    observer.observe(wrap);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      wrap.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [mode, measure]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 0), maxIndexRef.current);
      setIndex(clamped);

      if (mode === "drag" && track.current) {
        gsap.to(track.current, {
          x: -clamped * step.current,
          duration: 0.8,
          ease: "expo.out",
          overwrite: true,
        });
        return;
      }
      viewport.current?.scrollTo({
        left: clamped * step.current,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [mode],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const scrolling = mode !== "drag";

  return (
    // `min-w-0 max-w-full`: the track inside is `w-max`, so without these this
    // component reports a huge min-content width and expands any flex/grid
    // parent it sits in.
    <div className={cn("relative min-w-0 max-w-full", className)}>
      <div
        ref={viewport}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        data-cursor={mode === "drag" ? "drag" : undefined}
        // Without this Lenis consumes the gesture before the track ever sees it.
        data-lenis-prevent
        className={cn(
          "relative rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dahlia",
          scrolling
            ? "snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "overflow-hidden",
        )}
      >
        <ul ref={track} className={cn("flex w-max gap-4 sm:gap-6", trackClassName)}>
          {children}
        </ul>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <ShowcaseButton
          label="Previous"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          icon={<ArrowLeft size={18} aria-hidden />}
        />
        <ShowcaseButton
          label="Next"
          onClick={() => goTo(index + 1)}
          disabled={index >= maxIndex}
          icon={<ArrowRight size={18} aria-hidden />}
        />
        {hint && mode === "drag" ? (
          <span aria-hidden className="eyebrow ml-2 opacity-45 select-none">
            {hint} →
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ShowcaseButton({
  label,
  onClick,
  disabled,
  icon,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      data-cursor="hover"
      className={cn(
        "grid h-11 w-11 place-items-center rounded-pill border border-current/30",
        "transition-[background-color,opacity,transform] duration-300",
        "hover:bg-current/10 active:scale-95",
        "disabled:pointer-events-none disabled:opacity-30",
      )}
    >
      {icon}
    </button>
  );
}
