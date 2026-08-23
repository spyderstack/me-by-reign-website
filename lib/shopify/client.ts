// ─── Shopify Storefront API Client ────────────────────────────────────────────
//
// SETUP: Add these to your .env.local
//   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
//   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-public-storefront-token
//
// The Storefront API token is PUBLIC — it's safe to expose in client components.

import {
  ShopifyProduct,
  NormalizedProduct,
  ShopifyCart,
  NormalizedCart,
  ShopifyShop,
  SortKey,
  ShopifyArticle,
  NormalizedArticle,
} from './types'
import {
  GET_ALL_PRODUCTS_QUERY,
  GET_COLLECTION_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  CHECKOUT_CREATE_MUTATION,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
  GET_CART_QUERY,
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  GET_SHOP_SETTINGS_QUERY,
  GET_ALL_ARTICLES_QUERY,
  GET_ARTICLE_BY_HANDLE_QUERY,
} from './queries'

// ─── Config ──────────────────────────────────────────────────────────────────

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const API_VERSION = '2024-07' 

// ─── Core Fetch ──────────────────────────────────────────────────────────────

async function shopifyFetch<T = unknown>({
  query,
  variables = {},
  cache = 'force-cache',
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
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
    cache,
    next: cache === 'force-cache' ? { revalidate: 60 } : undefined,
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

// ─── Price Formatting ──────────────────────────────────────────────────────────

const formatPrice = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(amount))

// ─── Normalizers ──────────────────────────────────────────────────────────────

export function normalizeProduct(product: ShopifyProduct): NormalizedProduct {
  const { id, handle, title, description, descriptionHtml, productType, tags, availableForSale, featuredImage, images, media, variants, options, metafields, seo } = product

  const defaultVariant = variants.nodes[0]
  const price = defaultVariant?.price || product.priceRange.minVariantPrice
  const compareAtPrice = defaultVariant?.compareAtPrice

  // Extract review metafields
  const ratingMeta = metafields?.find(m => m?.namespace === 'reviews' && m?.key === 'rating')
  const countMeta = metafields?.find(m => m?.namespace === 'reviews' && m?.key === 'rating_count')
  
  // Parse rating value (Shopify ratings are often JSON: {"value":"4.5","scale_max":"5.0"})
  let rating = 0
  try {
    const ratingData = ratingMeta ? JSON.parse(ratingMeta.value) : null
    rating = ratingData ? parseFloat(ratingData.value) : 0
  } catch {
    rating = ratingMeta ? parseFloat(ratingMeta.value) : 0
  }

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
    isOnSale: compareAtPrice ? parseFloat(price.amount) < parseFloat(compareAtPrice.amount) : false,
    image: featuredImage?.url || '/images/placeholder.png',
    imageAlt: featuredImage?.altText || title,
    images: images.nodes.map((n) => n.url),
    media: (media?.nodes || []).map((m) => ({
      type: m.mediaContentType === 'VIDEO' ? 'VIDEO' : m.mediaContentType === 'EXTERNAL_VIDEO' ? 'EXTERNAL_VIDEO' : 'IMAGE',
      url: m.mediaContentType === 'VIDEO' ? m.sources?.[0]?.url || '' : m.mediaContentType === 'EXTERNAL_VIDEO' ? m.embedUrl || '' : m.image?.url || '',
      alt: m.alt || title,
      previewImage: m.previewImage?.url
    })),
    description,
    descriptionHtml,
    variantId: defaultVariant?.id || '',
    sku: defaultVariant?.sku || null,
    options: options?.map(o => ({ name: o.name, values: o.values })) || [],
    variants: variants.nodes.map(v => ({
      id: v.id,
      title: v.title,
      price: formatPrice(v.price.amount, v.price.currencyCode),
      compareAtPrice: v.compareAtPrice ? formatPrice(v.compareAtPrice.amount, v.compareAtPrice.currencyCode) : null,
      available: v.availableForSale,
      quantityAvailable: v.quantityAvailable ?? null,
      isOnSale: v.compareAtPrice ? parseFloat(v.price.amount) < parseFloat(v.compareAtPrice.amount) : false,
      selectedOptions: v.selectedOptions,
      sellingPlanAllocations: v.sellingPlanAllocations?.nodes?.map(spa => ({
        sellingPlan: {
          id: spa.sellingPlan.id,
          name: spa.sellingPlan.name,
          description: spa.sellingPlan.description,
          options: spa.sellingPlan.options,
        },
        price: spa.priceAdjustments?.[0]?.price
          ? formatPrice(spa.priceAdjustments[0].price.amount, spa.priceAdjustments[0].price.currencyCode)
          : formatPrice(v.price.amount, v.price.currencyCode),
        compareAtPrice: spa.priceAdjustments?.[0]?.compareAtPrice
          ? formatPrice(spa.priceAdjustments[0].compareAtPrice.amount, spa.priceAdjustments[0].compareAtPrice.currencyCode)
          : null,
        perDeliveryPrice: spa.priceAdjustments?.[0]?.perDeliveryPrice
          ? formatPrice(spa.priceAdjustments[0].perDeliveryPrice.amount, spa.priceAdjustments[0].perDeliveryPrice.currencyCode)
          : null,
      })) || [],
    })),
    reviews: {
      rating: rating || 5, // Fallback to 5 if not set
      count: countMeta ? parseInt(countMeta.value) : 0
    },
    sellingPlanGroups: product.sellingPlanGroups?.nodes || [],
    seo: {
      title: seo?.title || title,
      description: seo?.description || description,
    },
  }
}

