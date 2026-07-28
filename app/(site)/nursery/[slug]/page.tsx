import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle } from "lucide-react";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { CareBadges } from "@/components/nursery/CareBadges";
import { PlantCard } from "@/components/nursery/PlantCard";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { JsonLd } from "@/components/ui/JsonLd";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { findPlant, plants } from "@/lib/content/plants";
import { siteSettings } from "@/lib/content/site";
import { breadcrumbJsonLd, pageMetadata, plantJsonLd } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plant = findPlant(slug);
  if (!plant) return pageMetadata({ title: "Plant not found", description: "", path: "/nursery" });

  return pageMetadata({
    title: plant.name,
    description: `${plant.name} (${plant.botanicalName}) at Dahlia's nursery in F-6 Markaz, Islamabad. ${plant.careNotes[0] ?? ""}`,
    path: `/nursery/${plant.slug}`,
  });
}

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plant = findPlant(slug);
  if (!plant) notFound();

  const related = plants
    .filter((p) => p.slug !== plant.slug && p.categorySlug === plant.categorySlug)
    .slice(0, 4);

  const ask = `${siteSettings.whatsapp}?text=${encodeURIComponent(
    `Hi Dahlia — do you have the ${plant.name} in stock?`,
  )}`;

  return (
    <>
      <JsonLd data={plantJsonLd(plant)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Nursery", path: "/nursery" },
          { name: plant.name, path: `/nursery/${plant.slug}` },
        ])}
      />

      <Section
        theme={plant.colorTheme}
        className="pt-[calc(var(--header-h)+clamp(1.5rem,5vw,4rem))]"
      >
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-1 text-small opacity-65">
            <li>
              <Link href="/nursery" className="link-draw inline-flex min-h-11 items-center">
                Nursery
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page">{plant.name}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <Figure
              image={plant.images[0] ?? { alt: plant.name }}
              label={plant.name}
              tone={plant.colorTheme}
              ratio="tall"
              seed={plant.slug}
              priority
              sizes="(max-width: 1024px) 92vw, 44vw"
            />
          </div>

          <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <h1 className="font-display-lg text-h1 leading-[1.0]">{plant.name}</h1>
            <p className="mt-2 text-lead italic opacity-60">{plant.botanicalName}</p>

            <p className="mt-6 flex items-center gap-3 text-h3">
              <span className="font-display-sm tabular-nums">
                {plant.price === null ? "Ask in store" : formatPrice(plant.price)}
              </span>
              {!plant.inStock ? <Pill tone="solid">Back soon</Pill> : null}
            </p>

            <p className="mt-2 text-small opacity-65">{plant.size}</p>

            <CareBadges plant={plant} className="mt-8 gap-x-6" />

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={ask} size="lg" magnetic>
                <MessageCircle size={18} aria-hidden />
                Ask about this plant
              </Button>
              <Button href="/visit" variant="secondary" size="lg">
                Come and see it
              </Button>
            </div>

            <div className="mt-12">
              <h2 className="eyebrow mb-4 opacity-65">How to keep it happy</h2>
              <ul className="flex flex-col gap-3">
                {plant.careNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-body opacity-80">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-current" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {related.length ? (
        <Section theme="bone" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display-lg text-h2">
            Also on that shelf
          </h2>

          <RevealGroup className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-8">
            {related.map((item) => (
              <div key={item.slug} data-reveal>
                <PlantCard
                  plant={item}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 20vw"
                />
              </div>
            ))}
          </RevealGroup>
        </Section>
      ) : null}
    </>
  );
}
