# Walmart Design System

A working recreation of Walmart's visual language — colors, type, components,
and a clickable e-commerce UI kit — built from the **Walmart.fig** source
attached to this project.

> "Mantener siempre la esencia del diseño de Walmart."
> The whole project is in service of that line.

---

## Sources

| Source | Where |
|---|---|
| Figma file | Mounted as a read-only VFS at the project root (`/Colors`, `/Typography`, `/Logo`, `/Branding`, `/Button`, `/Card`, `/Banner`, `/Navigation`, `/Tab-bar`, etc). 28 pages, 78 frames. |
| Bogle font family | Uploaded as `.otf` files in `uploads/` — copied into `fonts/`. |
| Brand reference | walmart.com (live site behavior, copy tone, iconography). |

---

## What's in this folder

```
.
├─ README.md                  ← this file
├─ SKILL.md                   ← cross-compatible skill manifest
├─ colors_and_type.css        ← CSS vars + semantic type classes
├─ fonts/                     ← Bogle .otf files
├─ assets/                    ← logo, spark, brand imagery
├─ preview/                   ← Design System tab cards (Type/Colors/Components/...)
└─ ui_kits/
   └─ walmart-shop/           ← e-commerce store: header, hero, PLP, PDP, cart
      ├─ README.md
      ├─ index.html
      └─ components.jsx
```

Open **`ui_kits/walmart-shop/index.html`** for the live click-through. Open
the **Design System** tab to browse type/color/component cards.

---

## Company / product context

Walmart is the world's largest retailer, with a U.S. e-commerce surface
(`walmart.com`) that has to be approachable, trustworthy, and dense enough to
sell ~75M SKUs to a wide demographic. The brand voice is friendly, plainspoken,
value-focused. Visually the system is built around two pillars:

- **Walmart Blue (`#0071dc`)** — masthead, primary buttons, links. Conveys
  trust, reliability, calm.
- **Spark Yellow (`#ffc220`)** — the six-point spark logo mark, price tags,
  energy moments, "save money" cues.

