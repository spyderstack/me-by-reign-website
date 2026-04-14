import { Metadata } from 'next'
import { getAllProducts } from '@/lib/shopify/client'
import { CatalogGrid } from '@/components/catalog/CatalogGrid'
import { HeroSection } from '@/components/catalog/HeroSection'

export const metadata: Metadata = {
  title: 'The Edit — Shop the Collection',
  description: 'Explore the ME by Reign collection of artisanal skincare and luxury home essentials. Handcrafted with botanical integrity.',
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
