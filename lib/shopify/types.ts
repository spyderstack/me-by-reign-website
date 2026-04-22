// ─── Shopify Storefront API Types ────────────────────────────────────────────
// These mirror the Shopify Storefront API GraphQL schema exactly.

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyMoneyV2 {
  amount: string        // e.g. "120.00"
  currencyCode: string  // e.g. "USD"
}

export interface ShopifySEO {
  title: string | null
  description: string | null
}

export interface ShopifySelectedOption {
  name: string
  value: string
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  sku: string | null
  price: ShopifyMoneyV2
  compareAtPrice: ShopifyMoneyV2 | null
  selectedOptions: ShopifySelectedOption[]
  product?: {
    id: string
    handle: string
    title: string
    featuredImage: ShopifyImage | null
  }
}

export interface ShopifyMedia {
  mediaContentType: 'IMAGE' | 'VIDEO' | 'EXTERNAL_VIDEO' | 'MODEL_3D'
  alt: string | null
  id: string
  image?: ShopifyImage
  sources?: {
    url: string
    mimeType: string
    format: string
    height: number
    width: number
  }[]
  previewImage?: {
    url: string
  }
  embedUrl?: string
}

export interface ShopifyProductOption {
  name: string
  values: string[]
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  productType: string
  tags: string[]
  availableForSale: boolean
  featuredImage: ShopifyImage | null
  images: { nodes: ShopifyImage[] }
  media: { nodes: ShopifyMedia[] }
  priceRange: {
    minVariantPrice: ShopifyMoneyV2
    maxVariantPrice: ShopifyMoneyV2
  }
  options: ShopifyProductOption[]
  metafields: (ShopifyMetafield | null)[]
  variants: { nodes: ShopifyProductVariant[] }
  seo: ShopifySEO
}

export interface ShopifyMetafield {
  namespace: string
  key: string
  value: string
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: ShopifyProductVariant
  attributes: { key: string; value: string }[]
}

export interface ShopifyArticle {
  id: string
  handle: string
  title: string
  contentHtml: string
  excerptHtml: string | null
  publishedAt: string
  image: ShopifyImage | null
  authorV2: {
    name: string
  } | null
  tags: string[]
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: { nodes: ShopifyCartLine[] }
  cost: {
    subtotalAmount: ShopifyMoneyV2
    totalAmount: ShopifyMoneyV2
  }
  buyerIdentity: {
    email: string | null
    phone: string | null
    customer: {
      id: string
      firstName: string | null
      lastName: string | null
    } | null
  }
}

export interface ShopifyShop {
  name: string
  description: string | null
  paymentSettings: {
    acceptedCardBrands: string[]
    supportedDigitalWallets: string[]
    enabledPresentmentCurrencies: string[]
  }
  primaryDomain: {
    url: string
    host: string
  }
  privacyPolicy?: {
    title: string
    url: string
  }
  termsOfService?: {
    title: string
    url: string
  }
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  products: {
    nodes: ShopifyProduct[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

// ─── Derived UI Types ─────────────────────────────────────────────────────────

export interface NormalizedProduct {
  id: string
  handle: string
  name: string
  category: string
  tag: string
  price: string
  compareAtPrice: string | null
  available: boolean
  isOnSale: boolean
  image: string
  imageAlt: string
  images: string[]
  media: {
    type: 'IMAGE' | 'VIDEO' | 'EXTERNAL_VIDEO'
    url: string
    alt: string
    previewImage?: string
  }[]
  description: string
  descriptionHtml: string
  variantId: string
  sku: string | null
  options: {
    name: string
    values: string[]
  }[]
  variants: {
    id: string
    title: string
    price: string
    compareAtPrice: string | null
    available: boolean
    quantityAvailable: number | null
    isOnSale: boolean
    selectedOptions: { name: string; value: string }[]
  }[]
  reviews: {
    rating: number
    count: number
  }
  seo: ShopifySEO
}

export interface NormalizedArticle {
  id: string
  slug: string
  title: string
  contentHtml: string
  excerptHtml: string
  date: string
  image: string
  author: string
  tags: string[]
  category: string
  readTime: string
}

export interface NormalizedCartLine {
  id: string
  variantId: string
  quantity: number
  name: string
  price: string
  total: string
  image: string
  handle: string
}

export interface NormalizedCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: NormalizedCartLine[]
  subtotal: string
  total: string
  currencyCode: string
}

export type SortKey = 'MANUAL' | 'BEST_SELLING' | 'PRICE_ASC' | 'PRICE_DESC' | 'CREATED_AT'

export interface CatalogFilters {
  category: string | null
  sort: SortKey
}