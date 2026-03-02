# Neutronic Design System

Design system for the Neutronic e-commerce and rental site (Next.js + Tailwind + shadcn). Use this as the single source of truth for visual and interaction tokens so the client can make consistent changes in one place.

**Hard rules:** (1) All UI must be responsive across breakpoints (xs → 2xl) and tested on small viewports. (2) The site must be conversion-friendly (clear CTAs, low friction, mobile-friendly cart/checkout) and crawlable/SEO-friendly (semantic markup, real text, proper links and meta).

---

## 1. Overview

- **Stack:** Next.js (Your Next Store template), Tailwind CSS v4, shadcn UI.
- **Use this doc for:** Theming Tailwind, configuring shadcn, and building or auditing components. When in doubt, align with these tokens and semantics.

---

## 2. Brand

- **Audience:** Urban riders, couriers, gig workers, people who want durable e-bikes.
- **Tone:** Bold, high-contrast, no-nonsense, “built for the hustle.”
- **Visual traits:** Dark backgrounds, strong accent yellow, clear CTAs, product-first.

---

## 3. Colors

### 3.1 Palette

| Token | Hex | Usage |
|-------|-----|--------|
| **background** | `#010101` | Page, nav, footer |
| **background-elevated** | `#0f0f0f` | Cards on dark, modals |
| **surface** | `#fdfdfd` / `#fefefe` | Product sections, light blocks |
| **surface-alt** | `#fcfefd` | Rental offers, alternate sections |
| **primary** | `#FFF63A` | Primary CTA (Discover, Explore, Add to cart, cart, checkout), nav current/hover, links, focus ring |
| **primary-foreground** | `#000000` | Text on primary buttons |
| **secondary** | (outline only) | Secondary actions: transparent bg, border and text use `muted`; hover light gray. No fill color. |
| **accent** | `#FFF63A` | Borders, highlights on dark (same as primary) |
| **muted** | `#252f35` | Body text on light, secondary borders, outline buttons |
| **muted-foreground** | `#868d94` | Placeholder, disabled |
| **destructive** | `#fd6b62` | Remove, errors |
| **focus-ring** | `#FFF63A` | Keyboard focus outline (use consistently) |

### 3.2 Product colors (swatches)

- Red `#c5271e`, Green `#1b7624`, Blue `#2f6da5`, Black `#000`, Brown `#e5c8a0`, Yellow (use primary).

### 3.3 Tailwind / CSS variables

Map the above to your theme (e.g. in `app/globals.css` or Tailwind config):

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary` (outline variant: transparent + muted border/text)
- `--accent`, `--muted`, `--muted-foreground`
- `--destructive`, `--focus-ring`

Use these for shadcn and custom components so the client can change the site by editing one file.

---

## 4. Typography

### 4.1 Fonts

- **Primary font:** [Zalando Sans Expanded](https://fonts.google.com/specimen/Zalando+Sans+Expanded) — weights 300, 400, 500, 600, 700. Use for nav, body, buttons, labels, headings, and all UI text.
- **Optional accent:** Inconsolata — 400, 700. Only if a technical/monospace look is needed for hero or product titles.

Load Zalando Sans Expanded via `next/font/google` or Google Fonts link. Example: `https://fonts.google.com/specimen/Zalando+Sans+Expanded`

### 4.2 Scale (rem)

| Role | Size | Weight | Line height | Use |
|------|------|--------|-------------|-----|
| **Display / H1** | 3.375rem (54px) | 600 / italic | 1.2 | Hero headline |
| **H1 alt (on light)** | 4.8rem | 600 | — | Rental / full-width light hero |
| **H2** | 2.4rem | 300 | — | Section titles |
| **H3** | 1.6rem | 600 | — | Card titles, rental plan names |
| **H4** | 1.4rem | 500 | — | Subsections |
| **Body** | 1.2rem | 400 | 1.7 | Paragraphs |
| **Small** | 0.9–1rem | 400 / 500 | — | Captions, footer, labels |
| **Tiny** | 0.8rem | 400 | — | Legal, meta |

Use these in Tailwind (e.g. `text-display`, `text-h1`, `text-body`, `text-small`) so sizing stays consistent.

---

## 5. Spacing

