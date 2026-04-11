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
  GET_PRODUCT_BY_HANDLE_QUERY,
  CHECKOUT_CREATE_MUTATION,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
} from './queries'

// ─── Config ──────────────────────────────────────────────────────────────────

// PRODUCTION NOTE: Ensure these are set in your deployment environment (Vercel/Netlify).
// For real store migration, update NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN to your primary domain.
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

// PRODUCTION NOTE: Shopify releases new API versions quarterly. 
// Update this string to the latest '202X-XX' version periodically.
const API_VERSION = '2024-07' 

// ─── Core Fetch ──────────────────────────────────────────────────────────────

async function shopifyFetch<T = unknown>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error('[Shopify] Missing environment variables. Please check your .env.local')
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
  const { id, handle, title, description, productType, tags, availableForSale, featuredImage, images, variants } = product

  const defaultVariant = variants.nodes[0]
  const price = defaultVariant?.price || product.priceRange.minVariantPrice
  const compareAtPrice = defaultVariant?.compareAtPrice

  return {
    id,
    handle,
    name: title,
    category: productType,
    tag: tags[0] || '',
    price: formatPrice(price.amount, price.currencyCode),
    compareAtPrice: compareAtPrice
      ? formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)
      : null,
    available: availableForSale,
    image: featuredImage?.url || '/images/placeholder.png',
    imageAlt: featuredImage?.altText || title,
    images: images.nodes.map((n) => n.url),
    description,
    variantId: defaultVariant?.id || '',
  }
}

// ─── Sort Key Mapping ─────────────────────────────────────────────────────────

const SORT_MAP: Record<
  SortKey,
  { sortKey: string; reverse: boolean }
> = {
  // 'MANUAL' is only valid for collections. For global 'products' query, we map it to 'RELEVANCE'.
  MANUAL:       { sortKey: 'RELEVANCE',    reverse: false },
  BEST_SELLING: { sortKey: 'BEST_SELLING', reverse: false },
  PRICE_ASC:    { sortKey: 'PRICE',        reverse: false },
  PRICE_DESC:   { sortKey: 'PRICE',        reverse: true  },
  CREATED_AT:   { sortKey: 'CREATED_AT',   reverse: true  },
}

// ─── Formatting ──────────────────────────────────────────────────────────────

const formatPrice = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(amount))

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
  } catch (error) {
    console.error('[Shopify] Error fetching all products:', error)
    return { products: [], hasNextPage: false, endCursor: null }
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
  } catch (error) {
    console.error(`[Shopify] Error fetching collection "${handle}":`, error)
    return {
      title: handle,
      products: [],
      hasNextPage: false,
      endCursor: null,
    }
  }
}

export async function getProductByHandle(handle: string): Promise<NormalizedProduct | null> {
  try {
    const data = await shopifyFetch<{
      product: ShopifyProduct
    }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    })

    return data.product ? normalizeProduct(data.product) : null
  } catch (error) {
    console.error(`[Shopify] Error fetching product "${handle}":`, error)
    return null
  }
}

export async function createCheckout(items: { variantId: string; quantity: number }[]): Promise<string | null> {
  try {
    const lineItems = items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }))

    const data = await shopifyFetch<{
      checkoutCreate: {
        checkout: { webUrl: string }
        checkoutUserErrors: { message: string }[]
      }
    }>({
      query: CHECKOUT_CREATE_MUTATION,
      variables: { input: { lineItems } },
    })

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      console.error('[Shopify] Checkout errors:', data.checkoutCreate.checkoutUserErrors)
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message)
    }

    return data.checkoutCreate.checkout.webUrl
  } catch (error) {
    console.error('[Shopify] Error creating checkout:', error)
    return null
  }
}

export async function getProductRecommendations(productId: string): Promise<NormalizedProduct[]> {
  try {
    const data = await shopifyFetch<{
      productRecommendations: ShopifyProduct[]
    }>({
      query: GET_PRODUCT_RECOMMENDATIONS_QUERY,
      variables: { productId },
    })

    if (!data?.productRecommendations) {
      return []
    }

    return data.productRecommendations.map((product) => normalizeProduct(product))
  } catch (error) {
    console.error('[Shopify] Error fetching recommendations:', error)
    return []
  }
}
