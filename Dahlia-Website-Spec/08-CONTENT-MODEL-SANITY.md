# 08 · Content Model — Sanity

Headless CMS so staff can edit menu, plants, gallery, offers, and journal. Embed Studio at `/studio` or run separately.

---

## 1. Documents (schema sketches)

```ts
// sanity/schemas/siteSettings.ts  (singleton)
siteSettings {
  title, tagline,
  phone, whatsapp, foodpandaUrl, mapsUrl, mapEmbedUrl,
  address: { line1, area, city, postal, country, geo:{lat,lng} },
  hours: [ { day, open, close, closed:boolean } ],   // 7 rows
  socials: { instagram, threads, facebook },
  announcement: string,                              // the marquee text
  followerCount: number,                             // for the IG counter
  seo: { metaTitle, metaDescription, ogImage },
}

// menuCategory.ts
menuCategory { title, slug, order:number, colorTheme, description }
// VERIFIED order: Starters, Salad, Breakfast, Chicken, Beef, Seafood,
//                 Detroit-Style Pizza, Desserts, Drinks, Add-ons  (see 02b)

// dish.ts
dish {
  name, slug, category -> menuCategory,
  description, price:number, currency:"PKR",
  images: image[],
  badges: array<"veg"|"spicy"|"new"|"seasonal"|"signature">,
  colorTheme, order:number, isSignature:boolean, available:boolean,
}

// plantCategory.ts
plantCategory { title, slug, order }
// e.g. Indoor, Succulents & Cacti, Statement, Outdoor, Pots & Planters, Care & Supplies

// plant.ts
plant {
  name, slug, botanicalName, category -> plantCategory,
  price:number, images: image[],
  light: "low"|"bright-indirect"|"full-sun",
  water: "low"|"medium"|"high",
  difficulty: "easy"|"medium"|"expert",
  petFriendly:boolean, size, careNotes: portableText,
  inStock:boolean, isFeatured:boolean,
}

// galleryImage.ts  (the "Aesthetic" wall)
galleryImage { image, caption, tags:string[], featured:boolean, order }

// offer.ts  (generic promos, e.g. "Weekend brunch")
offer { title, body, ctaLabel, ctaHref, colorTheme, startsAt, endsAt, active:boolean }

// discount.ts  (bank card partnerships — VERIFIED data in 02b §3; time-sensitive)
discount {
  bank: "HBL"|"Allied Bank"|string,
  card: string,                 // e.g. "Infinite Credit Card"
  percent: number,              // 40, 25, 20…
  cap: number,                  // PKR cap, e.g. 10000
  validFrom, validTo, active:boolean, note,
}

// testimonial.ts
testimonial { quote, author, source, rating:number }

// teamMember.ts
teamMember { name, role, photo, bio, order }

// journalPost.ts  (optional)
journalPost { title, slug, cover, excerpt, body: portableText, author -> teamMember, publishedAt, tags:string[] }

// igPost.ts  (cached Instagram, optional)
igPost { permalink, mediaType, mediaUrl, thumbnailUrl, caption, timestamp }
```

**Reusable object:** `colorTheme` = a string enum matching design tokens (`bone|terracotta|clay|forest|moss|dahlia|blush|sky`) so content controls section/card color.

---

## 2. GROQ queries

```ts
// lib/queries.ts
export const siteSettingsQuery = `*[_type=="siteSettings"][0]`;

export const menuQuery = `
*[_type=="menuCategory"] | order(order asc){
  title, "slug": slug.current, colorTheme, description,
  "dishes": *[_type=="dish" && references(^._id) && available==true] | order(order asc){
    name, "slug": slug.current, description, price, badges, colorTheme, isSignature,
    "images": images[]{ "url": asset->url, "lqip": asset->metadata.lqip }
  }
}`;

export const signatureDishesQuery = `
*[_type=="dish" && isSignature==true && available==true] | order(order asc){
  name, "slug": slug.current, description, price, badges, colorTheme,
  "image": images[0]{ "url": asset->url, "lqip": asset->metadata.lqip }
}`;

export const nurseryQuery = `
*[_type=="plantCategory"] | order(order asc){
  title, "slug": slug.current,
  "plants": *[_type=="plant" && references(^._id)] | order(isFeatured desc){
    name, "slug": slug.current, botanicalName, price, light, water, difficulty,
    petFriendly, inStock, "image": images[0]{ "url": asset->url, "lqip": asset->metadata.lqip }
  }
}`;

export const plantBySlugQuery = `*[_type=="plant" && slug.current==$slug][0]{
  ..., "images": images[]{ "url": asset->url, "lqip": asset->metadata.lqip }
}`;

export const galleryQuery = `*[_type=="galleryImage"] | order(order asc){
  "url": image.asset->url, "lqip": image.asset->metadata.lqip, caption, tags
}`;

export const activeOffersQuery = `*[_type=="offer" && active==true] | order(_createdAt desc)`;
```

