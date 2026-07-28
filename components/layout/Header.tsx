"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { NavOverlay } from "@/components/layout/NavOverlay";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Wordmark } from "@/components/layout/Wordmark";
import { useReserveDrawer } from "@/components/layout/ReserveProvider";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/nursery", label: "Nursery" },
  { href: "/story", label: "Story" },
  { href: "/aesthetic", label: "Aesthetic" },
  { href: "/visit", label: "Visit" },
] as const;

/**
 * S2 · transparent over the hero, blurred surface once you scroll, hides going
 * down and returns coming up (06-HOMEPAGE-SECTIONS.md).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const { openDrawer } = useReserveDrawer();

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // Ignore jitter, and never hide near the very top of the page.
        if (Math.abs(y - lastY.current) > 8) {
          const next = y > lastY.current && y > 220;
          setHidden(next);
          // Sticky sub-navigation reads this to close the gap the header leaves.
          document.documentElement.dataset.headerHidden = String(next);
          lastY.current = y;
        }
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete document.documentElement.dataset.headerHidden;
    };
  }, []);

  // A route change should never leave the mobile overlay open behind the page.
  useEffect(() => setNavOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100]",
          "transition-[transform,background-color,backdrop-filter,border-color] duration-500",
          "ease-[cubic-bezier(0.7,0,0.3,1)] motion-reduce:transition-none",
          hidden && !navOpen ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "border-b border-[color-mix(in_srgb,var(--page-fg)_12%,transparent)] bg-[color-mix(in_srgb,var(--page-bg)_82%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        {/*
          S1 lives inside the fixed header rather than in page flow. As a
          sibling it sat *under* the fixed bar and was covered by it; stacked
          here the two scroll, hide and return as one piece of top chrome.
        */}
        <AnnouncementBar />

        <nav
          aria-label="Primary"
          className="shell flex h-[4.5rem] items-center justify-between gap-4 md:h-20"
        >
          {/* left — desktop links */}
          <ul className="hidden flex-1 items-center gap-7 lg:flex">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <li key={link.href}>
                <HeaderLink {...link} active={pathname.startsWith(link.href)} />
              </li>
            ))}
          </ul>

          {/* mobile — hamburger */}
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={navOpen}
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-pill lg:hidden"
          >
            <MenuIcon size={22} aria-hidden />
          </button>

          {/* center — wordmark */}
          <Magnetic strength={0.22}>
            <Link
              href="/"
              className="flex min-h-11 items-center px-2 text-lead md:text-h3"
              aria-label="Dahlia — home"
              data-cursor="hover"
            >
              <Wordmark />
            </Link>
          </Magnetic>

          {/* right — visit + reserve */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <div className="hidden lg:block">
              <HeaderLink href="/visit" label="Visit" active={pathname.startsWith("/visit")} />
            </div>
            <Magnetic strength={0.28}>
              <button
                type="button"
                onClick={openDrawer}
                data-cursor="hover"
                className={cn(
                  "inline-flex min-h-11 items-center rounded-pill px-5 text-small font-medium",
                  "bg-[var(--page-fg)] text-[color:var(--page-bg)]",
                  "transition-transform duration-300 hover:scale-[1.04] active:scale-[0.99]",
                  "motion-reduce:transition-none motion-reduce:hover:scale-100",
                )}
              >
                Reserve
              </button>
            </Magnetic>
          </div>
        </nav>
      </header>

      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}

function HeaderLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      data-cursor="hover"
      aria-current={active ? "page" : undefined}
      className={cn(
        "link-draw inline-flex min-h-11 items-center text-small font-medium",
        active && "bg-[length:100%_1px]",
      )}
    >
      {label}
    </Link>
  );
}
