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
  title: 'ME by Reign — Handmade Skin & Home Decor',
  description:
    'Discover ME by Reign — artisan-crafted skincare and luxury home decor rooted in botanical tradition. Handmade with intention, designed for the modern sanctuary.',
  keywords: ['handmade skincare', 'artisan candles', 'botanical skincare', 'luxury home decor', 'ME by Reign'],
  openGraph: {
    title: 'ME by Reign — Handmade Skin & Home Decor',
    description: 'Artisan-crafted skincare and luxury home decor. Handmade with intention.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ScrollProgressBar />
        <SeasonalBanner />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