- **Base unit:** 8px (0.5rem).
- **Scale:** 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 (px or equivalent in rem).
- **Usage:** Section padding (e.g. 40–64), card padding (16–24), nav gap (e.g. 32), button padding (12–24).

Define in Tailwind as a spacing scale and use for margin/padding/gap instead of one-off values.

---

## 6. Border radius

- **sm:** 8px — Small chips, inputs, small buttons.
- **md:** 16px — Cards, dropdowns, modals, offer containers.
- **lg:** 24–25px — Primary/secondary buttons (pill-like).
- **full:** 9999px — Pills, avatars.

Avoid one-off values (6, 10, 20, 30, 32) for new work; map existing ones to this scale where possible.

---

## 7. Components (semantics)

- **Button primary:** Yellow background (`#FFF63A`), black text. All main CTAs: hero, product, cart, checkout, rental.
- **Button secondary:** Outline only — transparent bg, `muted` border and text; hover light gray. Secondary actions only.
- **Button ghost / link:** Underline, no fill; or text color primary. Inline links.
- **Nav link:** White; current/hover = primary yellow, italic, 700.
- **Inputs / forms:** Align with shadcn form components; use `muted` borders and `focus-ring` (primary) for focus.
- **Cards (product, offer):** Surface bg, `md` radius, consistent padding from spacing scale.

No purple in the palette. Primary yellow only for CTAs and accent. Map shadcn “default” = primary (yellow), “secondary” = outline.

---

## 8. Motion

- **Duration:** 200ms for hover/focus (buttons, links).
- **Easing:** ease.
- **Reduce motion:** Respect `prefers-reduced-motion` (no or minimal animation).

---

## 9. Accessibility

- **Contrast:** Ensure primary yellow on dark and black on yellow meet WCAG AA (check with a contrast checker).
- **Focus:** Visible focus ring using `focus-ring` token; never remove focus styles.
- **Links:** Underline on focus/hover for text links.

---

## 10. Responsive design (mandatory)

All UI must be fully responsive and represented correctly across screen sizes. This is non-negotiable.

### Breakpoints (Tailwind defaults; use consistently)

- **xs:** < 640px — Mobile portrait (single column, stacked CTAs, full-width tap targets).
- **sm:** 640px — Large phone / small tablet.
- **md:** 768px — Tablet.
- **lg:** 1024px — Small desktop.
- **xl:** 1280px — Desktop.
- **2xl:** 1536px — Large desktop.

### Rules

1. **Layout:** Use fluid layouts and responsive grid (e.g. 1 col → 2 → 3) so content reflows; avoid horizontal scroll at any viewport.
2. **Typography:** Use relative units (rem) and a type scale that scales down on small screens (e.g. clamp or smaller sizes below `md`).
3. **Touch targets:** Minimum 44×44px (or 48×48px) for buttons and links on touch devices; adequate spacing between interactive elements.
4. **Images / media:** Responsive images (srcset/sizes or next/image), aspect ratios preserved; no overflow.
5. **Nav:** Mobile-first nav (e.g. hamburger / drawer on small screens) with full nav on larger breakpoints.
6. **Product / catalog:** Cards and product blocks stack on mobile; multi-column only when space allows (e.g. 2 cols from `sm`, 3 from `lg`).
7. **Testing:** Every new component or page must be checked at 320px, 375px, 768px, 1024px, and 1280px (or equivalent); fix before merge.

---

## 11. E-commerce: conversion- and SEO-friendly (mandatory)

The site must be built for conversions and for search visibility. These rules apply to all product, catalog, cart, and checkout UI.

### Conversion (CRO)

1. **Primary CTA visibility:** Primary actions (Add to cart, Discover, Rent) must be above the fold on mobile and desktop and use the primary button style; no critical CTA hidden or below fold on small screens.
2. **Trust and clarity:** Price, key product info (e.g. motor, battery), and trust elements (warranty, shipping) visible without excessive scrolling; use consistent placement across breakpoints.
3. **Friction:** Forms and checkout steps must be usable on small screens (large inputs, one column, no tiny checkboxes); avoid multi-step flows that feel endless on mobile.
4. **Performance:** Core product and cart interactions must feel instant; avoid layout shift (CLS) and long blocking scripts on key pages.
5. **Cart / checkout:** Cart and checkout must be fully usable on mobile (sticky or accessible cart entry, readable line items, clear total and next step).