Together they hit a 50% blue / 30% yellow / 20% white usage proportion (per the
Figma's "Usage Proportion" card).

The Figma calls out four palette groups:

| Group | Code | Role |
|---|---|---|
| Signature Blues | SB-200 → SB-600 | Brand spine |
| Neutral Shades | NS-000 → NS-700 | Surfaces, text |
| Status Hues | red 500, green 500 | Errors, success |
| Beyond Basics | greens, red, brown | Extended marketing accents |

Type is **one family, every level**: **Bogle**, Walmart's proprietary
geometric sans, is used for UI, headings, and body copy across the system.
The Figma docs occasionally show Nunito as a placeholder in long-form
explanatory paragraphs — those should be considered docs-only and not part
of the production system. *La tipografía siempre debe ser Bogle.*

---

## Content fundamentals — how Walmart writes copy

**Voice.** Plainspoken, friendly, value-first. Walmart is talking to busy
shoppers, not designers. The Figma's branding page sums it up as:

> _"Simple, friendly. Inclusive Communication. This is Walmart."_
> Pillar words: **Engaging · Supportive · Accessible · Positive**

**Casing.**
- Sentence case for almost everything: headlines, buttons, nav links.
  ("Shop now", "Black Friday Deals", "Pickup today")
- Title Case is reserved for proper nouns and category names
  ("Holiday Decor", "Replacement Auto Parts").
- ALL CAPS is rare — only used on hard sales beats ("ROLLBACK", "CLEARANCE").

**Pronouns.** Talk *to* the shopper, never *at* them.
- ✅ "**Your** Walmart+ membership saves you $1,300/year."
- ✅ "Pick the items **you** want to reorder."
- 🚫 "Customers can use this feature to..."

Walmart says **"we"** when referring to itself ("We'll handle delivery") and
**"you"** for the shopper. The company is collective and helpful, not
corporate.

**Verbs over nouns.** Buttons and links lead with the action.
- ✅ "Shop now", "Sign in", "Add to cart", "Reorder", "See more"
- 🚫 "Submission", "Subscription page"

**Numbers and prices are first-class typography.**
- Prices are big and bold: `$24.97` (not `$24.97 USD`).
- "Save money" framing wins over "great deal" framing — Walmart uses
  rollback flags, was/now strikethroughs, % off pills.
- Always use real digits, no spelled-out numbers.

**Emoji.** Walmart does **not** use emoji in product UI. Reserve them for
seasonal marketing or social, never for shipping a feature.

**Specific phrases that show up everywhere:**

> "Save money. Live better."  (the brand tagline)
> "Free shipping, no order minimum"
> "Pickup today"
> "Delivery from store"
> "Add to cart"
> "Sign in or create account"
> "$0.00" (always show the price even when the cart is empty)

**Length.** Headlines stay under ~8 words. Body copy stays under ~25 words per
sentence. Categories like "Grocery & Essentials" are kept short enough to fit
the secondary nav row at 14px.

---

## Visual foundations

### Color usage

- **50/30/20 rule.** Walmart Blue dominates (masthead, primary actions),
  Spark Yellow is the energetic accent (badges, "Add" buttons in some
  variants, spark logo), white/neutral is the surface.
- **Deep navy `#002d58`** is reserved for headings *on* light promo
  backgrounds — never for body text on white.
- **Pale blue washes** (`#f2f8fd`, `#e6f1fc`) build the tiered nav:
  primary blue bar → light-blue category bar → palest-blue sub-nav.
- **Status colors are reserved.** Red is errors and the cart badge; green
  is "in stock" / "delivered". They do **not** appear in marketing.

### Type rhythm

- Two display + four body sizes covers 95% of pages.
- Bogle Bold for hero (56px), Bogle Bold/Medium for headings, Bogle Regular
  for everything else. Walmart almost never uses Bogle Light on screen.
- Headings hug their content (`line-height: 1.2`), body sits at `1.55`.

### Backgrounds

- **No gradients** in product UI. The only gradients in the Figma are
  on a single marketing mockup card (brand identity slide).
- **No textures, no grain, no patterns.** Walmart is a flat, photographic
  system.
- **Full-bleed product photography** drives heroes — almost always on a
  white seamless or a single flat color (yellow, deep blue) cropped to a
  square. The product is the hero, not the photo.
- **No hand-drawn illustration.** Photography only.

### Cards

- **Radius `8px`** for product / promo cards, **`24px`** for the big
  documentation color cards, **`100px`** (pill) for all interactive
  buttons.
- **`1px solid #f0f0f0`** borders on product cards. Shadow is reserved
  for hover.
- Card content order, top→bottom: image → "Pickup today / Delivery"
  badge → title → price → rating → CTA.

### Buttons

- **Primary:** filled `#0071dc`, white text, 40px tall, pill (radius 100).
  Bogle Medium 14–20px.
- **Hover:** background darkens to `#004f9a` (no shadow), small color
  shift only.
- **Pressed:** background shifts to `#003d76`, slight inset.
- **Secondary:** white fill, 0.8px black border, black text.
- **Tertiary "see more":** text-only, bold, with a 1px underline.
- **"Add" pill:** small (38px), `#0071dc`, with plus icon. On click it
  swaps to a counter pill with `−` / number / `+`.

### Animation

- Restrained. Card hover lifts with a 150ms ease-out, button color shifts
  at 100ms ease-in-out. No bounces, no spring physics, no parallax.
- The "Add → Counter" expansion is the one signature transition — width
  springs from 30px → 147px.

### Hover, focus, press

- **Hover** on links → underline appears, color stays.
- **Hover** on cards → 4px lift + soft blue shadow (`rgba(0,113,220,0.15)`).
- **Focus** → 3px outside ring at `rgba(0,113,220,0.30)` for accessibility.
- **Press** → background shifts to next shade darker; no scale change.

### Layout & grid

- 1664px content frame on desktop. Three-tier nav: blue masthead (90px),
  category bar (52px), sub-nav (38px). Footer is white on white with
  hairline dividers, never inverted.
- Cards laid out on a 4 / 5 / 6-column flex with `gap: 16px`.

### Transparency / blur

- **Never used** in the system. Walmart is opaque, layered with solid
  fills, period. No frosted glass, no `backdrop-filter`.

### Corner radius philosophy

```
chips/buttons → 100px (pill)
product cards → 8px
big promo cards → 8–24px
inputs → 24px (the search bar is a stadium)
images inside cards → 4px
```

### Imagery palette

Warm, daylit, slightly oversaturated catalog photography. White seamless or
single-color backdrops. No filters, no grain. People are diverse but always
candidly lit — never moody.

---

## Iconography

See `assets/`. Key files:

| File | Use |
|---|---|
| `walmart-logo-primary.png` | Wordmark + Spark, full color, on white |
| `walmart-spark.png` | The six-point Spark mark on its own |
| `walmart-spark-yellow.svg` | Spark mark vector (yellow rays) |
| `walmart-spark-base.svg` | Spark mark vector (blue base) |

**Approach.** Walmart uses a thin, geometric, **stroke-only** icon system at
24px, 1.5px stroke. The Figma file ships its own icon set under `/Icons` —
roughly Lucide-equivalent in style.

For this design system we use **[Lucide](https://lucide.dev/)** from CDN as
the substitute icon set. It is the closest open match to Walmart's in-house
icons in stroke weight, line caps, and visual rhythm. Substitution flagged
to user — see CAVEATS at the end of this file.

**Rules.**
- 24px default, 16px in dense lists, 32px+ in category circles.
- Outline style, never filled — except for the cart-badge dot and the
  Spark logo (the only filled glyph in the system).
- Color follows the parent: white on the blue masthead, `#030303` on
  light surfaces.
- **No emoji.** Anywhere.
- **No unicode glyphs** repurposed as icons (no `›` chevrons in body
  copy — use the SVG chevron).
- The Walmart Spark itself is a brand mark, not an icon. Never recolor it,
  never resize below 24px, always keep its 6-ray geometry intact.

---

## Index — what each folder is for

- **`colors_and_type.css`** — the source of truth. Drop into any HTML file
  with `<link rel="stylesheet" href="colors_and_type.css">` and you get
  `--wm-sb-400`, `.wm-title-xl`, etc.
- **`fonts/`** — Bogle, the proprietary Walmart face.
- **`assets/`** — logos and spark marks. Reference these instead of
  re-drawing the brand mark.
- **`preview/`** — small HTML cards used to populate the Design System tab.
  These are not for shipping; they document the system.
- **`ui_kits/walmart-shop/`** — a clickable click-through of the storefront.
  Read its own `README.md` for screen list.

---

## CAVEATS (please review)

1. **Icons substituted.** Walmart's in-house icon font isn't shipped as a
   file. I used **Lucide** from CDN as the closest match. If you have the
   real Walmart icon SVGs, drop them in `assets/icons/` and re-point the
   UI kit.
2. **Bogle Medium (500) cut isn't included** in the .otf upload — only
   Regular, Bold, Black, and their italics. Browsers synthesise the 500
   weight from Regular. If the real Bogle Medium becomes available,
   add it to `fonts/` and the `@font-face` block in `colors_and_type.css`.
3. **Product photography is placeholder.** The UI kit uses Unsplash-style
   placeholders and gradient swatches for product imagery. Real product
   shots should be dropped into `ui_kits/walmart-shop/`.
4. **Single UI kit.** Only the desktop **walmart-shop** surface was built.
   Mobile app, Walmart+ membership, marketplace seller dashboard — all
   exist in the brand but aren't documented in the attached Figma.
