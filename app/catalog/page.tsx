import { Metadata } from 'next'
import { getAllProducts } from '@/lib/shopify/client'
import { CatalogGrid } from '@/components/catalog/CatalogGrid'
import { HeroSection } from '@/components/catalog/HeroSection'
import { CollectionJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Shop the Collection — Skincare & Home Décor',
  description:
    'Explore the ME byReign collection of artisan skincare, handmade candles, body butters, and luxury home décor. All-natural, handcrafted with botanical integrity.',
  openGraph: {
    title: 'Shop the Collection — ME byReign',
    description:
      'Explore artisan skincare, handmade candles, and luxury home décor from ME byReign.',
    url: '/catalog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop the Collection — ME byReign',
    description:
      'Explore artisan skincare, handmade candles, and luxury home décor from ME byReign.',
  },
  alternates: {
    canonical: '/catalog',
  },
}

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60

export default async function CatalogPage() {
  const { products } = await getAllProducts({ first: 100 })

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <CollectionJsonLd
        name="Shop the Collection"
        description="Explore the ME byReign collection of artisan skincare, handmade candles, body butters, and luxury home décor."
        url="/catalog"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Catalog', href: '/catalog' },
        ]}
      />

      {/* ── HERO ── */}
      <HeroSection title="Collection" />

      {/* ── INTERACTIVE GRID (Filter/Sort/Grid) ── */}
      <CatalogGrid initialProducts={products} />
    </main>
  )
}
