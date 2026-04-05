# Homepage Implementation Guide

> **Handmade Skin & Home Decor · Next.js + shadcn/ui · Preset: `b1Vqzmz4`**
> Reference design: [Figma — Ecommerce website design](https://www.figma.com/design/6Cegr4MVdnevmRyWUpaEUK/Ecommerce-website-design)

---

## Overview

This document specifies a full homepage rebuild in Next.js that faithfully reproduces the existing React/Vite prototype (components provided). The aesthetic is **white, gold (`#C5A059`), and black** — upscale, editorial, artisanal. The site will eventually connect to Shopify as a custom frontend. The homepage includes a **seasonal banner** and **blog preview** that the owner can update via simple config files — no code knowledge needed.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| UI Components | shadcn/ui — preset `b1Vqzmz4` |
| Styling | Tailwind CSS v3 |
| Animation | `motion/react` (Motion for React — same API as existing code) |
| Fonts | Google Fonts: **Playfair Display** + **Montserrat** (matches existing components exactly) |
| Icons | `@phosphor-icons/react` (replaces lucide-react throughout) |

---

## Setup

```bash
# 1. Init Next.js
npx create-next-app@latest . --typescript --tailwind --app

# 2. Init shadcn with the correct preset
npx shadcn@latest init --preset b1Vqzmz4

# 3. Add shadcn components used on this page
npx shadcn@latest add button badge separator sheet

# 4. Install motion and Phosphor icons
npm install motion @phosphor-icons/react
```

---

## Phosphor Icons — Usage Notes

All icons use `@phosphor-icons/react`. Phosphor icon names differ from lucide-react — use the mappings below when porting the existing components:

| lucide-react (original) | @phosphor-icons/react |
|---|---|
| `ArrowRight` | `ArrowRight` |
| `ShoppingBag` | `Bag` |
| `Search` | `MagnifyingGlass` |
| `Menu` | `List` |
| `X` | `X` |
| `Instagram` | `InstagramLogo` |
| `Facebook` | `FacebookLogo` |
| `Twitter` | `TwitterLogo` |
| `Mail` | `Envelope` |
| `MapPin` | `MapPin` |
| `Phone` | `Phone` |

Phosphor supports weight variants (`regular`, `bold`, `fill`, `duotone`, etc.) via the `weight` prop. Use `weight="regular"` as the default to match the light, refined aesthetic:

```tsx
import { Bag, MagnifyingGlass, List } from '@phosphor-icons/react'

<Bag size={20} weight="regular" />
<MagnifyingGlass size={20} weight="regular" />
<List size={24} weight="regular" />
```

---

The existing components use `fontFamily: "'Playfair Display', serif"` and `fontFamily: "'Montserrat', sans-serif"` as inline styles. In Next.js, load them via `next/font/google` and apply as CSS variables so the inline style references still resolve:

```tsx
import { Playfair_Display, Montserrat } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

Then in `globals.css`:

```css
body {
  font-family: var(--font-montserrat), system-ui, sans-serif;
}
```

---

## Color Tokens — `app/globals.css`

```css
:root {
  --gold: #C5A059;
  --ink: #111111;       /* matches Footer bg */
  --cream: #faf9f6;     /* matches Philosophy bg */
}
```

---

## Placeholder Image

Every image slot uses this placeholder until real product photos are ready:

```
/images/placeholder.png
```

Place the provided PNG at `public/images/placeholder.png`. Reference in components:

```tsx
import Image from 'next/image'
// Inside a relative-positioned container:
<Image src="/images/placeholder.png" alt="Product" fill className="object-cover object-center" />
```

For the `<img>` tags in the existing code, swap to `next/image` with `fill` + a sized parent, or keep as `<img>` with explicit `width`/`height` if SSG is not a concern.

---

## File Structure

```
app/
├── layout.tsx                    # Fonts, metadata, ScrollProgressBar
├── globals.css                   # Tailwind base + CSS vars
└── page.tsx                      # Composes all home sections

components/
├── layout/
│   ├── Navbar.tsx                # ← port from provided Navbar.tsx
│   └── Footer.tsx                # ← port from provided Footer.tsx
└── home/
    ├── SeasonalBanner.tsx        # NEW — owner-editable top bar
    ├── Hero.tsx                  # ← port from provided Hero.tsx
    ├── FeaturedProducts.tsx      # ← port from provided FeaturedProducts.tsx
    ├── EditorialBanner.tsx       # ← port from App.tsx inline section
    ├── Philosophy.tsx            # ← port from provided Philosophy.tsx
    ├── BlogPreview.tsx           # NEW — owner-editable journal preview
    └── NewsletterSection.tsx     # ← port from App.tsx inline section

lib/
├── seasonal-banner.ts            # Owner edits this for the top bar
└── blog-posts.ts                 # Owner edits this to add/update blog posts

public/
└── images/
    └── placeholder.png
```

---

## Page Composition — `app/page.tsx`

```tsx
import { SeasonalBanner }    from '@/components/home/SeasonalBanner'
import { Hero }              from '@/components/home/Hero'
import { FeaturedProducts }  from '@/components/home/FeaturedProducts'
import { EditorialBanner }   from '@/components/home/EditorialBanner'
import { Philosophy }        from '@/components/home/Philosophy'
import { BlogPreview }       from '@/components/home/BlogPreview'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#C5A059] selection:text-white antialiased text-gray-900">
      <SeasonalBanner />
      <main>
        <Hero />
        <FeaturedProducts />
        <EditorialBanner />
        <Philosophy />
        <BlogPreview />
        <NewsletterSection />
      </main>
    </div>
  )
}
```

---

## Scroll Progress Bar — `app/layout.tsx`

Taken directly from `App.tsx`. Add as a client component wrapping the layout:

```tsx
'use client'
import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#C5A059] origin-left z-[9999]"
      style={{ scaleX }}
    />
  )
}
```

Place `<ScrollProgressBar />` inside the root layout above `{children}`.

---

## Component Specs

### `Navbar.tsx`

Port the provided `Navbar.tsx` directly. Key behaviors to preserve:

- **Transparent over hero, white on scroll.** `isScrolled` state set at `window.scrollY > 50`. When scrolled: `bg-white text-black shadow-sm`. When not: `bg-transparent text-white`.
- **Logo:** `"Aura"` in Playfair Display `text-2xl tracking-widest uppercase` + `"Botanicals"` subtitle in `#C5A059` at `text-[10px] tracking-[0.3em]`. → **Replace brand name with the actual business name.**
- **Nav links:** `["Skincare", "Home Decor", "Our Story", "Journal"]` — Montserrat, `text-sm tracking-[0.15em] uppercase`, hover to `#C5A059`.
- **Icons right:** `MagnifyingGlass` + `Bag` (with gold badge showing cart count `0`) from `@phosphor-icons/react`.
- **Mobile menu:** Full-screen white overlay, slides in from right using `motion/react` `AnimatePresence`. Nav links render in Playfair Display `text-2xl`. Close button top-right.
- In Next.js, mark `'use client'` and replace `href="#..."` anchors with `<Link>` from `next/link`.

