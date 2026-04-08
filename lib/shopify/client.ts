// ─── Shopify Storefront API Client ────────────────────────────────────────────
//
// SETUP: Add these to your .env.local
//   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
//   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-public-storefront-token
//
// The Storefront API token is PUBLIC — it's safe to expose in client components.
// Use the Admin API token (secret) only in secure server actions.

import {
  ShopifyProduct,
  NormalizedProduct,
  SortKey,
} from './types'
import {
  GET_ALL_PRODUCTS_QUERY,
  GET_COLLECTION_QUERY,
} from './queries'

// ─── Config ──────────────────────────────────────────────────────────────────

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const API_VERSION = '2024-07' // Update to the latest stable Shopify API version

// ─── Core Fetch ──────────────────────────────────────────────────────────────

async function shopifyFetch<T = unknown>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    // Return mock data during development before Shopify is connected
    throw new Error('[Shopify] Missing env vars — using mock data fallback')
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: revalidate product data every 60s
  })

  if (!res.ok) {
    throw new Error(`[Shopify] HTTP ${res.status}: ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    console.error('[Shopify] GraphQL errors:', json.errors)
    throw new Error(json.errors[0]?.message ?? 'Shopify GraphQL error')
  }

  return json.data as T
}

// ─── Normalizer ───────────────────────────────────────────────────────────────
// Converts raw Shopify product → flat UI-friendly shape.
// Update this one function when the API shape changes — nowhere else.

export function normalizeProduct(product: ShopifyProduct): NormalizedProduct {
  const variant = product.variants.nodes[0]
  const price = parseFloat(variant?.price.amount ?? '0')
  const compareAt = variant?.compareAtPrice
    ? parseFloat(variant.compareAtPrice.amount)
    : null

  const formatPrice = (n: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(n)

  const currency = variant?.price.currencyCode ?? 'USD'

  return {
    id: product.id,
    handle: product.handle,
    name: product.title,
    category: product.productType,
    tag: product.tags[0] ?? '',
    price: formatPrice(price, currency),
    compareAtPrice: compareAt ? formatPrice(compareAt, currency) : null,
    available: product.availableForSale,
    image: product.featuredImage?.url ?? '/images/placeholder.png',
    imageAlt: product.featuredImage?.altText ?? product.title,
    variantId: variant?.id ?? '',
  }
}

// ─── Sort Key Mapping ─────────────────────────────────────────────────────────

const SORT_MAP: Record<
  SortKey,
  { sortKey: string; reverse: boolean }
> = {
  MANUAL:       { sortKey: 'MANUAL',       reverse: false },
  BEST_SELLING: { sortKey: 'BEST_SELLING', reverse: false },
  PRICE_ASC:    { sortKey: 'PRICE',        reverse: false },
  PRICE_DESC:   { sortKey: 'PRICE',        reverse: true  },
  CREATED_AT:   { sortKey: 'CREATED_AT',   reverse: true  },
}

// ─── Public Data Functions ────────────────────────────────────────────────────

export async function getAllProducts({
  first = 24,
  after,
  sort = 'MANUAL',
  query,
}: {
  first?: number
  after?: string
  sort?: SortKey
  query?: string  // Shopify search query string, e.g. "product_type:Skincare"
} = {}): Promise<{ products: NormalizedProduct[]; hasNextPage: boolean; endCursor: string | null }> {
  try {
    const { sortKey, reverse } = SORT_MAP[sort]

    const data = await shopifyFetch<{
      products: {
        nodes: ShopifyProduct[]
        pageInfo: { hasNextPage: boolean; endCursor: string | null }
      }
    }>({
      query: GET_ALL_PRODUCTS_QUERY,
      variables: { first, after, sortKey, reverse, query },
    })

    return {
      products: data.products.nodes.map(normalizeProduct),
      hasNextPage: data.products.pageInfo.hasNextPage,
      endCursor: data.products.pageInfo.endCursor,
    }
  } catch {
    // Shopify not connected — return mock data
    return { products: MOCK_PRODUCTS, hasNextPage: false, endCursor: null }
  }
}

export async function getCollectionProducts({
  handle,
  first = 24,
  after,
  sort = 'MANUAL',
}: {
  handle: string
  first?: number
  after?: string
  sort?: SortKey
}): Promise<{ products: NormalizedProduct[]; hasNextPage: boolean; endCursor: string | null; title: string }> {
  try {
    const { sortKey, reverse } = SORT_MAP[sort]

    const data = await shopifyFetch<{
      collection: {
        title: string
        products: {
          nodes: ShopifyProduct[]
          pageInfo: { hasNextPage: boolean; endCursor: string | null }
        }
      }
    }>({
      query: GET_COLLECTION_QUERY,
      variables: { handle, first, after, sortKey, reverse },
    })

    return {
      title: data.collection.title,
      products: data.collection.products.nodes.map(normalizeProduct),
      hasNextPage: data.collection.products.pageInfo.hasNextPage,
      endCursor: data.collection.products.pageInfo.endCursor,
    }
  } catch {
    return {
      title: handle.charAt(0).toUpperCase() + handle.slice(1),
      products: MOCK_PRODUCTS.filter(
        (p) => p.category.toLowerCase() === handle.toLowerCase()
      ),
      hasNextPage: false,
      endCursor: null,
    }
  }
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
// Mirrors the exact NormalizedProduct shape.
// Swap `/images/placeholder.png` for real images as assets are added.
// Delete this entire block once Shopify is connected.

export const MOCK_PRODUCTS: NormalizedProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'golden-elixir-serum',
    name: 'Golden Elixir Serum',
    category: 'Skincare',
    tag: 'Best Seller',
    price: '$120.00',
    compareAtPrice: null,
    available: true,
    image: '/images/placeholder.png',
    imageAlt: 'Golden Elixir Serum',
    variantId: 'gid://shopify/ProductVariant/1',
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'oat-honey-soap',
    name: 'Oat & Honey Artisanal Soap',
    category: 'Skincare',
    tag: 'New Arrival',
    price: '$28.00',
    compareAtPrice: null,
    available: true,
    image: '/images/placeholder.png',
    imageAlt: 'Oat & Honey Artisanal Soap',
    variantId: 'gid://shopify/ProductVariant/2',
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'noir-fig-amber-candle',
    name: 'Noir Fig & Amber Candle',
    category: 'Home Decor',
    tag: 'Limited Edition',
    price: '$85.00',
    compareAtPrice: '$110.00',
    available: true,
    image: '/images/placeholder.png',
    imageAlt: 'Noir Fig & Amber Candle',
    variantId: 'gid://shopify/ProductVariant/3',
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'minimalist-sculptural-vase',
    name: 'Minimalist Sculptural Vase',
    category: 'Home Decor',
    tag: 'Signature',
    price: '$150.00',
    compareAtPrice: null,
    available: true,
    image: '/images/placeholder.png',
    imageAlt: 'Minimalist Sculptural Vase',
    variantId: 'gid://shopify/ProductVariant/4',
  },
  {
    id: 'gid://shopify/Product/5',
    handle: 'velvet-rose-body-oil',
    name: 'Velvet Rose Body Oil',
    category: 'Skincare',
    tag: 'Best Seller',
    price: '$68.00',
    compareAtPrice: null,
    available: true,
    image: '/images/placeholder.png',
    imageAlt: 'Velvet Rose Body Oil',
    variantId: 'gid://shopify/ProductVariant/5',
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'linen-cloud-pillowcase',
    name: 'Linen Cloud Pillowcase Set',
    category: 'Home Decor',
    tag: 'New Arrival',
    price: '$95.00',
    compareAtPrice: null,
    available: true,
    image: '/images/placeholder.png',
    imageAlt: 'Linen Cloud Pillowcase Set',
    variantId: 'gid://shopify/ProductVariant/6',
  },
  {
    id: 'gid://shopify/Product/7',
    handle: 'obsidian-face-roller',
    name: 'Obsidian Face Roller',
    category: 'Skincare',
    tag: 'Signature',
    price: '$42.00',
    compareAtPrice: '$58.00',
    available: true,
    image: '/images/placeholder.png',
    imageAlt: 'Obsidian Face Roller',
    variantId: 'gid://shopify/ProductVariant/7',
  },
  {
    id: 'gid://shopify/Product/8',
    handle: 'cedar-sage-room-mist',
    name: 'Cedar & Sage Room Mist',
    category: 'Home Decor',
    tag: 'Limited Edition',
    price: '$55.00',
    compareAtPrice: null,
    available: false,
    image: '/images/placeholder.png',
    imageAlt: 'Cedar & Sage Room Mist',
    variantId: 'gid://shopify/ProductVariant/8',
  },
]
