import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";
import { findPlant, plants } from "@/lib/content/plants";

export const alt = "A plant at DAHLIA Islamabad's nursery";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Pre-render a card per plant alongside the pages themselves. */
export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plant = findPlant(slug);

  return ogImage({
    eyebrow: plant?.botanicalName ?? "The nursery",
    title: plant?.name ?? "Bring the outside in.",
    theme: plant?.colorTheme ?? "fern",
  });
}
