import { Metadata } from 'next'
import { getAllProducts } from '@/lib/shopify/client'
import { CatalogGrid } from '@/components/catalog/CatalogGrid'
import { HeroSection } from '@/components/catalog/HeroSection'

export const metadata: Metadata = {
  title: 'The Edit — Shop the Collection',
  description: 'Explore the ME byReign collection of artisanal skincare and luxury home essentials. Handcrafted with botanical integrity.',
}

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60

export default async function CatalogPage() {
  const { products } = await getAllProducts({ first: 100 })

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      {/* ── HERO ── */}
      <HeroSection title="Edit" />

      {/* ── INTERACTIVE GRID (Filter/Sort/Grid) ── */}
      <CatalogGrid initialProducts={products} />
    </main>
  )
}