---

## 3. Client setup

```ts
// lib/sanity.client.ts
import { createClient } from "next-sanity";
export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-10-01",
  useCdn: true,               // false for drafts/preview
});
```
```ts
// lib/sanity.image.ts
import imageUrlBuilder from "@sanity/image-url";
export const urlFor = (src) => imageUrlBuilder(sanity).image(src);
```
Fetch in Server Components with `revalidate` (ISR), e.g. `export const revalidate = 300`. Use `next/image` with `lqip` blur placeholders.

---

## 4. Seed data (to load at first run)
- **siteSettings:** address, phone (0327 5000969), hours, socials, announcement, followerCount 16700, `gstNote` "Prices exclusive of GST", `serviceChargeNote` "10% service charge on tables of 10+".
- **menuCategory + dish:** ⭐ **use the VERIFIED menu in `02b`** — 10 categories, ~55 dishes + 17 drinks + 7 add-ons with **real names, prices, descriptions**. A ready-to-import JSON array of every dish is in the appendix below (§6).
- **discount:** the HBL + Allied Bank tables from `02b §3` (mark `active` per current validity — confirm with owner).
- **policy:** the café-policy text from `02b §1` → a `policy` doc rendered at `/legal/cafe-policy`.
- **plantCategory + plant:** no verified list yet — seed placeholders (Fiddle-leaf fig, Snake plant, Pothos, Monstera, assorted succulents, pots) and let the owner populate.
- **galleryImage:** 8–12 ambience shots. **offer:** "Weekend brunch 10–11".

> Menu/policy/discounts are **real and verified**; plants/gallery are placeholder-but-structured. The owner edits everything in Studio without code changes.

---

## 6. Appendix — machine-readable dish seed (import directly)

Prices are integer PKR (format as `Rs 2,295`). `signature:true` → feature on homepage S6. Full descriptions + the exact same data in table form live in `02b §2`.

