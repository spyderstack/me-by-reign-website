import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollectionProducts } from '@/lib/shopify/client'
import { CatalogGrid } from '@/components/catalog/CatalogGrid'
import { HeroSection } from '@/components/catalog/HeroSection'

export const revalidate = 60

// PRODUCTION NOTE: Use generateStaticParams to pre-build collection pages at build time.
// This significantly improves performance for larger catalogs.
// export async function generateStaticParams() {
//   const collections = await getAllCollections()
//   return collections.map((c) => ({ handle: c.handle }))
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { title } = await getCollectionProducts({ handle: resolvedParams.handle })

  return {
    title: `${title} — Shop the Collection`,
    description: `Explore our ${title} collection. Handcrafted botanical skincare and luxury home essentials from ME byReign.`,
  }
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const resolvedParams = await params;
  const { products, title } = await getCollectionProducts({
    handle: resolvedParams.handle,
    first: 100
  })

  // If collection not found or empty, we can choose to 404 or show empty state
  // Here we'll 404 if the collection doesn't exist
  if (!products || (products.length === 0 && title === resolvedParams.handle)) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      {/* ── HERO ── */}
      <HeroSection title={title} />

      {/* ── INTERACTIVE GRID ── */}
      <CatalogGrid initialProducts={products} title={title} />
    </main>
  )
}