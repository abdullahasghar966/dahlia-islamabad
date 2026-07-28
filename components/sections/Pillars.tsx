import { RevealGroup } from "@/components/motion/RevealGroup";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { pillars } from "@/lib/content/site";
import type { Pillar } from "@/lib/types";

/** S4 · "What is Dahlia?" — the concept in four lines. */
export function Pillars() {
  return (
    <Section theme="bone" aria-labelledby="pillars-heading">
      <Eyebrow className="mb-6">What is Dahlia?</Eyebrow>

      <h2 id="pillars-heading" className="font-display-lg max-w-4xl text-h2 leading-[1.02]">
        A café that keeps a nursery. Or a nursery that feeds you —{" "}
        <span className="italic opacity-60">we&apos;ve stopped arguing about it.</span>
      </h2>

      <RevealGroup className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-8">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.title} pillar={pillar} />
        ))}
      </RevealGroup>
    </Section>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article data-reveal className="pillar group flex flex-col gap-4">
      <span className="text-terracotta" aria-hidden>
        <PillarIcon icon={pillar.icon} />
      </span>
      <h3 className="font-display-sm text-h3 leading-tight">{pillar.title}</h3>
      <p className="text-small leading-relaxed opacity-70">{pillar.line}</p>
    </article>
  );
}

/**
 * Spot illustrations (12-ASSETS-CHECKLIST.md §5). Each has one small hover
 * gesture — steam rising, a leaf swaying — driven by CSS so it costs no JS and
 * stops under reduced motion.
 */
function PillarIcon({ icon }: { icon: Pillar["icon"] }) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-12 w-12",
  };

  if (icon === "plate") {
    return (
      <svg {...common}>
        <circle cx="32" cy="36" r="19" />
        <circle cx="32" cy="36" r="12" className="opacity-45" />
        <g className="pillar-steam">
          <path d="M25 16c-3-3-3-6 0-9M32 15c-3-3-3-7 0-10M39 16c-3-3-3-6 0-9" />
        </g>
      </svg>
    );
  }

  if (icon === "leaf") {
    return (
      <svg {...common}>
        <path d="M32 56V30" />
        <g className="pillar-sway" style={{ transformOrigin: "32px 40px" }}>
          <path d="M32 40c14-2 22-13 20-27-14 2-22 13-20 27Z" />
          <path d="M32 48c-13-2-20-11-18-24 13 2 20 11 18 24Z" />
        </g>
      </svg>
    );
  }

  if (icon === "table") {
    return (
      <svg {...common}>
        <path d="M8 30h48M12 30l3 22M52 30l-3 22" />
        <circle cx="22" cy="18" r="6" />
        <circle cx="42" cy="18" r="6" />
        <g className="pillar-sway" style={{ transformOrigin: "32px 30px" }}>
          <path d="M32 30V18c4 0 6 3 6 7" />
        </g>
      </svg>
    );
  }

  return (
    <svg {...common}>
      <g className="pillar-twinkle">
        <path d="M32 8c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18Z" />
      </g>
      <path d="M14 46c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8Z" className="opacity-50" />
    </svg>
  );
}