```json
[
  {"cat":"starters","name":"Bang Bang Prawns","price":2095,"signature":true,"desc":"Crispy batter-fried prawns, signature sriracha honey sauce"},
  {"cat":"starters","name":"Trio of Fries","price":1145,"desc":"Fries in three flavours — truffle & mushroom / kimchi / bolognese — with mature cheddar cheese sauce"},
  {"cat":"starters","name":"Beiruti Hummus","price":1145,"signature":true,"desc":"Hummus, spices, chicken, pita bread"},
  {"cat":"starters","name":"Trio of Wings","price":1295,"desc":"Wings in three sauces — sweet honey glaze / fiery hot / smoked BBQ"},
  {"cat":"starters","name":"Harissa Tacos","price":1445,"desc":"Three soft-shell tacos, harissa chicken, chipotle, salsa, sour cream, pineapple"},
  {"cat":"starters","name":"Chicken Poppers","price":1375,"desc":"Crispy chicken poppers, roasted garlic cream cheese dip"},
  {"cat":"starters","name":"Dirty Fries","price":1325,"signature":true,"desc":"Hand-cut fries, spice mix, cheese, chicken cubes, mushroom sauce, sriracha mayo, mozzarella"},
  {"cat":"starters","name":"Baked Mushrooms","price":1345,"desc":"Button mushroom, cream cheese, parmesan, olives, bell pepper"},
  {"cat":"starters","name":"Garlic Butter Prawn Skillet","price":2095,"desc":"Butter-poached prawns, garlic, lime, parmesan, toasted pita"},
  {"cat":"starters","name":"Chicken Strips","price":1385,"desc":"Deep-fried chicken, garlic aioli"},
  {"cat":"starters","name":"Soup of the Day","price":795,"desc":""},

  {"cat":"salad","name":"Classic Caesar Salad","price":1450,"desc":"Crispy greens, sun-dried tomatoes, croutons, Caesar dressing, parmesan, chicken"},
  {"cat":"salad","name":"Quinoa Salad","price":1695,"desc":"Black quinoa, mixed greens, feta, red cabbage, roasted almonds, cherry tomatoes, mushrooms, balsamic"},
  {"cat":"salad","name":"Square Salad","price":1450,"desc":"Tomatoes, crispy beans, feta, mixed greens, crispy filo, chicken, tangy mustard dressing, sour cream"},

  {"cat":"breakfast","name":"Protein Omelette","price":1645,"desc":"Soufflé omelette, mushrooms, cream cheese, rocket, potato fondant, grilled tomato, baked beans, toast"},
  {"cat":"breakfast","name":"Steak on Toast","price":1995,"desc":"Scrambled eggs, beef strips, mushroom sauce, grilled tomato, baked beans, toast, fries"},
  {"cat":"breakfast","name":"Scrambled Egg 'n Pepperoni","price":1895,"desc":"Creamed eggs, pepperoni bites, mushrooms, fries, grilled tomato, baked beans, toast"},
  {"cat":"breakfast","name":"Soufflé Pancakes","price":1595,"desc":"Fluffy batter pancakes, choice of Lotus / Nutella (bake time 25 mins)"},
  {"cat":"breakfast","name":"Granola Bowl","price":1095,"badges":["veg"],"desc":"Homemade granola, flavoured yoghurt, honey, fresh fruits, chia seeds"},

  {"cat":"chicken","name":"Poulet Marrakesh","price":2295,"desc":"Charcoal-grilled chicken breast, marrakesh sauce, sticky garlic rice, sautéed vegetables"},
  {"cat":"chicken","name":"Fettuccine Florentine","price":2095,"desc":"Grilled chicken, mushroom, parmesan, florentine sauce, roasted bell pepper, leeks, fettuccine"},
  {"cat":"chicken","name":"Fiesta Burrito Bowl (Chicken)","price":2685,"desc":"Brown rice, salsa, sour cream, fresh guacamole, mexican herbs"},
  {"cat":"chicken","name":"Phuket","price":2195,"desc":"Stir-fry chicken, peanuts, basil, lemongrass, sticky rice"},
  {"cat":"chicken","name":"Buffalo Chicken Burger","price":1795,"desc":"Buffalo mayo, fried thigh chicken, tangy sauce, jalapeño, pickles, cheese, fries, coleslaw"},
  {"cat":"chicken","name":"The Karachi Club","price":1745,"desc":"Gymkhana-style club sandwich, chicken, eggs, beef bacon, house sauce"},
  {"cat":"chicken","name":"Hot Buttermilk Chicken Burger","price":1795,"desc":"Buttermilk fried thigh chicken, spicy mayo, coleslaw, fries"},
  {"cat":"chicken","name":"Parmesan Chicken","price":2295,"desc":"Deep-fried chicken breast, french mustard sauce, mash, sautéed vegetables"},
  {"cat":"chicken","name":"Stuffed Chicken Roulade","price":2295,"desc":"Chicken stuffed with spinach, cream cheese, mashed potatoes, sautéed vegetables"},
  {"cat":"chicken","name":"Mac 'n' Cheese","price":1695,"desc":"Cheesy macaroni, BBQ chicken shots, sesame seeds"},
  {"cat":"chicken","name":"Lime Chicken Sandwich","price":1525,"desc":"Lime-grilled chicken, rocket, chili mayo, fries, coleslaw"},
  {"cat":"chicken","name":"Dry Chilli Bowl (Chicken)","price":2295,"desc":"Chicken, chillies, onion, capsicum, garlic rice"},
  {"cat":"chicken","name":"Penne Arrabiata","price":1595,"desc":"Penne, chili flakes, tomato sauce, parmesan"},
  {"cat":"chicken","name":"Parm Chicken","price":2195,"desc":"Deep-fried chicken fillet, tomato sauce, mozzarella, spaghetti"},

  {"cat":"beef","name":"Gouda-Fest Smash Burger","price":2095,"desc":"Double beef patty, smoked gouda, homemade sauce, pickles, jalapeño, brioche bun"},
  {"cat":"beef","name":"Tenderloin Steak with Confit Arugula","price":3495,"desc":"Cured tenderloin, wilted arugula, cherry tomatoes, mushroom, fondant potatoes"},
  {"cat":"beef","name":"Fiesta Burrito Bowl (Beef)","price":2885,"desc":"Brown rice, salsa, sour cream, fresh guacamole, mexican herbs"},
  {"cat":"beef","name":"Smoked BBQ Bacon Smash Burger","price":2095,"desc":"Double beef patty, beef bacon, sambal mayo, fries, coleslaw"},
  {"cat":"beef","name":"Thai Basil Beef","price":2295,"desc":"Red chillies, basil, stir-fry beef, sticky rice"},
  {"cat":"beef","name":"Spaghetti Bolognese","price":1895,"desc":"Beef ragù, pomodoro sauce, basil, spaghetti"},
  {"cat":"beef","name":"Steak with Shitake Mushrooms","price":3495,"desc":"Cured tenderloin, beef-potato croquette, creamed spinach, demi-glazed mushroom sauce"},
  {"cat":"beef","name":"Seoul Beef Bowl","price":2295,"signature":true,"desc":"Stir-fried beef, korean BBQ sauce, sticky rice, sunny-side-up egg"},
  {"cat":"beef","name":"Wasabi Beef Sandwich","price":1895,"desc":"Roasted beef, wasabi, rocket, parmesan, pickles, fries, coleslaw"},
  {"cat":"beef","name":"Dry Chilli Bowl (Beef)","price":2295,"desc":"Beef, chillies, onion, capsicum, garlic rice"},

  {"cat":"seafood","name":"The Tamil Prince","price":2885,"desc":"Red snapper, asian spices, grilled veggies, sticky rice"},
  {"cat":"seafood","name":"Frutti di Mare","price":2495,"desc":"Linguine, pan-seared prawns, calamari, lemon, garlic, parmesan"},
  {"cat":"seafood","name":"Prawn Risotto","price":2885,"desc":"Saffron risotto, parmesan, mushrooms, chargrilled prawns, green peas"},
  {"cat":"seafood","name":"Lemon & Herb Snapper","price":2885,"desc":"Pan-seared snapper, lemon, herbs, mashed potatoes"},

  {"cat":"pizza","name":"Whipped Ricotta","price":2295,"signature":true,"desc":"Grilled chicken, pesto, fresh whipped ricotta"},
  {"cat":"pizza","name":"Classic Cheese","price":2195,"desc":"House-special tomato sauce, mozzarella, parmesan"},
  {"cat":"pizza","name":"Pepperonica","price":2295,"desc":"Dahlia tomato sauce, pepperoni, mozzarella, parmesan"},
  {"cat":"pizza","name":"Carnivale","price":2295,"desc":"Spicy creamy red sauce, chicken, olives, onions, bell peppers, cheese"},
  {"cat":"pizza","name":"New York Style","price":2295,"desc":"Dahlia tomato sauce, chicken, cheese, onion rings, buffalo hot sauce"},
  {"cat":"pizza","name":"Bianca","price":2295,"desc":"White truffle mushroom sauce, sun-dried tomatoes, chicken, rocket"},

  {"cat":"desserts","name":"Lotus French Toast","price":1545,"signature":true,"badges":["house-special"],"desc":"House-baked brioche, egg bath, Lotus Biscoff, whipped cream"},
  {"cat":"desserts","name":"Tiramisu French Toast","price":1545,"desc":"House-baked brioche, egg bath, coffee, mascarpone, cocoa dust, vanilla ice cream"},
  {"cat":"desserts","name":"Nutella French Toast","price":1545,"desc":"House-baked brioche, egg bath, Nutella sauce, bananas, caramelized popcorn"},
  {"cat":"desserts","name":"Blueberry Cheese Cake","price":1245,"desc":"Cream cheese, graham crackers, blueberries"},
  {"cat":"desserts","name":"Tres Leches au Chocolate","price":1095,"desc":"House-baked sponge, three milks, chocolate ganache, honeycomb"},

  {"cat":"drinks","name":"Americano (hot/iced)","price":785},
  {"cat":"drinks","name":"Café Latte (hot/iced)","price":845},
  {"cat":"drinks","name":"Café Latte Flavoured (hot/iced)","price":985},
  {"cat":"drinks","name":"Iced Caramel Macchiato","price":985},
  {"cat":"drinks","name":"ABC Juice","price":945},
  {"cat":"drinks","name":"Fresh Juice (Seasonal)","price":945},
  {"cat":"drinks","name":"Iced Peach Tea","price":795},
  {"cat":"drinks","name":"Strawberry Mojito","price":795},
  {"cat":"drinks","name":"Iced Mocca","price":925},
  {"cat":"drinks","name":"Mint Margarita","price":745},
  {"cat":"drinks","name":"Fresh Lime","price":295},
  {"cat":"drinks","name":"Kiwi Red Bull Mojito","price":995},
  {"cat":"drinks","name":"Virgin Mojito","price":785},
  {"cat":"drinks","name":"Red Bull","price":625},
  {"cat":"drinks","name":"Tea / Green Tea","price":300},
  {"cat":"drinks","name":"Soft Drinks","price":195},
  {"cat":"drinks","name":"Mineral Water","price":150},

  {"cat":"add-ons","name":"Chicken","price":500},
  {"cat":"add-ons","name":"Rice","price":300},
  {"cat":"add-ons","name":"Mash","price":295},
  {"cat":"add-ons","name":"Cheese","price":325},
  {"cat":"add-ons","name":"Sauce","price":200},
  {"cat":"add-ons","name":"Fries","price":450},
  {"cat":"add-ons","name":"Pita","price":150}
]
```

---

## 5. Studio
- Embed at `app/studio/[[...tool]]/page.tsx` (next-sanity) or a standalone `sanity` project.
- Add **Vision** for GROQ testing. Configure **desk structure** to pin `siteSettings` as a singleton and group Menu / Nursery / Content.
- Optional: live **preview**/`presentation` for draft content.
