import { RevealGroup } from "@/components/motion/RevealGroup";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { DishCard } from "@/components/menu/DishCard";
import { DishList } from "@/components/menu/DishList";
import { OrderBar } from "@/components/menu/OrderBar";
import { BotanicalArt } from "@/components/ui/BotanicalArt";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { menu } from "@/lib/content/menu";
import { siteSettings } from "@/lib/content/site";
import { menuJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menu",
  description:
    "The full Dahlia menu — starters, salads, breakfast, chicken, beef, seafood, Detroit-style pizza, desserts and drinks. F-6 Markaz, Islamabad.",
  path: "/menu",
});

export default function MenuPage() {
  const categories = menu.map(({ title, slug }) => ({ title, slug }));

  return (
    <>
      <JsonLd data={menuJsonLd()} />

      <PageHero
        eyebrow="The café"
        theme="clay"
        title="The menu."
        lead="Detroit-style pizza, a french-toast programme worth the detour, and a kitchen that changes the soup daily."
      >
        {/* The arched-window device from the real logo (02b §0), framing the hero. */}
        <BotanicalArt
          motif="arches"
          className="pointer-events-none w-full max-w-md opacity-25"
          strokeWidth={2}
        />
      </PageHero>

      <CategoryTabs categories={categories} />

      {menu.map((category) => (
        <Section
          key={category.slug}
          id={`category-${category.slug}`}
          theme={category.colorTheme}
          aria-labelledby={`heading-${category.slug}`}
          // clears the fixed header plus the sticky category tabs beneath it
          className="scroll-mt-[calc(var(--header-h)+4.5rem)]"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SplitHeading
              as="h2"
              id={`heading-${category.slug}`}
              className="font-display-lg text-h2 leading-[1.02]"
            >
              {category.title}
            </SplitHeading>
            <p className="max-w-sm text-small opacity-65">{category.description}</p>
          </div>

          {category.dishes.length === 0 ? (
            <p className="mt-10 rounded-card border border-current/20 px-6 py-10 text-center opacity-65">
              Nothing on this board today. Ask us what the kitchen is running.
            </p>
          ) : category.layout === "list" ? (
            <DishList dishes={category.dishes} />
          ) : (
            <RevealGroup className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-8">
              {category.dishes.map((dish) => (
                <div key={dish.slug} data-reveal className="h-full">
                  <DishCard
                    dish={dish}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 20vw"
                  />
                </div>
              ))}
            </RevealGroup>
          )}
        </Section>
      ))}

      {/* The two notes printed at the foot of the real menu (02b §2). */}
      <Section theme="bone" padded={false} className="py-14">
        <div className="flex flex-col gap-2 border-t border-current/15 pt-8 text-small opacity-70">
          <p>{siteSettings.priceNote}</p>
          <p>{siteSettings.serviceNote}</p>
        </div>
      </Section>

      <OrderBar />
    </>
  );
}
