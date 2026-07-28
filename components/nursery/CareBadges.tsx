import type { Difficulty, Light, Plant, Water } from "@/lib/types";
import { cn } from "@/lib/utils";

const LIGHT_LABEL: Record<Light, string> = {
  low: "Low light",
  "bright-indirect": "Bright, indirect",
  "full-sun": "Full sun",
};

const WATER_LABEL: Record<Water, string> = {
  low: "Water rarely",
  medium: "Water weekly",
  high: "Keep moist",
};

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Some care",
  expert: "For the confident",
};

/**
 * Custom line icons per 04-DESIGN-SYSTEM.md §6. Icons are decorative — the text
 * label carries the meaning, so nothing depends on recognising a glyph.
 */
export function CareBadges({
  plant,
  className,
  compact = false,
}: {
  plant: Pick<Plant, "light" | "water" | "difficulty" | "petFriendly">;
  className?: string;
  compact?: boolean;
}) {
  const items = [
    { icon: <LightIcon level={plant.light} />, label: LIGHT_LABEL[plant.light] },
    { icon: <WaterIcon level={plant.water} />, label: WATER_LABEL[plant.water] },
    ...(compact
      ? []
      : [{ icon: <DifficultyIcon />, label: DIFFICULTY_LABEL[plant.difficulty] }]),
    ...(plant.petFriendly ? [{ icon: <PawIcon />, label: "Pet friendly" }] : []),
  ];

  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-1.5 text-small opacity-75">
          <span aria-hidden className="shrink-0">
            {item.icon}
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

const svg = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LightIcon({ level }: { level: Light }) {
  if (level === "low") {
    return (
      <svg {...svg}>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </svg>
    );
  }
  if (level === "full-sun") {
    return (
      <svg {...svg}>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
    );
  }
  return (
    <svg {...svg}>
      <circle cx="9" cy="9" r="3.6" />
      <path d="M9 2.5v1.6M2.5 9h1.6M4.6 4.6l1.1 1.1M13.4 4.6l-1.1 1.1" />
      <path d="M13 21V13h8v8Z" />
    </svg>
  );
}

function WaterIcon({ level }: { level: Water }) {
  const drops = level === "low" ? 1 : level === "medium" ? 2 : 3;
  return (
    <svg {...svg}>
      {Array.from({ length: drops }).map((_, i) => {
        // Scale about the icon centre, then fan the drops out around it.
        const shift = (i - (drops - 1) / 2) * 8.4;
        return (
          <path
            key={i}
            d="M12 3.5c2.7 3.2 4.2 5.6 4.2 7.6a4.2 4.2 0 0 1-8.4 0c0-2 1.5-4.4 4.2-7.6Z"
            transform={`translate(${shift + 3.4} 4.4) scale(0.72)`}
          />
        );
      })}
    </svg>
  );
}

function DifficultyIcon() {
  return (
    <svg {...svg}>
      <path d="M12 20V9" />
      <path d="M12 13c4-.6 6.2-3.4 5.7-7.4C13.8 6 11.6 8.9 12 13Z" />
      <path d="M12 17c-3.6-.5-5.6-3-5.2-6.6 3.5.5 5.6 3 5.2 6.6Z" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg {...svg}>
      <ellipse cx="7" cy="9" rx="1.9" ry="2.6" />
      <ellipse cx="12" cy="7.2" rx="1.9" ry="2.7" />
      <ellipse cx="17" cy="9" rx="1.9" ry="2.6" />
      <path d="M12 12.4c2.9 0 5.2 2 5.2 4.2 0 1.7-1.4 2.9-3.1 2.9-1 0-1.5-.4-2.1-.4s-1.1.4-2.1.4c-1.7 0-3.1-1.2-3.1-2.9 0-2.2 2.3-4.2 5.2-4.2Z" />
    </svg>
  );
}