---

### `SeasonalBanner.tsx` ← NEW

**Purpose:** Thin dismissible announcement bar above the navbar. Owner updates `lib/seasonal-banner.ts` to change it.

**Config — `lib/seasonal-banner.ts`:**

```ts
export const seasonalBanner = {
  enabled: true,
  message: "✦ Spring Collection Now Available — Free shipping on orders over $65 ✦",
  linkLabel: "Shop Now",
  linkHref: "/collections/spring",
}
```

**Component:**

```tsx
'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { seasonalBanner } from '@/lib/seasonal-banner'

export function SeasonalBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (!seasonalBanner.enabled) return null

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111] text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center relative">
            <p
              className="text-[10px] uppercase tracking-[0.25em] text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {seasonalBanner.message}{' '}
              <a href={seasonalBanner.linkHref} className="text-[#C5A059] underline underline-offset-2 hover:opacity-80 transition-opacity">
                {seasonalBanner.linkLabel}
              </a>
            </p>
            <button
              onClick={() => setDismissed(true)}
              className="absolute right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

---

### `Hero.tsx`

Port the provided `Hero.tsx` directly. Key details:

- **Full viewport height** (`h-screen`), `bg-black`, centered content.
- **Background:** Full-bleed `<img>` (→ swap to `next/image` with `fill`) with `bg-black/40` overlay div on top (`z-10`). Image has `scale-105` for subtle zoom-in feel.
- **Eyebrow:** `"Artisan Crafted Perfection"` — Montserrat, `text-[#C5A059] tracking-[0.3em] uppercase text-xs`.
- **Headline:** Playfair Display `text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight`. Second line `italic font-light`.
- **Body copy:** Montserrat `text-gray-200 text-sm md:text-base leading-relaxed font-light`.
- **CTAs:** Two side-by-side buttons.
  - Primary: `bg-white text-black` → `hover:bg-[#C5A059] hover:text-white` with `ArrowRight` icon.
  - Secondary: `border border-white text-white` → `hover:bg-white hover:text-black`.
  - Both: `uppercase tracking-widest text-xs font-semibold px-8 py-4`.
- **Scroll indicator:** Animated thin vertical line at bottom-center. Gold fill animates `y: [0, 48]` on infinite loop. "Scroll" label above in `text-white text-[10px] uppercase tracking-widest`.
- **Animations:** All elements use `motion/react` `initial={{ opacity:0, y:20 }}` → `animate={{ opacity:1, y:0 }}`, staggered with `delay` values of `0.2`, `0.4`, `0.6`, `0.8`.

**Replace image src** with `/images/placeholder.png`.

---

### `FeaturedProducts.tsx`

Port the provided `FeaturedProducts.tsx` directly. Key details:

- **Section bg:** `bg-white`, `py-32`.
- **Header row:** Left side has section title `"Curated Essentials"` (Playfair Display `text-4xl md:text-5xl`) + subtitle in Montserrat `text-gray-600 text-lg`. Right side has `"View Entire Collection"` link with `ArrowRight`, uppercase Montserrat, black → gold on hover, with an animated bottom border.
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16`.
- **Product card:**
  - `aspect-[3/4]` image container with `overflow-hidden bg-gray-50`.
  - Tag badge: `absolute top-4 left-4`, `bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-black`.
  - Image hover: `group-hover:scale-105 transition-transform duration-700`.
  - **Add to Cart overlay:** `absolute bottom-0` full-width button, `translate-y-full group-hover:translate-y-0 transition-transform duration-300`. Black bg → gold on hover. `ShoppingBag` icon + `"Add to Cart"` text.
  - Gradient overlay behind cart button: `opacity-0 group-hover:opacity-100`, `bg-gradient-to-t from-black/50`.
  - Below image: category label (`text-gray-500 text-[10px] uppercase tracking-widest`) → product name (Playfair Display `text-lg`, hover to `#C5A059`) → price (Montserrat `text-gray-900 font-medium text-sm`).
- **Scroll-triggered animation:** `useInView` with `margin: "-100px"`. Cards stagger with `delay: index * 0.1`, `duration: 0.8`, `y: 50 → 0`.
- **Products array** (update names/prices to match actual inventory — replace image URLs with `/images/placeholder.png`):

```ts
const products = [
  { id: 1, name: "Golden Elixir Serum",          category: "Skincare",    price: "$120.00", tag: "Best Seller"     },
  { id: 2, name: "Oat & Honey Artisanal Soap",   category: "Skincare",    price: "$28.00",  tag: "New Arrival"     },
  { id: 3, name: "Noir Fig & Amber Candle",       category: "Home Decor",  price: "$85.00",  tag: "Limited Edition" },
  { id: 4, name: "Minimalist Sculptural Vase",    category: "Home Decor",  price: "$150.00", tag: "Signature"       },
]
```

---

### `EditorialBanner.tsx`

Taken from the inline section in `App.tsx`. Extract as its own component:

```tsx
export function EditorialBanner() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/placeholder.png')" }}
      />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2
          className="text-3xl md:text-5xl text-white font-serif mb-6 leading-tight italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          "An oasis of calm in a chaotic world. The most exquisite handcrafted care."
        </h2>
        <p
          className="text-[#C5A059] uppercase tracking-[0.2em] text-sm font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          — Vogue Magazine
        </p>
      </div>
    </section>
  )
}
```

---

### `Philosophy.tsx`

Port the provided `Philosophy.tsx` directly. Key details:

- **Section bg:** `bg-[#faf9f6]` (warm off-white), `py-32`.
- **Layout:** `flex-col lg:flex-row items-center gap-16 lg:gap-24`. Left half image, right half text.
- **Image (left):**
  - `aspect-[4/5]` container, `max-w-lg`, `rounded-sm shadow-2xl`.
  - Decorative gold border: `absolute -inset-4 border border-[#C5A059]/40 z-[-1]` (hidden on mobile).
  - Animate `x: -50 → 0, opacity: 0 → 1` on scroll into view.
- **Text (right):**
  - Eyebrow: gold line `w-12 h-[1px] bg-[#C5A059]` + `"Our Philosophy"` in Montserrat gold `tracking-[0.2em] uppercase text-xs`.
  - Heading: Playfair Display `text-4xl md:text-5xl lg:text-6xl leading-[1.2]`.
  - Three body paragraphs in Montserrat `text-gray-600 leading-relaxed font-light`.
  - Pull quote: Playfair Display `italic text-xl text-gray-800 border-l-2 border-[#C5A059] pl-6 my-10`.
  - Founder signature image + `"Eleanor Vance, Founder"` label. → **Replace name with actual owner's name.** Replace signature image with owner's actual signature or remove.
  - Animate `x: 50 → 0, opacity: 0 → 1` with `delay: 0.2`.
- Both sides use `useInView` with `once: true, margin: "-100px"`.

**Replace image src** with `/images/placeholder.png`.

---

### `BlogPreview.tsx` ← NEW

**Purpose:** 3-card journal/blog teaser. Owner edits `lib/blog-posts.ts` to add or update posts.

**Config — `lib/blog-posts.ts`:**

```ts
export const blogPosts = [
  {
    id: 1,
    slug: "benefits-of-shea-butter",
    title: "The Skin-Transforming Benefits of Raw Shea Butter",
    excerpt: "Discover why shea butter has been a cornerstone of skin rituals for centuries, and how we source ours ethically.",
    date: "March 28, 2025",
    category: "Ingredients",
    image: "/images/placeholder.png",
  },
  {
    id: 2,
    slug: "spring-self-care-ritual",
    title: "Building a Spring Self-Care Ritual",
    excerpt: "As the seasons shift, your skin and senses deserve a refresh. Here's our curated spring ritual guide.",
    date: "April 2, 2025",
    category: "Lifestyle",
    image: "/images/placeholder.png",
  },
  {
    id: 3,
    slug: "candle-care-tips",
    title: "How to Make Your Soy Candle Last Longer",
    excerpt: "A few simple habits can double the life of your candle and keep the scent throw at its best.",
    date: "April 10, 2025",
    category: "Tips",
    image: "/images/placeholder.png",
  },
]
```

**Component structure** (styled to match the existing component language):

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { blogPosts } from '@/lib/blog-posts'

export function BlogPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row — mirrors FeaturedProducts header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2
            className="text-4xl md:text-5xl font-serif text-black leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From the Journal
          </h2>
          <a
            href="/journal"
            className="group flex items-center gap-2 text-black hover:text-[#C5A059] transition-colors uppercase tracking-widest text-xs font-semibold whitespace-nowrap pb-2 border-b border-black hover:border-[#C5A059]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Read All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={`/journal/${post.slug}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image — aspect-video, mirrors product card style */}
              <div className="relative overflow-hidden aspect-video mb-6 bg-gray-50">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Meta */}
              <p
                className="text-[#C5A059] text-[10px] uppercase tracking-widest mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.category}
              </p>
              <h3
                className="text-lg font-serif text-black mb-3 group-hover:text-[#C5A059] transition-colors leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.title}
              </h3>
              <p
                className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.excerpt}
              </p>
              <p
                className="text-gray-400 text-[10px] uppercase tracking-widest"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.date}
              </p>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
