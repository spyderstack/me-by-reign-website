// ─── Shopify Storefront API Types ────────────────────────────────────────────
// These mirror the Shopify Storefront API GraphQL schema exactly.
// When you wire up the real API, responses will map 1:1 to these types.

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

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyMoneyV2
  compareAtPrice: ShopifyMoneyV2 | null
}

export interface ShopifyProduct {
  id: string
  handle: string               // URL slug, e.g. "golden-elixir-serum"
  title: string
  description: string
  productType: string          // e.g. "Skincare", "Home Decor"
  tags: string[]               // e.g. ["Best Seller", "Limited Edition"]
  availableForSale: boolean
  featuredImage: ShopifyImage
  images: { nodes: ShopifyImage[] }
  priceRange: {
    minVariantPrice: ShopifyMoneyV2
    maxVariantPrice: ShopifyMoneyV2
  }
  variants: { nodes: ShopifyProductVariant[] }
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
// Flat, UI-friendly shape derived from ShopifyProduct.
// Transform raw API responses into this shape via `normalizeProduct()` in client.ts

export interface NormalizedProduct {
  id: string
  handle: string
  name: string
  category: string           // productType
  tag: string                // first tag, e.g. "Best Seller"
  price: string              // formatted, e.g. "$120.00"
  compareAtPrice: string | null
  available: boolean
  image: string              // featuredImage.url
  imageAlt: string
  variantId: string          // default variant id for add-to-cart
}

export type SortKey = 'MANUAL' | 'BEST_SELLING' | 'PRICE_ASC' | 'PRICE_DESC' | 'CREATED_AT'

export interface CatalogFilters {
  category: string | null
  sort: SortKey
}