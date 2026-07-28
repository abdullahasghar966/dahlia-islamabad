"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Instagram, Phone, UtensilsCrossed, X } from "lucide-react";
import { NAV_LINKS } from "@/components/layout/Header";
import { BotanicalArt } from "@/components/ui/BotanicalArt";
import { siteSettings } from "@/lib/content/site";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/**
 * S2 mobile — full-screen overlay with staggered links over background leaf art.
 * Focus-trapped, Esc to close.
 */
export function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    lockScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = Array.from(
        panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
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

    document.addEventListener("keydown", onKeyDown);
    const id = window.setTimeout(
      () => panel.current?.querySelector<HTMLElement>("a[href]")?.focus(),
      80,
    );

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
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[130] flex flex-col bg-forest text-cream"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduce ? 0.001 : 0.6, ease: [0.7, 0, 0.3, 1] }}
        >
          <BotanicalArt
            motif="monstera"
            className="pointer-events-none absolute -right-24 -bottom-16 h-[70vh] w-[70vh] opacity-[0.12]"
            strokeWidth={2}
          />

          <div className="shell flex h-[4.5rem] shrink-0 items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-pill"
            >
              <X size={24} aria-hidden />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            // Scrollable, and exempt from Lenis, so the links stay reachable on
            // a short screen or in landscape.
            data-lenis-prevent
            className="shell flex flex-1 flex-col justify-center overflow-y-auto overscroll-contain"
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.15 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-display-lg block py-2 text-h2 leading-[1.05]"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <div className="shell flex shrink-0 flex-wrap items-center gap-3 pb-10">
            <OverlayAction href={siteSettings.phoneHref} icon={<Phone size={16} />} label="Call" />
            <OverlayAction
              href={siteSettings.socials.instagram}
              icon={<Instagram size={16} />}
              label="Instagram"
            />
            <OverlayAction
              href={siteSettings.foodpandaUrl}
              icon={<UtensilsCrossed size={16} />}
              label="foodpanda"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OverlayAction({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-cream/30 px-4 text-small"
    >
      <span aria-hidden>{icon}</span>
      {label}
    </a>
  );
}