```

---

### `NewsletterSection.tsx`

Taken from the inline section in `App.tsx`. Extract as its own component:

```tsx
export function NewsletterSection() {
  return (
    <section className="py-32 bg-white text-center px-4">
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-4xl font-serif text-black mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Join the Sanctuary
        </h2>
        <p
          className="text-gray-500 mb-8 font-light"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Sign up to receive 15% off your first order of luxury handcrafted botanical goods.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-gray-50 border border-gray-200 px-6 py-4 focus:outline-none focus:border-black transition-colors rounded-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors rounded-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
```

Wire up to Klaviyo or Shopify customer API when going live.

---

### `Footer.tsx`

Port the provided `Footer.tsx` directly. Key details:

- **Bg:** `bg-[#111]`, `py-24`. Gold gradient rule at very top: `bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50`.
- **4-column grid:** Brand · Discover · Information · Join the Ritual.
- **Brand col:** `"Aura"` wordmark (Playfair Display `text-3xl tracking-widest uppercase`) + `"Botanicals"` in `#C5A059`. Description in `text-gray-400 text-sm`. Social icons: `InstagramLogo`, `FacebookLogo`, `TwitterLogo` from `@phosphor-icons/react` — `text-gray-400 hover:text-[#C5A059]`. → **Replace brand name, description, and social links with actual business info.**
- **Discover links:** `['Skincare Collection', 'Home Decor', 'New Arrivals', 'Best Sellers', 'Gift Cards']` — Montserrat `text-sm uppercase tracking-wider text-gray-400 hover:text-[#C5A059]`.
- **Information links:** `['About Us', 'Sustainability', 'Shipping & Returns', 'FAQ', 'Contact']` — same style.
- **Newsletter col:** Borderless email input with bottom border only (`border-b border-gray-700`), `ArrowRight` submit button. Contact info below with `MapPin`, `Phone`, `Envelope` icons from `@phosphor-icons/react` in `#C5A059`. → **Replace placeholder address, phone, and email with real business info.**
- **Bottom bar:** `border-t border-gray-800`. Copyright left, Privacy Policy + Terms of Service links right. All `text-gray-500 text-xs uppercase tracking-widest`.

---

## Owner-Editable Fields — Summary

These are the **only two files** that need to change to keep content fresh. No component code needs to be touched:

| File | Controls |
|---|---|
| `lib/seasonal-banner.ts` | Top announcement bar — message text, link, on/off toggle |
| `lib/blog-posts.ts` | Blog preview cards — title, excerpt, date, category, image path |

**Future upgrade:** Migrate both to a headless CMS (Sanity, Contentful) or Shopify metafields so the owner has a visual editor interface with no file editing at all.

---

## Customization Checklist

Before going live, update these placeholder values across the components:

- [ ] Brand name `"Aura Botanicals"` → actual business name (Navbar, Footer)
- [ ] `"Eleanor Vance, Founder"` → actual owner name (Philosophy)
- [ ] Signature image in Philosophy → owner's actual signature or remove the element
- [ ] Footer address, phone, email → real business contact info
- [ ] Footer social links → real Instagram/Facebook/Pinterest URLs
- [ ] All `src="/images/placeholder.png"` → real product/editorial photography
- [ ] Products array in `FeaturedProducts.tsx` → actual product names and prices
- [ ] Newsletter form → wire to Klaviyo or Shopify email list

---

## Shopify Integration Notes (Future Sprint)

When connecting to Shopify:

- Replace the `products` array in `FeaturedProducts.tsx` with Storefront API GraphQL queries via `@shopify/storefront-api-client`
- Product images → Shopify CDN URLs
- `"Add to Cart"` button → Shopify Cart API mutation
- `BlogPreview` posts → Shopify Articles API (same data shape as `lib/blog-posts.ts`)
- Newsletter → Shopify Customer API or Klaviyo embed

---

## Animation Reference

All animation follows the same `motion/react` patterns already established in the provided components:

| Pattern | Implementation |
|---|---|
| Fade up on load | `initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}` with staggered `delay` |
| Fade up on scroll | `initial={{ opacity:0, y:50 }} animate={isInView ? {opacity:1, y:0} : ...}` via `useInView` |
| Slide in from side | `initial={{ opacity:0, x:±50 }} animate={isInView ? {opacity:1, x:0} : ...}` |
| Image hover zoom | `group-hover:scale-105 transition-transform duration-700 ease-out` (CSS only) |
| Button hover slide | `translate-y-full group-hover:translate-y-0 transition-transform duration-300` (CSS only) |
| Scroll progress bar | `useScroll` + `useSpring` → `scaleX` on fixed top bar |
| Animated scroll line | `animate={{ y: [0, 48] }} transition={{ repeat: Infinity, duration: 1.5 }}` |
| Mobile menu | `AnimatePresence` + `motion.div` `x: "100%" → 0` |
