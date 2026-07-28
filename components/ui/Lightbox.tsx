"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Figure } from "@/components/ui/Figure";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import type { ColorTheme, ImageRef } from "@/lib/types";

export type LightboxItem = {
  id: string;
  caption: string;
  image: ImageRef;
  colorTheme: ColorTheme;
};

/**
 * Full-screen image viewer (07 §10). Esc closes, arrows step, Lenis is paused,
 * and focus is held inside the overlay.
 *
 * `layoutId` opts into motion's shared-element transition. The /aesthetic grid
 * passes it because each tile is unique; the homepage marquee does not, because
 * its tiles are duplicated to make the loop seamless and a repeated layoutId
 * would make the origin ambiguous.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
  sharedLayout = false,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
  sharedLayout?: boolean;
}) {
  const reduce = useReducedMotion();
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;

    lockScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (event.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
      // Nothing else in the document should be reachable while this is open.
      if (event.key === "Tab") event.preventDefault();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [open, index, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          className="fixed inset-0 z-[140] flex flex-col bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.001 : 0.3 }}
        >
          <div className="flex shrink-0 items-center justify-between text-cream">
            <p className="text-small opacity-70">
              {index + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Close"
              className="grid h-11 w-11 place-items-center rounded-pill border border-cream/25 transition-colors hover:bg-cream/10"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4 sm:gap-6">
            <NavButton
              label="Previous image"
              onClick={() => onNavigate((index - 1 + items.length) % items.length)}
              icon={<ChevronLeft size={22} aria-hidden />}
            />

            <motion.figure
              key={item.id}
              {...(sharedLayout && !reduce ? { layoutId: `tile-${item.id}` } : {})}
              initial={reduce || sharedLayout ? false : { scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: reduce ? 0.001 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-full min-h-0 w-full max-w-3xl flex-col"
            >
              <Figure
                image={item.image}
                label={item.caption}
                tone={item.colorTheme}
                ratio="landscape"
                seed={item.id}
                sizes="(max-width: 768px) 92vw, 48rem"
              />
              <figcaption className="mt-4 text-center text-small text-cream/75">
                {item.caption}
              </figcaption>
            </motion.figure>

            <NavButton
              label="Next image"
              onClick={() => onNavigate((index + 1) % items.length)}
              icon={<ChevronRight size={22} aria-hidden />}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-cream/25 text-cream transition-colors hover:bg-cream/10"
    >
      {icon}
    </button>
  );
}
