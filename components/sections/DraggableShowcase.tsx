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
  /** Show the drag affordance label under the cursor. */
  hint?: string;
};

/**
 * Horizontal drag with momentum and snap (07 §7) — the reference's hero/carousel
 * feel, driven by GSAP Draggable + InertiaPlugin.
 *
 * Accessibility (13 §3): prev/next buttons and Left/Right arrow keys control the
 * same index the drag does, so nothing here is pointer-only. Under reduced
 * motion the whole thing degrades to a native scroll-snap row and Draggable is
 * never created.
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
  const maxIndex = useRef(0);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  const goTo = useCallback((next: number) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.min(Math.max(next, 0), maxIndex.current);
    setIndex(clamped);

    if (prefersReducedMotion()) {
      viewport.current?.scrollTo({ left: clamped * step.current, behavior: "auto" });
      return;
    }
    gsap.to(el, { x: -clamped * step.current, duration: 0.8, ease: "expo.out", overwrite: true });
  }, []);

  useEffect(() => {
    const wrap = viewport.current;
    const el = track.current;
    if (!wrap || !el) return;

    if (prefersReducedMotion()) {
      setReduced(true);
      setReady(true);
      return;
    }

    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) return;

    const measure = () => {
      const first = cards[0].getBoundingClientRect();
      const second = cards[1]?.getBoundingClientRect();
      step.current = second ? second.left - first.left : first.width;
      if (step.current <= 0) step.current = first.width || 1;

      const overflow = Math.max(0, el.scrollWidth - wrap.clientWidth);
      maxIndex.current = Math.max(0, Math.ceil(overflow / step.current));

      // A resize can leave the track parked past its new end.
      const x = gsap.getProperty(el, "x") as number;
      if (-x > overflow) gsap.set(el, { x: -overflow });

      return { minX: -overflow, maxX: 0 };
    };

    const syncIndex = () => {
      if (!step.current) return;
      const x = gsap.getProperty(el, "x") as number;
      setIndex(Math.min(Math.max(Math.round(-x / step.current), 0), maxIndex.current));
    };

    const draggable = Draggable.create(el, {
      type: "x",
      inertia: true,
      edgeResistance: 0.85,
      dragResistance: 0.05,
      allowNativeTouchScrolling: true,
      cursor: "grab",
      activeCursor: "grabbing",
      bounds: measure(),
      snap: {
        x: (value: number) => {
          if (!step.current) return value;
          return Math.round(value / step.current) * step.current;
        },
      },
      onDrag: syncIndex,
      onThrowUpdate: syncIndex,
      onThrowComplete: syncIndex,
    })[0];

    setReady(true);

    const observer = new ResizeObserver(() => {
      draggable?.applyBounds(measure());
      syncIndex();
    });
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      draggable?.kill();
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={viewport}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        data-cursor="drag"
        className={cn(
          "relative rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dahlia",
          reduced
            ? "snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
            : "overflow-hidden",
        )}
      >
        <ul
          ref={track}
          className={cn(
            "flex w-max gap-4 sm:gap-6",
            reduced && "w-auto",
            !ready && "opacity-0",
            trackClassName,
          )}
        >
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
          disabled={index >= maxIndex.current}
          icon={<ArrowRight size={18} aria-hidden />}
        />
        {hint ? (
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
