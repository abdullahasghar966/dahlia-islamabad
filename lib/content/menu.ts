import type { Dish, MenuCategory } from "@/lib/types";

/**
 * VERIFIED MENU — transcribed from Dahlia's own Instagram highlights and
 * recorded in `Dahlia-Website-Spec/02b-VERIFIED-MENU-POLICY-DISCOUNTS.md §2`,
 * which is the source of truth. Names, descriptions and prices are the real
 * ones; this is no longer placeholder content.
 *
 * Prices are in PKR and **exclusive of GST**. A 10% service charge applies to
 * tables of 10+ — both notes render at the foot of /menu from `siteSettings`.
 *
 * On badges: only `signature` and `house-special` are used, because those are
 * the only two the printed menu itself marks. Dietary badges (veg/spicy) are
 * deliberately NOT inferred from ingredient lists — guessing a dietary claim on
 * a restaurant menu is the kind of error that matters, so they wait for the
 * owner to confirm.
 *
 * TODO: real photography — every `image.url` is undefined so the placeholder
 * art renders at the final aspect ratio (12-ASSETS-CHECKLIST.md §2).
 */

const dish = (d: Omit<Dish, "available" | "isSignature" | "badges"> &
  Partial<Pick<Dish, "available" | "isSignature" | "badges">>): Dish => ({
  available: true,
  isSignature: false,
  badges: [],
  ...d,
});

