"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const STORAGE_KEY = "dahlia.consent";

/**
 * Privacy-first consent (13-SEO-PERF-A11Y.md §4). Nothing analytic loads until
 * the visitor actively accepts; declining is a single click of equal weight,
 * and dismissing without choosing leaves analytics off.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Let the page settle before interrupting.
        const id = window.setTimeout(() => setVisible(true), 1400);
        return () => window.clearTimeout(id);
      }
    } catch {
      /* storage blocked — stay silent rather than nagging every load */
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new CustomEvent("dahlia:consent-granted"));
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-3 z-[110] mx-auto max-w-2xl rounded-card bg-forest p-5 text-cream shadow-[0_24px_70px_-24px_rgb(23_19_14/0.6)] sm:inset-x-6 sm:p-6"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduce ? 0.001 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small text-cream/85">
              We use a couple of cookies to see what people read. Nothing loads until you say yes.{" "}
              <Link href="/legal/privacy" className="link-draw font-medium text-cream">
                Privacy
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="min-h-11 rounded-pill border border-cream/35 px-4 text-small transition-colors hover:bg-cream/10"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="min-h-11 rounded-pill bg-cream px-4 text-small font-medium text-forest transition-transform hover:scale-[1.03]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
