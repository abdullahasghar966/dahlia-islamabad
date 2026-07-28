import { SplitHeading } from "@/components/motion/SplitHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { ColorTheme } from "@/lib/types";

/**
 * The shared inner-page hero (11-INNER-PAGES.md · cross-page patterns):
 * Eyebrow → Fraunces H1 → lead → optional CTA, on a themed block.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  theme = "bone",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  theme?: ColorTheme;
  children?: React.ReactNode;
}) {
  return (
    <Section
      theme={theme}
      className="pt-[calc(var(--header-h)+clamp(2rem,6vw,5rem))]"
      aria-labelledby="page-heading"
    >
      <Eyebrow className="mb-6">{eyebrow}</Eyebrow>

      <SplitHeading
        as="h1"
        id="page-heading"
        immediate
        delay={0.1}
        className="font-display-lg max-w-4xl text-h1 leading-[0.98]"
      >
        {title}
      </SplitHeading>

      {lead ? <p className="mt-7 max-w-xl text-lead opacity-75">{lead}</p> : null}

      {children ? <div className="mt-9">{children}</div> : null}
    </Section>
  );
}