### SEO and crawlability

1. **Semantic HTML:** Use correct heading hierarchy (one `h1` per page, then `h2`/`h3`), `main`, `nav`, `article`, and landmarks so structure is clear for crawlers and assistive tech.
2. **Product and content:** Product titles, descriptions, and key content must be in real text (not only in images or JS-only); important content in the initial HTML where possible.
3. **Links:** Important pages (catalog, product, rental, about) must be reachable via normal links (no critical content behind JS-only navigation from a crawler perspective).
4. **Meta and structure:** Unique titles and meta descriptions per page type; product pages use product schema (e.g. JSON-LD) where applicable.

### Checklist before release

- [ ] All breakpoints tested; no horizontal scroll; nav and CTAs work on mobile.
- [ ] Primary CTAs visible and tappable on smallest target viewport (e.g. 375px).
- [ ] Product/catalog readable and scannable on mobile and desktop.
- [ ] Cart and checkout fully usable on mobile.
- [ ] Heading hierarchy and semantic structure correct; key content in HTML.
- [ ] No critical layout shift (CLS) on product and cart pages.

---

## 12. Data & backend strategy

- **Current stage:** All product and rental data is **static** (e.g. `data/products.json` or `lib/static/products.ts`). No database or live Stripe product sync. Build UI and routes against this static data.
- **Planned next stage:** **Convex** for database (products, variants, rental plans; later orders/carts if needed). Static data shape should mirror the intended Convex schema so migration is a data-layer swap, not a UI rewrite.
- **Static data location:** Keep static sources in a single place (e.g. `data/` or `lib/static/`) and document intended Convex table names (e.g. `products`, `rentalPlans`) for the next stage.

### Suggested static shape (for Convex alignment later)

- **Products:** `id`, `slug`, `name`, `description`, `price`, `currency`, `images[]`, `variants[]` (e.g. color: `name`, `slug`, `image`). Matches Journey/Hunter + color options.
- **Rental plans:** `id`, `slug`, `name`, `price`, `interval` (e.g. `week`), `description`, `features[]`. Matches “Side Hustler”, “Gig Economy”, “Gig Master”.

---

## 13. Implementation notes (Your Next Store)

- Extend Tailwind theme with the colors and font sizes above.
- Override shadcn theme (e.g. in `components.json` or CSS variables) so `primary` = `#FFF63A` (Neutronic yellow); `secondary` = outline variant only (no purple).
- Use Zalando Sans Expanded as the default font (Google Fonts or `next/font/google`).
- Keep component variants limited to the semantics in §7 so the client can change colors in one place and have the whole site update.

---

## 14. Decisions / cleanup log

