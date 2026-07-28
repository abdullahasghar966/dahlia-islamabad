"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";

/**
 * Generic slide-over (07 §10). Pauses Lenis, traps focus, closes on Esc, and
 * returns focus to whatever opened it (13-SEO-PERF-A11Y.md §3).
 */
export function Drawer({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    lockScroll();

    const focusables = () =>
      Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const id = window.setTimeout(() => focusables()[0]?.focus(), 60);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      restoreFocus.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            type="button"
            aria-label="Close panel"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.001 : 0.35 }}
          />
          <motion.div
            ref={panel}
            className={cn(
              "absolute inset-y-0 right-0 flex w-full max-w-[30rem] flex-col",
              "bg-cream text-ink shadow-[0_0_80px_-10px_rgb(23_19_14/0.5)]",
              className,
            )}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduce ? 0.001 : 0.5, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 py-5">
              <h2 className="font-display-sm text-h3">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 -mt-1 grid h-11 w-11 place-items-center rounded-pill transition-colors hover:bg-ink/5"
              >
                <X size={20} aria-hidden />
              </button>
            </div>
            {/*
              `data-lenis-prevent` is load-bearing. Lenis handles wheel and
              touch at the document level, so without it this panel could not be
              scrolled by finger at all — the reserve form's submit button was
              unreachable on a phone unless you grabbed the scrollbar itself.
            */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-6"
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
