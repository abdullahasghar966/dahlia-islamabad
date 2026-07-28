import { NurseryBrowser } from "@/components/nursery/NurseryBrowser";
import { OrderBar } from "@/components/menu/OrderBar";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nursery",
  description:
    "Indoor plants, succulents, statement greenery, pots and supplies — filter by light, water and pet-friendliness. Dahlia, F-6 Markaz, Islamabad.",
  path: "/nursery",
});

export default function NurseryPage() {
  return (
    <>
      <PageHero
        eyebrow="The nursery"
        theme="forest"
        title="Bring the outside in."
        lead="Every plant here is labelled with what it actually needs. Filter by your window, your watering habits, and whether the cat chews things."
      />

      <Section theme="forest" className="pt-0">
        <NurseryBrowser />
      </Section>

      <OrderBar />
    </>
  );
}
