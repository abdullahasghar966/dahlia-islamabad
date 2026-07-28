"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky category nav with scroll-spy (11-INNER-PAGES.md /menu).
 *
 * The observer's root margin biases toward the band nearest the top of the
 * readable area, so the active tab matches whichever category you are actually
 * reading rather than whichever merely touches the viewport.
 */
export function CategoryTabs({
  categories,
}: {
  categories: { title: string; slug: string }[];
}) {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`category-${c.slug}`))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace("category-", ""));
      },
      { rootMargin: "-18% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  // Keep the active tab in view on narrow screens.
  useEffect(() => {
    const el = list.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Menu categories"
      // No `transition` on `top` here — :root animates --sticky-top instead.
      className="sticky top-[var(--sticky-top)] z-40 -mx-gutter border-y border-current/10 bg-[color-mix(in_srgb,var(--page-bg)_92%,transparent)] backdrop-blur-xl"
    >
      <ul
        ref={list}
        className="shell flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => (
          <li key={category.slug} className="shrink-0">
            <a
              href={`#category-${category.slug}`}
              data-tab={category.slug}
              aria-current={active === category.slug ? "true" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center rounded-pill px-4 text-small font-medium",
                "transition-colors duration-300",
                active === category.slug
                  ? "bg-[var(--page-fg)] text-[color:var(--page-bg)]"
                  : "opacity-65 hover:opacity-100",
              )}
            >
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