- **Primary color:** Single brand color `#FFF63A` (yellow) for all CTAs, nav active/hover, focus ring, and accents. Purple removed.
- **Secondary:** Outline-only (transparent + muted border/text); no fill color.
- **Font:** Zalando Sans Expanded as primary UI font ([Google Fonts](https://fonts.google.com/specimen/Zalando+Sans+Expanded)).
- **Border radius:** Standardized to sm/md/lg/full to avoid one-off radii.
- **Spacing:** 8px-based scale for consistent rhythm.
- **Responsive & CRO/SEO:** Added as mandatory sections so all work is responsive and conversion- and crawl-friendly.

---

## 15. Page & section patterns (home and reuse)

These patterns are used on the home page and should be reused on catalog, product, rental, and about for consistency. **Where to change what** is listed so the client can tweak copy, assets, or spacing in one place.

### 15.1 Above-the-fold block (hero + trust bar in one viewport)

- **Purpose:** Hero and trust bar fit in exactly one screen height so the first view is symmetrical.
- **Structure:** A wrapper `min-h-screen flex flex-col` contains the hero and trust bar. Hero has `flex-1 min-h-0` (fills remaining space); trust bar has `shrink-0` (fixed height at bottom).
- **Where:** `app/page.tsx` — wrapper div; `components/sections/hero-video.tsx` — header uses `flex-1 min-h-0` (no fixed min-height); `components/sections/trust-bar.tsx` — section has `shrink-0`.
- **Client change:** To change first-screen height, adjust the wrapper (e.g. `min-h-screen` or add a max-height). Do not remove `flex-1 min-h-0` on the hero or `shrink-0` on the trust bar.

### 15.2 Nav (header)

- **Logo:** Logo only (no “Neutronic” text). Link has `aria-label="Neutronic home"`. Logo scales: `h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18`; optional subtle container `rounded-lg bg-white/5 px-1 py-1.5`.
- **Header row:** `h-20` (80px) so the logo has room.
- **Where:** `app/layout.tsx` — Link, logo span, and header row div.
- **Asset:** Nav logo path is in `lib/static/asset-paths.ts` → `ASSETS.navLogo` (e.g. `/images/NeutronicMan.jpg`). Change there to switch the image.
- **Client change:** Resize logo by changing the `h-* w-*` classes on the logo span. Change nav logo image in `asset-paths.ts`.

### 15.3 Trust bar (service highlights)

- **Layout:** Section padding `px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12`. Inner `max-w-7xl mx-auto` (no extra horizontal padding). Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8`.
- **Items:** Each item is **vertical** (icon on top, text below): `flex flex-col items-center gap-2 sm:gap-3 text-center`. Icon wrapper `w-9 h-9 sm:w-10 sm:h-10`.
- **Where:** `components/sections/trust-bar.tsx`. Copy is in the `TRUST_ITEMS` array (labels and icon paths from `ASSETS.trust`).
- **Client change:** Edit `TRUST_ITEMS` for labels; change icons in `asset-paths.ts` under `trust`. Adjust padding/gap in the section and grid classes.

### 15.4 Home product block (Journey / Hunter)

- **Structure:** (1) Full-bleed 2×2 image grid (no padding). (2) Yellow bar: column layout, logo 40% width (sm: 48%), tagline below; padding `1.5% 5%`; tagline `text-[1.2rem] italic font-medium`. (3) Full-width horizontal gallery (asymmetric padding for scroll peek). (4) CTA with text-only padding.
- **Grid images:** Left cell = `grid1`, right = `grid2` (from `ASSETS.journey` / `ASSETS.hunter` in `asset-paths.ts`).
- **Gallery:** Cards `object-contain`, no crop; card widths 224→264→304→336px; optional inset `inset-0 sm:inset-1` for prominence. Gallery margin above: `mt-0 sm:mt-2 md:mt-3`.
- **Section bottom padding:** Content wrapper `pb-12 sm:pb-16 md:pb-20 lg:pb-24`.
- **Where:** `components/sections/home-product-block.tsx`; assets in `lib/static/asset-paths.ts` (journey.*, hunter.*).
- **Client change:** Product names, taglines, CTAs, and slugs are props from `app/page.tsx`. Grid images and gallery images: change paths in `asset-paths.ts`. Yellow bar logo/tagline layout and padding are in the “Full-width yellow bar” block in `home-product-block.tsx`.

### 15.5 Section padding scale (reuse on other pages)

Use the same vertical rhythm on catalog, product, rental, and about:

- **Section vertical padding:** `py-12 sm:py-16 md:py-20 lg:py-24` (or the shorter scale `py-8 sm:py-10 md:py-12` for tighter sections like the trust bar).
- **Content bottom padding (within a section):** `pb-12 sm:pb-16 md:pb-20 lg:pb-24`.
- **Horizontal content padding:** `px-4 sm:px-6 lg:px-8` inside `max-w-7xl mx-auto` for text and constrained content; full-bleed areas (e.g. galleries, videos) have no horizontal padding on the section.

### 15.6 Videos (hero and mid-hero)

- **Paths:** All video and poster paths live in `lib/static/asset-paths.ts`: `hero.*`, `midHero.*`. Poster and webm are optional (empty string); components only render them when present.
- **Where:** Hero in `components/sections/hero-video.tsx`; mid-hero in `components/sections/mid-hero-video.tsx`. Home uses `HomeHero` and `MidHeroVideo`; assets come from `ASSETS.hero` and `ASSETS.midHero`.
- **Client change:** Replace or add video files in `public/videos/`, then update the matching keys in `asset-paths.ts` (e.g. `mp4`, `poster`, `webm`). Leave poster/webm as `""` if you don’t have those files.

### 15.7 Reference design

- **Webflow reference:** `neutronic.webflow/` (in the repo, same level as `yournextstore/`). Use `index.html` and `css/neutronic.webflow.css` for layout and spacing reference (e.g. product-gallery__header, service-offer__container).

### 15.9 Hover gallery (reusable — catalog, product detail)

The hover gallery shows two images stacked: a **primary** image (default) and a **secondary** image (revealed on hover). No background, no box — the bike sits directly on the page surface.

- **Container:** `group relative w-full` — no `bg-*`, no `rounded-*`, no `overflow-hidden`. Transparent.
- **Inner aspect wrapper:** `relative w-full aspect-square sm:aspect-4/5 lg:aspect-square` — shorter on tablet, square on mobile and desktop.
- **Primary image:** `object-contain transition-opacity duration-300` + `fill` + `priority` on first/above-fold instance.
- **Secondary image:** `object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100` + `fill` + `loading="lazy"`.
- **No crop:** Always `object-contain` so the full bike is visible; never `object-cover`.
- **Sizes hint:** `(max-width: 1024px) 92vw, 45vw` — near-full-width on mobile, ~half on desktop 2-col.
- **Where:** `components/sections/catalog-product-row.tsx` (catalog); reuse the same pattern on the product detail gallery.
- **Client change:** Swap image URLs in `lib/static/asset-paths.ts` → `catalogColorImages` (or from DB later). The component only receives `[front, back]` tuples.

### 15.10 Color picker / swatch selector (reusable)

Clickable color circles that control which images the gallery shows. The selected swatch is clearly marked with a **dark ring + scale**, visible on all swatch colors including yellow.

- **Container:** `flex flex-wrap gap-2 sm:gap-2.5 lg:gap-3` + `role="group"` + `aria-label="Available colors"`.
- **Swatch button:** `relative w-8 h-8 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-full overflow-hidden shrink-0 transition-all duration-150`.
- **Selected state:** `ring-2 ring-foreground ring-offset-2 ring-offset-[#fdfdfd] scale-110` — dark ring (black/foreground), offset matches page surface, slight scale-up.
- **Unselected state:** `ring-1 ring-black/10 hover:ring-black/30` — subtle border, hover feedback.
- **Focus:** `focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfd]`.
- **Accessibility:** Each button has `aria-label={colorName}` and `aria-pressed={isSelected}`.
- **Swatch images:** `ASSETS.swatches` array (indexed by `COLOR_NAMES` order). Image fills the circle: `object-cover fill sizes="44px"`.
- **State management:** `useState(0)` for `selectedColor` index; `onClick={() => setSelectedColor(i)}`.
- **Where:** `components/sections/catalog-product-row.tsx`; reuse same pattern on product detail page.
- **IMPORTANT:** Never use `border-primary` for selected swatches — primary is yellow (`#FFF63A`), invisible against the Yellow swatch. Always use `ring-foreground` (dark).

### 15.11 Per-color image data (`catalogColorImages`)

Each product has an array of `[front, back]` image tuples, one per color, indexed by `COLOR_NAMES` order (Yellow, Red, Green, Blue, Brown, Black).

- **Structure:** `catalogColorImages: Record<string, [string, string][]>` in `lib/static/asset-paths.ts`.
- **Image source:** `public/BikePage/{BikeModel}/{Color}/FrontView.jpg` and `BackView.jpg`.
- **DB migration:** When Convex is added, replace this static map with a query that returns the same `[string, string][]` shape per product. The component doesn't change.
- **Product detail page:** Should use the same data shape. The product detail can receive `colorImages` and use the hover gallery + color picker patterns above, replacing the current thumbnail-based gallery and non-functional swatches.

### 15.12 Catalog product row (pattern summary)

Full pattern for a product row on the catalog page. Reuse the same responsive scale for product detail.

- **Layout:** `flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center` — stacked on mobile, side-by-side on desktop.
- **Section padding:** `px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12` — tight on mobile for fast scrolling.
- **Image → details gap (mobile):** `mt-1 sm:mt-2 lg:mt-0` — minimal so the logo sits right under the bike.
- **Logo (anchor element):** `w-[65%] sm:w-[55%] lg:w-[60%] max-w-[340px] h-8 sm:h-10 lg:h-16` — largest text element, anchors the details block.
- **Tagline:** `text-[0.85rem] sm:text-[0.9rem] lg:text-[1.05rem] font-light leading-snug sm:leading-relaxed`.
- **Spacing rhythm (mobile → sm → lg):** `mb-1.5/mb-2/mb-3` (logo), `mb-2/mb-2.5/mb-3` (tagline, swatches). Tight and consistent.
- **CTA:** `min-h-[44px] w-full sm:w-auto bg-primary text-primary-foreground rounded-lg text-sm sm:text-base font-semibold`.
- **Where:** `components/sections/catalog-product-row.tsx`, called from `app/catalog/page.tsx`.

### 15.13 Product detail page (aligned with catalog)

The product detail page (`app/product/[slug]/product-detail-content.tsx`) uses the same patterns as the catalog:

1. **Gallery:** `HoverGallery` (§15.9) — transparent bg, `object-contain`, front/back on hover. Data from `ASSETS.catalogColorImages[slug]` (same as catalog).
2. **Color picker:** `ColorPicker` with `ring-foreground` selected state (§15.10). Selecting a color updates the gallery to that color's [front, back].
3. **Per-color images:** Product page passes `catalogColorImages[slug]` as `colorImages`; no separate `productDetailColorImages`/videos/shoots for the main gallery.
4. **GalleryGrid** (`components/product/gallery-grid.tsx`) is no longer used on product detail; retained for possible future use (e.g. extra views). `image-gallery.tsx` in `app/product/[slug]/` is legacy.

### 15.14 Quick reference: files to edit for handoff

| What to change | File(s) |
|----------------|--------|
| Nav logo, header height, logo size | `app/layout.tsx` |
| Nav logo image path | `lib/static/asset-paths.ts` → `navLogo` |
| Hero + trust bar first-screen layout | `app/page.tsx`, `hero-video.tsx`, `trust-bar.tsx` |
| Trust bar copy and layout | `components/sections/trust-bar.tsx` |
| Trust bar icons | `lib/static/asset-paths.ts` → `trust` |
| Home product block layout and yellow bar | `components/sections/home-product-block.tsx` |
| Home product images and copy | `lib/static/asset-paths.ts` (journey, hunter), `app/page.tsx` (props) |
| Hero / mid-hero videos and posters | `lib/static/asset-paths.ts` → `hero`, `midHero` |
| Rental hero video, poster, section image | `lib/static/asset-paths.ts` → `rental` |
| Per-color bike images (front/back) | `lib/static/asset-paths.ts` → `catalogColorImages`; `public/BikePage/` |
| Color swatch images | `lib/static/asset-paths.ts` → `swatches`; `COLOR_NAMES` |
| Catalog product rows | `components/sections/catalog-product-row.tsx`, `app/catalog/page.tsx` |
| Product detail gallery + swatches | `app/product/[slug]/product-detail-content.tsx` |
| Rental page sections and signup | `app/rental/page.tsx`, `rental-hero.tsx`, `rental-signup-form.tsx` |
| Hover gallery pattern | §15.9 (reuse in catalog and product detail) |
| Color picker pattern | §15.10 (reuse in catalog and product detail) |
| Global spacing and colors | `DESIGN-SYSTEM.md` §3, §5; Tailwind/globals.css |

### 15.15 Full-page design (rental and future pages)

Use these patterns for rental, catalog, product, accessory, and cart so every page has a consistent shell, spacing, and CRA-friendly layout.

#### Page shell

- **Main:** `min-h-screen` + `overflow-x-hidden` to avoid horizontal scroll. Background from §3 (e.g. `bg-[#fdfdfd]` for light pages).
- **Contained content:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for all text and card content. Use a single wrapper for the main column; full-bleed sections (hero, full-width bars, images) sit outside it.
- **Section spacing (vertical rhythm):** Between sections use `mt-6 sm:mt-8 lg:mt-10`. For sections that need a visual separator use `border-t border-border pt-5 sm:pt-6 lg:pt-8` in addition. Apply consistently so future pages match rental.

#### When to use full-width vs contained

- **Full-bleed:** Hero (video/poster), full-width **bars** (e.g. “Built for the hustle”, Journey header style), lifestyle images, cross-sell footer bars. No horizontal padding on the section; inner content can use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` when text is needed.
- **Contained:** Plans grid, signup form, “How it works” steps, product rows, cart/checkout. Always inside the page shell’s padded container.

#### Hero (rental-style)

- **Container:** `min-h-[80vh]` with `style={{ minHeight: '80dvh' }}` for CLS-safe above-the-fold height.
- **Media:** Poster image with `priority` and `fetchPriority="high"` for LCP; video with `preload="none"`, play on intersect. Use a fixed-aspect or full-cover area so layout doesn’t shift when video loads.
- **Content:** Centered; one `h1`, short line, primary CTA (min 44px height), optional secondary CTA or email form. All paths in `lib/static/asset-paths.ts` (e.g. `ASSETS.rental`).

#### Full-width bar (Journey-header style)

- **Section:** `w-full`, bar `bg-primary` with `py-[1.5%] px-[5%] rounded-b-xl sm:rounded-none min-h-0`. Content inside `max-w-7xl mx-auto w-full … min-w-0`. Use for a single bold message (heading + line + bullets), not for cards.

#### Plan / offer cards

- **Layout:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6`. Each card: `rounded-2xl overflow-hidden … bg-primary text-primary-foreground`, no image placeholder.
- **Card content:** Pill-style title (§15 / rental pill class), optional “Most popular” badge, price, description, feature list, primary CTA link/button. CTA min height `min-h-[44px] sm:min-h-[48px]` for touch.

#### Forms and CLS

- **Signup / lead forms:** Wrap in a fixed-height container (e.g. `min-h-[280px] sm:min-h-[300px]`) and use `<Suspense>` with a same-height fallback (e.g. `h-[280px] sm:h-[300px] animate-pulse`) so the page doesn’t shift when the form hydrates.
- **Inputs and buttons:** Min height 44px (48px acceptable) for touch targets; use `text-base` on inputs for mobile zoom. See §10 and §11.

#### Lifestyle / section images

- **CLS:** Always wrap in a container with a **fixed aspect ratio** (e.g. `aspect-16/10 sm:aspect-21/9`) and `bg-muted`. Use `fill` + `object-cover` + `sizes="100vw"` and `loading="lazy"` for below-fold images.
- **Assets:** Paths in `asset-paths.ts` (e.g. `ASSETS.rental.sectionImage`).

#### Cross-sell (e.g. “Prefer to own?”)

- **Placement:** Directly under the lifestyle image with no extra top margin. Section: `w-full bg-primary`, inner `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10`. Short heading + one line of copy; link or CTA to product/catalog.

#### Breakpoints and typography

- Use §4 for type scale and §10 for breakpoints (320px, 375px, 768px, 1024px, 1280px). Ensure no horizontal scroll and 44px touch targets on interactive elements.

#### Asset conventions

- All images, videos, and posters: paths in `lib/static/asset-paths.ts`. Document new keys (e.g. `rental.mp4`, `rental.poster`, `rental.sectionImage`) so the client can swap assets in one place. Use Next.js `Image` with `sizes` and `priority`/`loading` as above for CRA.

#### CRA checklist (Core Web Vitals & conversion)

Use this when adding or auditing pages:

- **LCP:** Hero or first above-the-fold image uses `priority` and, when applicable, `fetchPriority="high"`. If the hero is video-only, give the hero container a reserved `min-height` (e.g. `min-h-[60vh]`) and a solid background so layout doesn’t shift. Prefer a poster image for the main hero when possible.
- **CLS:** All major images live in a container with a fixed aspect ratio (or explicit dimensions). Forms that hydrate late are wrapped in a fixed-height container with a same-height `<Suspense>` fallback. No content injected without reserved space.
- **INP:** Buttons and links have at least 44×44px touch targets. Avoid long main-thread work; defer non-critical JS. Respect `prefers-reduced-motion` (see §8): when set, do not autoplay video; show poster or static frame only.
- **Fonts:** Use non–render-blocking font loading (e.g. `next/font` with `display: "swap"` or async stylesheet with `media="print"` + switch to `all` once loaded) so first paint isn’t blocked.
- **Shell:** Every main content wrapper uses `overflow-x-hidden`; section spacing follows the rhythm in this section.
