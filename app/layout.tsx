import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SeasonalBanner } from '@/components/home/SeasonalBanner'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://me-by-reign.com'), // Replace with actual production URL
  icons: {
    icon: '/images/reign_logo.png',
    apple: '/images/reign_logo.png',
  },
  title: {
    default: 'ME byReign — Handmade Skin & Home Decor',
    template: '%s | ME byReign',
  },
  description:
    'Discover ME byReign — artisan-crafted skincare and luxury home decor rooted in botanical tradition. Handmade with intention, designed for the modern sanctuary.',
  keywords: ['handmade skincare', 'artisan candles', 'botanical skincare', 'luxury home decor', 'ME byReign', 'Atlanta artisan'],
  authors: [{ name: 'ME byReign' }],
  creator: 'ME byReign',
  publisher: 'ME byReign',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ME byReign — Handmade Skin & Home Decor',
    description: 'Artisan-crafted skincare and luxury home decor. Handmade with intention.',
    url: 'https://me-by-reign.com',
    siteName: 'ME byReign',
    images: [
      {
        url: '/images/og-image.jpg', // Ensure this asset exists or use a fallback
        width: 1200,
        height: 630,
        alt: 'ME byReign — Luxury Living',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ME byReign — Handmade Skin & Home Decor',
    description: 'Artisan-crafted skincare and luxury home decor. Handmade with intention.',
    images: ['/images/og-image.jpg'],
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
import { getAllProducts, getAllArticles } from '@/lib/shopify/client'
import { SearchResult } from '@/components/search/SearchModal'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch real data for global search
  // Using Promise.all so they run concurrently
  const [{ products }, { articles }] = await Promise.all([
    getAllProducts({ first: 25 }),
    getAllArticles({ first: 25 })
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

  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <CartProvider>
          <ScrollProgressBar />
          <SeasonalBanner />
          <Navbar searchData={searchData} />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
