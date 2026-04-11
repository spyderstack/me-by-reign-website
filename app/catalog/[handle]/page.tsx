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
    description: `Explore our ${title} collection. Handcrafted botanical skincare and luxury home essentials from ME by Reign.`,
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

      {/* ── TRUST STRIP ── */}
      <section className="bg-[#faf9f6] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {[
              'Ships within 2–5 business days',
              'Complimentary gift wrapping',
              'Free returns within 30 days',
            ].map((text, i) => (
              <div key={text} className="flex items-center">
                {i > 0 && (
                  <div className="hidden md:block w-px h-10 bg-[#C5A059]/25 mx-12" />
                )}
                <p
                  className="text-gray-400 text-[10px] uppercase tracking-[0.3em] text-center"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}