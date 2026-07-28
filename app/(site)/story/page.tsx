import { Counter } from "@/components/motion/Counter";
import { Parallax } from "@/components/motion/Parallax";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Story",
  description:
    "Why a café and a nursery share one address in F-6 Markaz — the space, the plants, the food, and the people behind Dahlia Islamabad.",
  path: "/story",
});

/** TODO: real copy — draft written in the brand voice (02 §6), needs an owner pass. */
const BLOCKS = [
  {
    eyebrow: "The space",
    title: "It started with too many plants.",
    body: "There is a version of this place that is just a café, and a version that is just a nursery. Neither felt right. People kept asking what the plant in the corner was, and whether they could take one home. Eventually we said yes, and then we said yes about four hundred more times.",
    tone: "moss" as const,
    label: "The room, before service",
  },
  {
    eyebrow: "The food",
    title: "From scratch, most of it, most days.",
    body: "The dough is proved slowly. The ricotta is whipped to order. The specials board changes because the market changes. None of that is a marketing position — it is just how the kitchen prefers to work, and it happens to taste better.",
    tone: "terracotta" as const,
    label: "The pass at full tilt",
  },
  {
    eyebrow: "The plants",
    title: "We would rather sell you the right one.",
    body: "Tell us which way your window faces and how often you actually remember to water things. We will steer you toward something that will still be alive in June. Sometimes that means talking you out of the fiddle-leaf fig.",
    tone: "fern" as const,
    label: "Shelves, four rows deep",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        theme="bone"
        title="Come for the coffee. Leave with a fern."
        lead="One address, two joys — and a fairly long argument about which one came first."
      />

      {BLOCKS.map((block, index) => (
        <Section key={block.eyebrow} theme={block.tone} aria-labelledby={`block-${index}`}>
          <div
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
              index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Parallax speed={0.12}>
              <Figure
                image={{ alt: block.label }}
                label={block.label}
                tone={block.tone}
                ratio="landscape"
                seed={block.eyebrow}
                sizes="(max-width: 1024px) 92vw, 44vw"
              />
            </Parallax>

            <div>
              <p className="eyebrow mb-5 opacity-60">{block.eyebrow}</p>
              <SplitHeading
                as="h2"
                id={`block-${index}`}
                className="font-display-lg max-w-lg text-h2 leading-[1.02]"
              >
                {block.title}
              </SplitHeading>
              <p className="mt-6 max-w-lg text-lead opacity-75">{block.body}</p>
            </div>
          </div>
        </Section>
      ))}

      {/* ---- numbers ---- */}
      <Section theme="clay" aria-labelledby="numbers-heading">
        <h2 id="numbers-heading" className="sr-only">
          Dahlia in numbers
        </h2>
        <RevealGroup className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {[
            { to: 16700, label: "people in the community", suffix: "" },
            { to: 240, label: "thousand cups poured", suffix: "k" },
            { to: 9400, label: "plants rehomed", suffix: "" },
          ].map((stat) => (
            <div key={stat.label} data-reveal>
              {/* TODO: real figures — only the follower count is verified (02 §2). */}
              <p className="font-display-lg text-h1 leading-none">
                <Counter to={stat.to} />
              </p>
              <p className="mt-3 text-small opacity-70">{stat.label}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      {/* ---- testimonials ---- */}
      <Section theme="blush" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="font-display-lg text-h2">
          What people say
        </h2>
        <RevealGroup className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.quote} data-reveal className="flex flex-col gap-4">
              <blockquote className="font-display-sm text-h3 leading-snug">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="text-small opacity-60">
                {testimonial.author} · {testimonial.source}
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </Section>

      <Section theme="forest" className="text-center">
        <SplitHeading as="h2" className="font-display-lg mx-auto max-w-2xl text-h2">
          There is a table free. Probably.
        </SplitHeading>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/visit" size="lg" magnetic>
            Plan your visit
          </Button>
          <Button href="/menu" variant="secondary" size="lg">
            See the menu
          </Button>
        </div>
      </Section>
    </>
  );
}
