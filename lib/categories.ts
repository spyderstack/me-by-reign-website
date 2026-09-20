export interface CategoryConfig {
  slug: string
  title: string
  eyebrow: string
  description: string
  aliases: string[]
  matches: (productCategory: string) => boolean
}

/**
 * The 4 official catalog categories for ME byReign:
 * 1. Body Butters
 * 2. Soaps and Scrubs
 * 3. Candles
 * 4. Other
 */
export const CATALOG_CATEGORIES: CategoryConfig[] = [
  {
    slug: 'body-butters',
    title: 'Body Butters',
    eyebrow: 'ME byReign Skincare',
    description:
      'Luxuriously whipped botanical body butters formulated with unrefined shea, rich mango butter, and pure organic oils to seal in deep, velvety hydration.',
    aliases: ['body-butter', 'bodybutters', 'bodybutter'],
    matches: (cat: string) => cat.toLowerCase().trim() === 'body butter',
  },
  {
    slug: 'soaps-and-scrubs',
    title: 'Soaps and Scrubs',
    eyebrow: 'Cleanse & Renew',
    description:
      'Cold-processed artisan soaps and gentle exfoliating sugar scrubs crafted to cleanse, polish, and replenish your skin.',
    aliases: [
      'soaps-scrubs',
      'soaps',
      'soap',
      'body-scrubs',
      'body-scrub',
      'scrubs',
      'soap-and-scrub',
    ],
    matches: (cat: string) => ['soap', 'body scrub'].includes(cat.toLowerCase().trim()),
  },
  {
    slug: 'candles',
    title: 'Candles',
    eyebrow: 'ME byReign Home',
    description:
      'Hand-poured artisan candles infused with evocative clean fragrances, crackling wooden wicks, and natural waxes designed to transform your sacred space.',
    aliases: ['candle', 'scented-candles'],
    matches: (cat: string) => cat.toLowerCase().trim() === 'candle',
  },
  {
    slug: 'other',
    title: 'Other',
    eyebrow: 'ME byReign Collection',
    description:
      'Explore our curated collection of botanical body oils, ambient room diffusers, wellness tools, and signature gift sets.',
    aliases: [
      'body-oils',
      'body-oil',
      'oils',
      'diffusers',
      'room-diffusers',
      'room-diffuser',
      'travel-kits',
      'travel-kit',
      'face-rollers',
      'face-roller',
      'bundles',
      'combination',
      'combinations',
    ],
    matches: (cat: string) =>
      !['body butter', 'soap', 'body scrub', 'candle'].includes(cat.toLowerCase().trim()),
  },
]

/**
 * Finds a CategoryConfig by its slug or any known alias.
 */
export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  const normalized = slug.toLowerCase().trim()

  return CATALOG_CATEGORIES.find(
    (c) =>
      c.slug === normalized ||
      c.aliases.includes(normalized) ||
      c.title.toLowerCase().replace(/[\s&]+/g, '-') === normalized
  )
}

/**
 * Finds the matching CategoryConfig for a given Shopify product category.
 */
export function getCategoryForProductType(productType?: string | null): CategoryConfig | undefined {
  const category = (productType || '').trim()
  return CATALOG_CATEGORIES.find((c) => c.matches(category))
}

/**
 * Returns all canonical and alias slugs for static route generation.
 */
export function getAllCategorySlugs(): string[] {
  const slugs: string[] = []
  for (const cat of CATALOG_CATEGORIES) {
    slugs.push(cat.slug)
    slugs.push(...cat.aliases)
  }
  return Array.from(new Set(slugs))
}
