"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { PlantCard } from "@/components/nursery/PlantCard";
import { BotanicalArt } from "@/components/ui/BotanicalArt";
import { plantCategories, plants } from "@/lib/content/plants";
import type { Light, Water } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filters = {
  category: string | null;
  light: Light | null;
  water: Water | null;
  petFriendly: boolean;
  inStock: boolean;
};

const EMPTY: Filters = {
  category: null,
  light: null,
  water: null,
  petFriendly: false,
  inStock: false,
};

const LIGHT_OPTIONS: { value: Light; label: string }[] = [
  { value: "low", label: "Low light" },
  { value: "bright-indirect", label: "Bright, indirect" },
  { value: "full-sun", label: "Full sun" },
];

const WATER_OPTIONS: { value: Water; label: string }[] = [
  { value: "low", label: "Water rarely" },
  { value: "medium", label: "Water weekly" },
  { value: "high", label: "Keep moist" },
];

/** /nursery · filters + grid, with FLIP reflow and a proper empty state. */
export function NurseryBrowser() {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      plants.filter((plant) => {
        if (filters.category && plant.categorySlug !== filters.category) return false;
        if (filters.light && plant.light !== filters.light) return false;
        if (filters.water && plant.water !== filters.water) return false;
        if (filters.petFriendly && !plant.petFriendly) return false;
        if (filters.inStock && !plant.inStock) return false;
        return true;
      }),
    [filters],
  );

  const dirty = JSON.stringify(filters) !== JSON.stringify(EMPTY);

  const toggle = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? EMPTY[key] : value }));

  return (
    <div>
      <div className="flex flex-col gap-5" role="group" aria-label="Filter plants">
        <FilterRow label="Type">
          {plantCategories.map((category) => (
            <Chip
              key={category.slug}
              active={filters.category === category.slug}
              onClick={() => toggle("category", category.slug)}
            >
              {category.title}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Light">
          {LIGHT_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              active={filters.light === option.value}
              onClick={() => toggle("light", option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Water">
          {WATER_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              active={filters.water === option.value}
              onClick={() => toggle("water", option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="More">
          <Chip
            active={filters.petFriendly}
            onClick={() => setFilters((p) => ({ ...p, petFriendly: !p.petFriendly }))}
          >
            Pet friendly
          </Chip>
          <Chip
            active={filters.inStock}
            onClick={() => setFilters((p) => ({ ...p, inStock: !p.inStock }))}
          >
            In stock
          </Chip>
          {dirty ? (
            <button
              type="button"
              onClick={() => setFilters(EMPTY)}
              className="inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-small underline underline-offset-4 opacity-70 hover:opacity-100"
            >
              <RotateCcw size={14} aria-hidden />
              Reset
            </button>
          ) : null}
        </FilterRow>
      </div>

      <p aria-live="polite" className="mt-8 text-small opacity-65">
        {visible.length} {visible.length === 1 ? "plant" : "plants"}
        {dirty ? " match your filters" : " on the shelves"}
      </p>

      {visible.length ? (
        <motion.ul
          layout={!reduce}
          className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((plant) => (
              <motion.li
                key={plant.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reduce ? 0.001 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <PlantCard
                  plant={plant}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 20vw"
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-5 rounded-card border border-current/20 px-6 py-16 text-center">
          <BotanicalArt motif="pot" className="w-24 opacity-35" strokeWidth={3} />
          <p className="font-display-sm text-h3">Nothing matches that combination.</p>
          <p className="max-w-sm text-small opacity-65">
            Try loosening a filter — or come in and describe your window to us, which works better
            anyway.
          </p>
          <button
            type="button"
            onClick={() => setFilters(EMPTY)}
            className="mt-1 inline-flex min-h-11 items-center rounded-pill border border-current/30 px-5 text-small transition-colors hover:bg-current/10"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      <span className="eyebrow w-16 shrink-0 opacity-55">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center rounded-pill border px-4 text-small",
        "transition-colors duration-300",
        active
          ? "border-transparent bg-[var(--page-fg)] text-[color:var(--page-bg)]"
          : "border-current/25 opacity-75 hover:opacity-100",
      )}
    >
      {children}
    </button>
  );
}
