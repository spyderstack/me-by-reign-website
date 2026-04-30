// ─── JSON-LD Structured Data Components for SEO ─────────────────────────────
//
// These components inject <script type="application/ld+json"> into each page
// so Google can generate Rich Results (product cards, breadcrumbs, articles, etc.)

import { NormalizedProduct } from '@/lib/shopify/types'
import { siteConfig } from '@/lib/site-config'

const SITE_URL = siteConfig.url
const SITE_NAME = siteConfig.name
const LOGO_URL = `${SITE_URL}${siteConfig.logo}`

// ─── Organization + WebSite (root layout) ────────────────────────────────────

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    description:
      'ME byReign — artisan-crafted skincare and luxury home decor rooted in botanical tradition. Handmade with intention.',
    sameAs: [
      'https://www.instagram.com/reign_mebyreign/',
      'https://www.facebook.com/ReignHudson/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${SITE_URL}/contact`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/catalog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Product (product detail page) ───────────────────────────────────────────

interface ProductJsonLdProps {
  product: NormalizedProduct
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  // Strip currency symbol and commas to get raw number
  const priceNum = product.price.replace(/[^0-9.]/g, '')

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.seo?.description || '',
    image: product.images.length > 0 ? product.images : [product.image],
    url: `${SITE_URL}/products/${product.handle}`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.handle}`,
      priceCurrency: 'USD',
      price: priceNum,
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  }

  if (product.sku) {
    data.sku = product.sku
  }

  if (product.reviews && product.reviews.count > 0) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.reviews.rating,
      reviewCount: product.reviews.count,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Article (blog post page) ────────────────────────────────────────────────

interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  author: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  author,
}: ArticleJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${SITE_URL}${url}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── CollectionPage (catalog) ────────────────────────────────────────────────

interface CollectionJsonLdProps {
  name: string
  description: string
  url: string
}

export function CollectionJsonLd({ name, description, url }: CollectionJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
