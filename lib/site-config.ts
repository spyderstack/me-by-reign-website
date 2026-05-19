// ─── Centralized Site Configuration ──────────────────────────────────────────
//
// ALL SEO-related URLs, brand info, and site identity flow from here.
//
// When you migrate to a .com domain, change ONE value:
//   NEXT_PUBLIC_SITE_URL in your .env.local (or Vercel environment settings)
//
// Everything — metadata, sitemap, robots, JSON-LD, OG images — will update automatically.

export const siteConfig = {
  /** Base URL of the site. Set via NEXT_PUBLIC_SITE_URL env var. */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mebyreign.com',

  /** Brand name used in metadata, JSON-LD, and UI */
  name: 'ME byReign',

  /** Default page title suffix */
  tagline: 'Handcrafted Skincare & Luxury Home Décor',

  /** Primary meta description */
  description:
    'Shop ME byReign — artisan-crafted botanical skincare, handmade candles, body butters, and luxury home décor. All-natural ingredients, handmade with intention for your daily self-care ritual.',

  /** OG image path (relative to public/) — swap this if you change the hero image */
  ogImage: '/images/og-image.jpg',

  /** Logo path (relative to public/) */
  logo: '/images/reign_logo.png',

  /** Social links */
  social: {
    instagram: 'https://www.instagram.com/reign_mebyreign/',
    facebook: 'https://www.facebook.com/ReignHudson/',
  },

  /** SEO keywords — long-tail terms for the niche */
  keywords: [
    'ME byReign',
    'handmade skincare',
    'artisan candles',
    'botanical skincare',
    'luxury home decor',
    'handcrafted body butter',
    'natural body oil',
    'all natural skincare',
    'handmade candles',
    'self care gifts',
    'luxury gift sets',
    'botanical wellness',
    'artisan soap',
    'shea butter skincare',
    'black owned skincare',
    'small batch skincare',
    'handmade luxury gifts',
    'natural home fragrance',
    'self care ritual',
    'mebyreign',
  ],
} as const