export const menu: MenuCategory[] = [
  {
    title: "Starters",
    slug: "starters",
    description: "The table fills up before the mains arrive.",
    colorTheme: "terracotta",
    layout: "cards",
    dishes: [
      dish({
        name: "Bang Bang Prawns",
        slug: "bang-bang-prawns",
        description: "Crispy batter-fried prawns, signature sriracha honey sauce.",
        price: 2095,
        colorTheme: "terracotta",
        isSignature: true,
        badges: ["signature"],
        image: { alt: "Bang bang prawns in sriracha honey sauce" },
      }),
      dish({
        name: "Trio of Fries",
        slug: "trio-of-fries",
        description:
          "Fries in three flavours — truffle & fresh mushrooms, kimchi, bolognese — all with mature cheddar cheese sauce.",
        price: 1145,
        colorTheme: "amber",
        image: { alt: "Three bowls of loaded fries" },
      }),
      dish({
        name: "Beiruti Hummus",
        slug: "beiruti-hummus",
        description: "Hummus, spices, chicken, pita bread.",
        price: 1145,
        colorTheme: "sage",
        isSignature: true,
        badges: ["signature"],
        image: { alt: "Beiruti hummus with chicken and warm pita" },
      }),
      dish({
        name: "Trio of Wings",
        slug: "trio-of-wings",
        description:
          "Juicy wings in three signature sauces — sweet honey glaze, fiery hot, smoked BBQ.",
        price: 1295,
        colorTheme: "clay",
        image: { alt: "Chicken wings in three sauces" },
      }),
      dish({
        name: "Harissa Tacos",
        slug: "harissa-tacos",
        description:
          "Three soft-shell tacos, harissa chicken, chipotle sauce, salsa, sour cream, pineapple.",
        price: 1445,
        colorTheme: "terracotta",
        image: { alt: "Three soft-shell harissa chicken tacos" },
      }),
      dish({
        name: "Chicken Poppers",
        slug: "chicken-poppers",
        description: "Crispy chicken poppers, roasted garlic cream cheese dip.",
        price: 1375,
        colorTheme: "amber",
        image: { alt: "Crispy chicken poppers with a dip" },
      }),
      dish({
        name: "Dirty Fries",
        slug: "dirty-fries",
        description:
          "Hand-cut fries, spice mix, cheese, chicken cubes, mushroom sauce, sriracha mayo, melted mozzarella.",
        price: 1325,
        colorTheme: "terracotta",
        isSignature: true,
        badges: ["signature"],
        image: { alt: "Loaded dirty fries with melted mozzarella" },
      }),
      dish({
        name: "Baked Mushrooms",
        slug: "baked-mushrooms",
        description: "Button mushroom, cream cheese, parmesan, olives, bell pepper.",
        price: 1345,
        colorTheme: "fern",
        image: { alt: "Baked button mushrooms with parmesan" },
      }),
      dish({
        name: "Garlic Butter Prawn Skillet",
        slug: "garlic-butter-prawn-skillet",
        description: "Butter-poached prawns, garlic, lime, parmesan, toasted pita.",
        price: 2095,
        colorTheme: "clay",
        image: { alt: "Garlic butter prawns in a skillet" },
      }),
      dish({
        name: "Chicken Strips",
        slug: "chicken-strips",
        description: "Deep-fried chicken, garlic aioli.",
        price: 1385,
        colorTheme: "amber",
        image: { alt: "Fried chicken strips with garlic aioli" },
      }),
      dish({
        name: "Soup of the Day",
        slug: "soup-of-the-day",
        // The menu prints no description for this one; ask, don't invent.
        description: "Ask your server.",
        price: 795,
        colorTheme: "sage",
        badges: ["seasonal"],
        image: { alt: "Bowl of the day's soup" },
      }),
    ],
  },
  {
    title: "Salad",
    slug: "salad",
    description: "Green, but not virtuous about it.",
    colorTheme: "moss",
    layout: "cards",
    dishes: [
      dish({
        name: "Classic Caesar Salad",
        slug: "classic-caesar-salad",
        description:
          "Crispy greens, sun-dried tomatoes, croutons, Caesar dressing, parmesan, chicken.",
        price: 1450,
        colorTheme: "moss",
        image: { alt: "Classic caesar salad with chicken" },
      }),
      dish({
        name: "Quinoa Salad",
        slug: "quinoa-salad",
        description:
          "Black quinoa, mixed greens, feta, red cabbage, roasted almonds, cherry tomatoes, mushrooms, balsamic dressing.",
        price: 1695,
        colorTheme: "sage",
        image: { alt: "Black quinoa salad with feta and almonds" },
      }),
      dish({
        name: "Square Salad",
        slug: "square-salad",
        description:
          "Tomatoes, crispy beans, feta, mixed greens, crispy filo sheets, chicken, tangy mustard dressing, sour cream.",
        price: 1450,
        colorTheme: "fern",
        image: { alt: "Square salad with crispy filo sheets" },
      }),
    ],
  },
  {
    title: "Breakfast",
    slug: "breakfast",
    description: "All morning, and well past it.",
    colorTheme: "amber",
    layout: "cards",
    dishes: [
      dish({
        name: "Protein Omelette",
        slug: "protein-omelette",
        description:
          "Soufflé omelette stuffed with mushrooms, cream cheese, rocket, potato fondant, grilled tomato, baked beans, toasted bread.",
        price: 1645,
        colorTheme: "amber",
        image: { alt: "Soufflé protein omelette with sides" },
      }),
      dish({
        name: "Steak on Toast",
        slug: "steak-on-toast",
        description:
          "Scrambled eggs, beef strips, mushroom sauce, grilled tomato, baked beans, toasted bread, fries.",
        price: 1995,
        colorTheme: "terracotta",
        image: { alt: "Steak and scrambled eggs on toast" },
      }),
      dish({
        name: "Scrambled Egg 'n Pepperoni",
        slug: "scrambled-egg-n-pepperoni",
        description:
          "Creamed eggs with pepperoni bites, mushrooms, fries, grilled tomato, baked beans, toasted bread.",
        price: 1895,
        colorTheme: "clay",
        image: { alt: "Creamed scrambled eggs with pepperoni" },
      }),
      dish({
        name: "Soufflé Pancakes",
        slug: "souffle-pancakes",
        description: "Fluffy batter pancakes, your choice of Lotus or Nutella sauce.",
        price: 1595,
        colorTheme: "blush",
        note: "Bake time 25 mins",
        image: { alt: "Tall soufflé pancakes with sauce" },
      }),
      dish({
        name: "Granola Bowl",
        slug: "granola-bowl",
        description: "Homemade granola, flavoured yoghurt, honey, fresh fruits, chia seeds.",
        price: 1095,
        colorTheme: "moss",
        // The only dietary badge in the whole menu, and it is not inferred —
        // the seed in 08 §6 assigns it explicitly.
        badges: ["veg"],
        image: { alt: "Granola bowl with yoghurt and fruit" },
      }),
    ],
  },
  {
    title: "Chicken",
    slug: "chicken",
    description: "Grilled, fried, and everything after.",
    colorTheme: "clay",
    layout: "cards",
    dishes: [
      dish({
        name: "Poulet Marrakesh",
        slug: "poulet-marrakesh",
        description:
          "Charcoal-grilled chicken breast, marrakesh sauce, sticky garlic rice, sautéed vegetables.",
        price: 2295,
        colorTheme: "clay",
        image: { alt: "Charcoal-grilled chicken with garlic rice" },
      }),
      dish({
        name: "Fettuccine Florentine",
        slug: "fettuccine-florentine",
        description:
          "Grilled chicken breast, mushroom, parmesan, florentine sauce, roasted bell pepper, leeks, fettuccine.",
        price: 2095,
        colorTheme: "sage",
        image: { alt: "Fettuccine florentine with grilled chicken" },
      }),
      dish({
        name: "Fiesta Burrito Bowl (Chicken)",
        slug: "fiesta-burrito-bowl-chicken",
        description: "Brown rice, salsa, sour cream, fresh guacamole, mexican herbs.",
        price: 2685,
        colorTheme: "moss",
        image: { alt: "Chicken fiesta burrito bowl" },
      }),
      dish({
        name: "Phuket",
        slug: "phuket",
        description: "Stir-fry chicken, peanuts, basil, lemongrass, sticky rice.",
        price: 2195,
        colorTheme: "fern",
        image: { alt: "Thai-style stir-fry chicken with sticky rice" },
      }),
      dish({
        name: "Buffalo Chicken Burger",
        slug: "buffalo-chicken-burger",
        description:
          "Buffalo mayo, fried thigh chicken, tangy sauce, jalapeño, pickles, cheese, fries, coleslaw.",
        price: 1795,
        colorTheme: "terracotta",
        image: { alt: "Buffalo chicken burger with fries" },
      }),
      dish({
        name: "The Karachi Club",
        slug: "the-karachi-club",
        description:
          "Classic Gymkhana-style club sandwich on white bread with chicken, eggs, beef bacon, house sauce.",
        price: 1745,
        colorTheme: "amber",
        image: { alt: "Club sandwich stacked on white bread" },
      }),
      dish({
        name: "Hot Buttermilk Chicken Burger",
        slug: "hot-buttermilk-chicken-burger",
        description: "Buttermilk fried thigh chicken, spicy mayo, coleslaw, fries.",
        price: 1795,
        colorTheme: "dahlia",
        image: { alt: "Buttermilk fried chicken burger" },
      }),
      dish({
        name: "Parmesan Chicken",
        slug: "parmesan-chicken",
        description:
          "Deep-fried chicken breast, french mustard sauce, mash potatoes, sautéed vegetables.",
        price: 2295,
        colorTheme: "amber",
        image: { alt: "Parmesan chicken with mashed potatoes" },
      }),
      dish({
        name: "Stuffed Chicken Roulade",
        slug: "stuffed-chicken-roulade",
        description:
          "Chicken stuffed with spinach, cream cheese, mashed potatoes, sautéed vegetables.",
        price: 2295,
        colorTheme: "fern",
        image: { alt: "Chicken roulade stuffed with spinach" },
      }),
      dish({
        name: "Mac 'n' Cheese",
        slug: "mac-n-cheese",
        description: "Classic cheesy macaroni, BBQ chicken shots, sesame seeds.",
        price: 1695,
        colorTheme: "amber",
        image: { alt: "Macaroni cheese with BBQ chicken" },
      }),
      dish({
        name: "Lime Chicken Sandwich",
        slug: "lime-chicken-sandwich",
        description: "Lime-grilled chicken, rocket, chili mayo, fries, coleslaw.",
        price: 1525,
        colorTheme: "moss",
        image: { alt: "Lime grilled chicken sandwich" },
      }),
      dish({
        name: "Dry Chilli Bowl (Chicken)",
        slug: "dry-chilli-bowl-chicken",
        description: "Chicken, chillies, onion, capsicum, garlic rice.",
        price: 2295,
        colorTheme: "dahlia",
        image: { alt: "Dry chilli chicken with garlic rice" },
      }),
      dish({
        name: "Penne Arrabiata",
        slug: "penne-arrabiata",
        description: "Penne, chili flakes, tomato sauce, parmesan.",
        price: 1595,
        colorTheme: "terracotta",
        image: { alt: "Penne arrabiata with parmesan" },
      }),
      dish({
        name: "Parm Chicken",
        slug: "parm-chicken",
        description: "Deep-fried chicken fillet, tomato sauce, mozzarella, spaghetti.",
        price: 2195,
        colorTheme: "terracotta",
        image: { alt: "Chicken parmigiana with spaghetti" },
      }),
    ],
  },
  {
    title: "Beef",
    slug: "beef",
    description: "Smash burgers, tenderloin, and a bowl or two.",
    colorTheme: "terracotta",
    layout: "cards",
    dishes: [
      dish({
        name: "Gouda-Fest Smash Burger",
        slug: "gouda-fest-smash-burger",
        description:
          "Double beef patty, smoked gouda, homemade sauce, pickles, jalapeño, brioche bun.",
        price: 2095,
        colorTheme: "terracotta",
        image: { alt: "Double smash burger with smoked gouda" },
      }),
      dish({
        name: "Tenderloin Steak with Confit Arugula",
        slug: "tenderloin-steak-confit-arugula",
        description:
          "Cured tenderloin, wilted arugula, cherry tomatoes, mushroom, fondant potatoes.",
        price: 3495,
        colorTheme: "forest",
        image: { alt: "Tenderloin steak with fondant potatoes" },
      }),
      dish({
        name: "Fiesta Burrito Bowl (Beef)",
        slug: "fiesta-burrito-bowl-beef",
        description: "Brown rice, salsa, sour cream, fresh guacamole, mexican herbs.",
        price: 2885,
        colorTheme: "moss",
        image: { alt: "Beef fiesta burrito bowl" },
      }),
      dish({
        name: "Smoked BBQ Bacon Smash Burger",
        slug: "smoked-bbq-bacon-smash-burger",
        description: "Double beef patty, beef bacon strips, sambal mayo, fries, coleslaw.",
        price: 2095,
        colorTheme: "clay",
        image: { alt: "BBQ bacon smash burger with fries" },
      }),
      dish({
        name: "Thai Basil Beef",
        slug: "thai-basil-beef",
        description: "Red chillies, basil, stir-fry beef, sticky rice.",
        price: 2295,
        colorTheme: "fern",
        image: { alt: "Thai basil beef with sticky rice" },
      }),
      dish({
        name: "Spaghetti Bolognese",
        slug: "spaghetti-bolognese",
        description: "Beef ragù, pomodoro sauce, basil, spaghetti.",
        price: 1895,
        colorTheme: "terracotta",
        image: { alt: "Spaghetti bolognese with basil" },
      }),
      dish({
        name: "Steak with Shitake Mushrooms",
        slug: "steak-with-shitake-mushrooms",
        description:
          "Cured tenderloin, beef-potato croquette, creamed spinach, demi-glazed mushroom sauce.",
        price: 3495,
        colorTheme: "forest",
        image: { alt: "Steak with shitake mushroom sauce" },
      }),
      dish({
        name: "Seoul Beef Bowl",
        slug: "seoul-beef-bowl",
        description: "Stir-fried beef, korean BBQ sauce, sticky rice, sunny-side-up egg.",
        price: 2295,
        colorTheme: "dahlia",
        isSignature: true,
        badges: ["signature"],
        image: { alt: "Seoul beef bowl with a sunny-side-up egg" },
      }),
      dish({
        name: "Wasabi Beef Sandwich",
        slug: "wasabi-beef-sandwich",
        description: "Roasted beef, wasabi, rocket, parmesan, pickles, fries, coleslaw.",
        price: 1895,
        colorTheme: "sage",
        image: { alt: "Wasabi roast beef sandwich" },
      }),
      dish({
        name: "Dry Chilli Bowl (Beef)",
        slug: "dry-chilli-bowl-beef",
        description: "Beef, chillies, onion, capsicum, garlic rice.",
        price: 2295,
        colorTheme: "dahlia",
        image: { alt: "Dry chilli beef with garlic rice" },
      }),
    ],
  },
  {
    title: "Seafood",
    slug: "seafood",
    description: "Snapper, prawns, and a saffron risotto.",
    colorTheme: "sky",
    layout: "cards",
    dishes: [
      dish({
        name: "The Tamil Prince",
        slug: "the-tamil-prince",
        description: "Red snapper, asian spices, grilled veggies, sticky rice.",
        price: 2885,
        colorTheme: "sky",
        image: { alt: "Spiced red snapper with sticky rice" },
      }),
      dish({
        name: "Frutti di Mare",
        slug: "frutti-di-mare",
        description: "Linguine, pan-seared prawns, calamari, lemon, garlic, parmesan.",
        price: 2495,
        colorTheme: "amber",
        image: { alt: "Linguine frutti di mare with prawns" },
      }),
      dish({
        name: "Prawn Risotto",
        slug: "prawn-risotto",
        description: "Saffron risotto, parmesan, mushrooms, chargrilled prawns, green peas.",
        price: 2885,
        colorTheme: "amber",
        image: { alt: "Saffron prawn risotto" },
      }),
      dish({
        name: "Lemon & Herb Snapper",
        slug: "lemon-herb-snapper",
        description: "Pan-seared snapper, lemon, herbs, mashed potatoes.",
        price: 2885,
        colorTheme: "sky",
        image: { alt: "Pan-seared snapper with mashed potatoes" },
      }),
    ],
  },
  {
    title: "Detroit-Style Pizza",
    slug: "detroit-style-pizza",
    description: "Thick, square, blistered at the edges.",
    colorTheme: "dahlia",
    layout: "cards",
    dishes: [
      dish({
        name: "Whipped Ricotta",
        slug: "whipped-ricotta",
        description: "Grilled chicken, pesto, fresh whipped ricotta.",
        price: 2295,
        colorTheme: "dahlia",
        isSignature: true,
        badges: ["signature"],
        image: { alt: "Whipped ricotta Detroit-style pizza" },
      }),
      dish({
        name: "Classic Cheese",
        slug: "classic-cheese",
        description: "House-special tomato sauce, mozzarella, parmesan.",
        price: 2195,
        colorTheme: "terracotta",
        image: { alt: "Classic cheese Detroit-style pizza" },
      }),
      dish({
        name: "Pepperonica",
        slug: "pepperonica",
        description: "Dahlia tomato sauce, pepperoni, mozzarella, parmesan.",
        price: 2295,
        colorTheme: "terracotta",
        image: { alt: "Pepperoni Detroit-style pizza" },
      }),
      dish({
        name: "Carnivale",
        slug: "carnivale",
        description: "Spicy creamy red sauce, chicken, olives, onions, bell peppers, cheese.",
        price: 2295,
        colorTheme: "clay",
        image: { alt: "Carnivale pizza with peppers and olives" },
      }),
      dish({
        name: "New York Style",
        slug: "new-york-style",
        description: "Dahlia tomato sauce, chicken, cheese, onion rings, buffalo hot sauce.",
        price: 2295,
        colorTheme: "amber",
        image: { alt: "New York style pizza with onion rings" },
      }),
      dish({
        name: "Bianca",
        slug: "bianca",
        description: "White truffle mushroom sauce, sun-dried tomatoes, chicken, rocket.",
        price: 2295,
        colorTheme: "sage",
        image: { alt: "Bianca white pizza with rocket" },
      }),
    ],
  },
  {
    title: "Desserts",
    slug: "desserts",
    description: "The french toast programme, mostly.",
    colorTheme: "blush",
    layout: "cards",
    dishes: [
      dish({
        name: "Lotus French Toast",
        slug: "lotus-french-toast",
        description: "House-baked brioche, egg bath, Lotus Biscoff, whipped cream.",
        price: 1545,
        colorTheme: "clay",
        isSignature: true,
        badges: ["house-special"],
        image: { alt: "Lotus Biscoff french toast with whipped cream" },
      }),
      dish({
        name: "Tiramisu French Toast",
        slug: "tiramisu-french-toast",
        description:
          "House-baked brioche, egg bath, coffee, mascarpone, cocoa dust, vanilla ice cream.",
        price: 1545,
        colorTheme: "fern",
        image: { alt: "Tiramisu french toast with cocoa dust" },
      }),
      dish({
        name: "Nutella French Toast",
        slug: "nutella-french-toast",
        description: "House-baked brioche, egg bath, Nutella sauce, bananas, caramelized popcorn.",
        price: 1545,
        colorTheme: "amber",
        image: { alt: "Nutella french toast with caramelized popcorn" },
      }),
      dish({
        name: "Blueberry Cheese Cake",
        slug: "blueberry-cheese-cake",
        description: "Cream cheese, graham crackers, blueberries.",
        price: 1245,
        colorTheme: "blush",
        image: { alt: "Blueberry cheesecake slice" },
      }),
      dish({
        name: "Tres Leches au Chocolate",
        slug: "tres-leches-au-chocolate",
        description: "House-baked sponge, three milks, chocolate ganache, honeycomb.",
        price: 1095,
        colorTheme: "terracotta",
        image: { alt: "Chocolate tres leches with honeycomb" },
      }),
    ],
  },
  {
    title: "Drinks",
    slug: "drinks",
    description: "Coffee first. Then everything else.",
    colorTheme: "fern",
    layout: "list",
    dishes: [
      dish({ name: "Americano", slug: "americano", description: "Hot or iced.", price: 785, colorTheme: "fern", image: { alt: "Americano" } }),
      dish({ name: "Café Latte", slug: "cafe-latte", description: "Hot or iced.", price: 845, colorTheme: "fern", image: { alt: "Café latte" } }),
      dish({ name: "Café Latte, Flavoured", slug: "cafe-latte-flavoured", description: "Hot or iced.", price: 985, colorTheme: "clay", image: { alt: "Flavoured café latte" } }),
      dish({ name: "Iced Caramel Macchiato", slug: "iced-caramel-macchiato", description: "", price: 985, colorTheme: "clay", image: { alt: "Iced caramel macchiato" } }),
      dish({ name: "ABC Juice", slug: "abc-juice", description: "Apple, beetroot, carrot.", price: 945, colorTheme: "dahlia", image: { alt: "ABC juice" } }),
      dish({ name: "Fresh Juice", slug: "fresh-juice", description: "Seasonal — ask what's good today.", price: 945, colorTheme: "amber", badges: ["seasonal"], image: { alt: "Fresh seasonal juice" } }),
      dish({ name: "Iced Peach Tea", slug: "iced-peach-tea", description: "", price: 795, colorTheme: "amber", image: { alt: "Iced peach tea" } }),
      dish({ name: "Strawberry Mojito", slug: "strawberry-mojito", description: "", price: 795, colorTheme: "dahlia", image: { alt: "Strawberry mojito" } }),
      dish({ name: "Iced Mocca", slug: "iced-mocca", description: "", price: 925, colorTheme: "fern", image: { alt: "Iced mocha" } }),
      dish({ name: "Mint Margarita", slug: "mint-margarita", description: "", price: 745, colorTheme: "moss", image: { alt: "Mint margarita" } }),
      dish({ name: "Fresh Lime", slug: "fresh-lime", description: "", price: 295, colorTheme: "moss", image: { alt: "Fresh lime" } }),
      dish({ name: "Kiwi Red Bull Mojito", slug: "kiwi-red-bull-mojito", description: "", price: 995, colorTheme: "moss", image: { alt: "Kiwi Red Bull mojito" } }),
      dish({ name: "Virgin Mojito", slug: "virgin-mojito", description: "", price: 785, colorTheme: "sage", image: { alt: "Virgin mojito" } }),
      dish({ name: "Red Bull", slug: "red-bull", description: "", price: 625, colorTheme: "sky", image: { alt: "Red Bull" } }),
      dish({ name: "Tea / Green Tea", slug: "tea-green-tea", description: "", price: 300, colorTheme: "sage", image: { alt: "Pot of tea" } }),
      dish({ name: "Soft Drinks", slug: "soft-drinks", description: "", price: 195, colorTheme: "sky", image: { alt: "Soft drinks" } }),
      dish({ name: "Mineral Water", slug: "mineral-water", description: "", price: 150, colorTheme: "sky", image: { alt: "Mineral water" } }),
    ],
  },
  {
    title: "Add-ons",
    slug: "add-ons",
    description: "Make it a bit more.",
    colorTheme: "sage",
    layout: "list",
    dishes: [
      dish({ name: "Chicken", slug: "add-chicken", description: "", price: 500, colorTheme: "sage", image: { alt: "Added chicken" } }),
      dish({ name: "Rice", slug: "add-rice", description: "", price: 300, colorTheme: "sage", image: { alt: "Added rice" } }),
      dish({ name: "Mash", slug: "add-mash", description: "", price: 295, colorTheme: "sage", image: { alt: "Added mashed potato" } }),
      dish({ name: "Cheese", slug: "add-cheese", description: "", price: 325, colorTheme: "amber", image: { alt: "Added cheese" } }),
      dish({ name: "Sauce", slug: "add-sauce", description: "", price: 200, colorTheme: "terracotta", image: { alt: "Added sauce" } }),
      dish({ name: "Fries", slug: "add-fries", description: "", price: 450, colorTheme: "amber", image: { alt: "Added fries" } }),
      dish({ name: "Pita", slug: "add-pita", description: "", price: 150, colorTheme: "clay", image: { alt: "Added pita" } }),
    ],
  },
];

/**
 * The homepage carousel order is specified explicitly in 02b §4 rather than
 * derived, so S6 shows exactly the six the owner nominated, in that order.
 */
const SIGNATURE_ORDER = [
  "lotus-french-toast",
  "whipped-ricotta",
  "dirty-fries",
  "beiruti-hummus",
  "bang-bang-prawns",
  "seoul-beef-bowl",
];

const allDishes = menu.flatMap((category) => category.dishes);

export const signatureDishes: Dish[] = SIGNATURE_ORDER.map((slug) =>
  allDishes.find((d) => d.slug === slug),
).filter((d): d is Dish => Boolean(d));

export function findDish(slug: string) {
  return allDishes.find((d) => d.slug === slug);
}