export function normalizeArticle(article: ShopifyArticle): NormalizedArticle {
  const { id, handle, title, contentHtml, excerptHtml, publishedAt, image, authorV2, tags } = article

  // Calculate read time based on word count of the HTML content (approx 200 words per min)
  const plainText = contentHtml.replace(/<[^>]+>/g, '')
  const wordCount = plainText.split(/\s+/).length
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))

  return {
    id,
    slug: handle,
    title,
    contentHtml,
    excerptHtml: excerptHtml || '',
    date: new Date(publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: image?.url || '/images/placeholder.png',
    author: authorV2?.name || 'Editorial Team',
    tags,
    category: tags[0] || 'Journal',
    readTime: `${readTimeMinutes} min read`,
  }
}

export function normalizeCart(cart: ShopifyCart): NormalizedCart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    lines: cart.lines.nodes.map((line) => ({
      id: line.id,
      variantId: line.merchandise.id,
      quantity: line.quantity,
      name: line.merchandise.product?.title || 'Product',
      price: formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode),
      total: formatPrice(
        (parseFloat(line.merchandise.price.amount) * line.quantity).toString(),
        line.merchandise.price.currencyCode
      ),
      image: line.merchandise.product?.featuredImage?.url || '/images/placeholder.png',
      handle: line.merchandise.product?.handle || '',
      sellingPlan: line.sellingPlanAllocation?.sellingPlan ? {
        id: line.sellingPlanAllocation.sellingPlan.id,
        name: line.sellingPlanAllocation.sellingPlan.name,
        description: line.sellingPlanAllocation.sellingPlan.description,
      } : null,
    })),
    subtotal: formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode),
    total: formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode),
    currencyCode: cart.cost.totalAmount.currencyCode,
  }
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
  query?: string
} = {}): Promise<{ products: NormalizedProduct[]; hasNextPage: boolean; endCursor: string | null }> {
  const SORT_MAP: Record<SortKey, { sortKey: string; reverse: boolean }> = {
    MANUAL:       { sortKey: 'RELEVANCE',    reverse: false },
    BEST_SELLING: { sortKey: 'BEST_SELLING', reverse: false },
    PRICE_ASC:    { sortKey: 'PRICE',        reverse: false },
    PRICE_DESC:   { sortKey: 'PRICE',        reverse: true  },
    CREATED_AT:   { sortKey: 'CREATED_AT',   reverse: true  },
  }

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
}

export async function getProductByHandle(handle: string): Promise<NormalizedProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  })
  return data.product ? normalizeProduct(data.product) : null
}

