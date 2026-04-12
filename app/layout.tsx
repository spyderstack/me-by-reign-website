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
  title: {
    default: 'ME by Reign — Handmade Skin & Home Decor',
    template: '%s | ME by Reign',
  },
  description:
    'Discover ME by Reign — artisan-crafted skincare and luxury home decor rooted in botanical tradition. Handmade with intention, designed for the modern sanctuary.',
  keywords: ['handmade skincare', 'artisan candles', 'botanical skincare', 'luxury home decor', 'ME by Reign', 'Atlanta artisan'],
  authors: [{ name: 'ME by Reign' }],
  creator: 'ME by Reign',
  publisher: 'ME by Reign',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ME by Reign — Handmade Skin & Home Decor',
    description: 'Artisan-crafted skincare and luxury home decor. Handmade with intention.',
    url: 'https://me-by-reign.com',
    siteName: 'ME by Reign',
    images: [
      {
        url: '/images/og-image.jpg', // Ensure this asset exists or use a fallback
        width: 1200,
        height: 630,
        alt: 'ME by Reign — Luxury Living',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ME by Reign — Handmade Skin & Home Decor',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <CartProvider>
          <ScrollProgressBar />
          <SeasonalBanner />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
