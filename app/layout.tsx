import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/site-config'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
})

const fullTitle = `${siteConfig.name} — ${siteConfig.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: fullTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: fullTitle,
    description:
      'Artisan-crafted botanical skincare, handmade candles, and luxury home décor. All-natural, handmade with intention.',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: fullTitle,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: fullTitle,
    description:
      'Artisan-crafted botanical skincare, handmade candles, and luxury home décor. Handmade with intention.',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import { CartProvider } from '@/components/providers/CartProvider'
import { getAllProducts, getAllArticles, getShopSettings } from '@/lib/shopify/client'
import { SearchResult } from '@/components/search/SearchModal'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch real data for global search and footer policies
  // Using Promise.all so they run concurrently
  const [{ products }, { articles }, shop] = await Promise.all([
    getAllProducts({ first: 25 }),
    getAllArticles({ first: 25 }),
    getShopSettings()
  ])

  // Map to unified search results format
  const searchData: SearchResult[] = [
    ...products.map((p) => ({
      type: 'product' as const,
      title: p.name,
      description: p.description || '',
      url: `/products/${p.handle}`,
      category: p.category || 'Product',
      image: p.image,
    })),
    ...articles.map((a) => ({
      type: 'blog' as const,
      title: a.title,
      // Provide a pure text excerpt. We fall back to removing simple HTML if needed,
      // but excerptHtml should be plain enough or we can use substring of contentHtml.
      description: a.excerptHtml?.replace(/<[^>]+>/g, '') || 'Read this article in our journal.',
      url: `/blog/${a.slug}`,
      category: a.category,
      image: a.image,
    }))
  ]

  const policies = {
    privacyPolicy: shop.privacyPolicy,
    termsOfService: shop.termsOfService,
  }

  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <CartProvider>
          <ScrollProgressBar />
          <Navbar searchData={searchData} />
          {children}
          <Footer policies={policies} />
        </CartProvider>
      </body>
    </html>
  )
}