export async function getProductRecommendations(productId: string): Promise<NormalizedProduct[]> {
  const data = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>({
    query: GET_PRODUCT_RECOMMENDATIONS_QUERY,
    variables: { productId },
  })
  return data.productRecommendations.map(normalizeProduct)
}

export async function getCollectionProducts({
  handle,
  first = 24,
  after,
}: {
  handle: string
  first?: number
  after?: string
}): Promise<{ products: NormalizedProduct[]; hasNextPage: boolean; endCursor: string | null; title: string }> {
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
    variables: { handle, first, after },
  })

  return {
    title: data.collection.title,
    products: data.collection.products.nodes.map(normalizeProduct),
    hasNextPage: data.collection.products.pageInfo.hasNextPage,
    endCursor: data.collection.products.pageInfo.endCursor,
  }
}

// ─── Blog Functions ───────────────────────────────────────────────────────────

export async function getAllArticles({
  first = 24,
  after,
}: {
  first?: number
  after?: string
} = {}): Promise<{ articles: NormalizedArticle[]; hasNextPage: boolean; endCursor: string | null }> {
  const data = await shopifyFetch<{
    articles: {
      nodes: ShopifyArticle[]
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
    }
  }>({
    query: GET_ALL_ARTICLES_QUERY,
    variables: { first, after },
  })

  return {
    articles: data.articles.nodes.map(normalizeArticle),
    hasNextPage: data.articles.pageInfo.hasNextPage,
    endCursor: data.articles.pageInfo.endCursor,
  }
}

export async function getArticleByHandle(handle: string, blogHandle: string = 'news'): Promise<NormalizedArticle | null> {
  const data = await shopifyFetch<{
    blog: {
      articleByHandle: ShopifyArticle | null
    } | null
  }>({
    query: GET_ARTICLE_BY_HANDLE_QUERY,
    variables: { blogHandle, handle },
  })

  return data.blog?.articleByHandle ? normalizeArticle(data.blog.articleByHandle) : null
}

// ─── Cart Functions ───────────────────────────────────────────────────────────

export async function getCart(cartId: string): Promise<NormalizedCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store', // Carts should never be cached
  })
  return data.cart ? normalizeCart(data.cart) : null
}

export async function cartCreate(lineItems: { variantId: string; quantity: number; sellingPlanId?: string }[]): Promise<NormalizedCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: CART_CREATE_MUTATION,
    variables: {
      input: {
        lines: lineItems.map((item) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
          ...(item.sellingPlanId ? { sellingPlanId: item.sellingPlanId } : {}),
        })),
      },
    },
    cache: 'no-store',
  })
  return normalizeCart(data.cartCreate.cart)
}

export async function cartLinesAdd(cartId: string, lines: { variantId: string; quantity: number; sellingPlanId?: string }[]): Promise<NormalizedCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: CART_LINES_ADD_MUTATION,
    variables: {
      cartId,
      lines: lines.map((line) => ({
        merchandiseId: line.variantId,
        quantity: line.quantity,
        ...(line.sellingPlanId ? { sellingPlanId: line.sellingPlanId } : {}),
      })),
    },
    cache: 'no-store',
  })
  return normalizeCart(data.cartLinesAdd.cart)
}

export async function cartLinesUpdate(cartId: string, lines: { id: string; quantity: number }[]): Promise<NormalizedCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })
  return normalizeCart(data.cartLinesUpdate.cart)
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<NormalizedCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })
  return normalizeCart(data.cartLinesRemove.cart)
}

// ─── Shop Functions ───────────────────────────────────────────────────────────

export async function getShopSettings(): Promise<ShopifyShop> {
  const data = await shopifyFetch<{ shop: ShopifyShop }>({
    query: GET_SHOP_SETTINGS_QUERY,
  })
  return data.shop
}

// Legacy helper for old components
export async function createCheckout(items: { variantId: string; quantity: number }[]): Promise<string | null> {
  const cart = await cartCreate(items)
  return cart.checkoutUrl
}
