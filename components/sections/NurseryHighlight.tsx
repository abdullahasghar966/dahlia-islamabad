import { ArrowUpRight } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Parallax } from "@/components/motion/Parallax";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { PlantCard } from "@/components/nursery/PlantCard";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Figure } from "@/components/ui/Figure";
import { Section } from "@/components/ui/Section";
import { featuredPlants } from "@/lib/content/plants";

/** S7 · the other half of the business. */
export function NurseryHighlight() {
  const [first, second, third, fourth] = featuredPlants;

  return (
    <Section theme="forest" aria-labelledby="nursery-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ---- sticky copy ---- */}
        <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
          <Eyebrow className="mb-5">The nursery</Eyebrow>

          <SplitHeading
            as="h2"
            id="nursery-heading"
            className="font-display-lg max-w-lg text-h2 leading-[1.02]"
          >
            Bring the outside in.
          </SplitHeading>

          <p className="mt-7 max-w-md text-lead opacity-75">
            Shelves four rows deep, from a first pothos to a fig tree that will outlive your
            furniture. Tell us your window and we&apos;ll tell you what will be happy in it.
          </p>

          <ul className="mt-8 flex flex-col gap-3 text-small opacity-70">
            <li>Every plant labelled with light, water and difficulty.</li>
            <li>Pots, soil and feed on the same shelf.</li>
            <li>Honest advice, including &ldquo;not that one, not in your flat&rdquo;.</li>
          </ul>

          <Button href="/nursery" variant="secondary" size="lg" magnetic className="mt-9">
            Explore the nursery
            <ArrowUpRight size={18} aria-hidden />
          </Button>
        </div>

        {/*
          Scrolling image column. Parallax travel is intentionally small and the
          gap intentionally larger than it: `speed` moves each figure by ±half
          its value as a share of its own height, so anything much above ~0.1
          here lets a tall figure ride up into the one above it.
        */}
        <div className="flex flex-col gap-14">
          <ClipReveal>
            <Figure
              image={{ alt: "Plant shelves at Dahlia, four rows deep" }}
              label="The shelves"
              tone="fern"
              ratio="tall"
              seed="nursery-shelves"
              sizes="(max-width: 1024px) 92vw, 42vw"
            />
          </ClipReveal>

          <Parallax speed={0.07} className="lg:ml-16">
            <ClipReveal delay={0.05}>
              <Figure
                image={{ alt: "A watering can and terracotta pots before opening" }}
                label="Before open"
                tone="moss"
                ratio="landscape"
                seed="nursery-watering"
                sizes="(max-width: 1024px) 92vw, 34vw"
              />
            </ClipReveal>
          </Parallax>

          <Parallax speed={0.05} className="lg:mr-12">
            <ClipReveal delay={0.1}>
              <Figure
                image={{ alt: "A monstera in the corner seat of the café" }}
                label="Corner two"
                tone="sage"
                ratio="portrait"
                seed="nursery-corner"
                sizes="(max-width: 1024px) 92vw, 38vw"
              />
            </ClipReveal>
          </Parallax>
        </div>
      </div>

      {/* ---- mini grid ---- */}
      <RevealGroup className="mt-20 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-8">
        {[first, second, third, fourth].filter(Boolean).map((plant) => (
          <div key={plant.slug} data-reveal>
            <PlantCard
              plant={plant}
              sizes="(max-width: 640px) 44vw, (max-width: 1024px) 44vw, 20vw"
            />
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
