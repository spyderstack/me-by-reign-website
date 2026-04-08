'use client'

import Image from 'next/image'
import { useRef, useState, useMemo } from 'react'
import { useInView, motion } from 'motion/react'
import { FilterBar } from '@/components/catalog/FilterBar'
import { ProductCard } from '@/components/catalog/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/shopify/client'
import { NormalizedProduct, SortKey } from '@/lib/shopify/types'

// ─── NOTE FOR SHOPIFY INTEGRATION ────────────────────────────────────────────
// Currently a Client Component using mock data for design.
//
// When Shopify is connected:
//   1. Convert to a Server Component using `await getAllProducts({ first: 24 })`
//   2. Extract interactive parts (filter/sort) into a child 'use client' component
//   3. Use Next.js searchParams for SEO-friendly URLs: /catalog?category=Skincare
// ─────────────────────────────────────────────────────────────────────────────

function sortProducts(products: NormalizedProduct[], sort: SortKey): NormalizedProduct[] {
  const copy = [...products]
  switch (sort) {
    case 'PRICE_ASC':
      return copy.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^0-9.]/g, '')) -
          parseFloat(b.price.replace(/[^0-9.]/g, ''))
      )
    case 'PRICE_DESC':
      return copy.sort(
        (a, b) =>
          parseFloat(b.price.replace(/[^0-9.]/g, '')) -
          parseFloat(a.price.replace(/[^0-9.]/g, ''))
      )
    case 'BEST_SELLING':
      return copy.sort((a) => (a.tag === 'Best Seller' ? -1 : 1))
    case 'CREATED_AT':
      return copy.reverse()
    default:
      return copy
  }
}

export default function CatalogPage() {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const isHeroVisible = useInView(heroRef, { once: true })
  const isGridVisible = useInView(gridRef, { once: true, margin: '-60px' })

  // TODO: replace with server-fetched Shopify data
  const allProducts = MOCK_PRODUCTS

  const categories = useMemo(() => {
    const seen = new Set<string>()
    allProducts.forEach((p) => { if (p.category) seen.add(p.category) })
    return Array.from(seen).sort()
  }, [allProducts])

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSort, setActiveSort] = useState<SortKey>('MANUAL')

  const filteredProducts = useMemo(() => {
    const base = activeCategory
      ? allProducts.filter((p) => p.category === activeCategory)
      : allProducts
    return sortProducts(base, activeSort)
  }, [allProducts, activeCategory, activeSort])

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">

      {/* ────────────────────────────────────────────────────────────────────
          HERO — full-bleed behind the transparent fixed navbar.
          paddingTop pushes the text content below navbar + seasonal banner.
      ──────────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: '75vh' }}
      >

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/golden_background.jpg"
            alt="ME by Reign — The Edit"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Layered overlay: dark at top (navbar legibility) → dark at bottom (text legibility) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
        </div>

        {/* Hero text — flush bottom, starts below navbar */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: 'calc(var(--banner-height, 0px) + 120px)', paddingBottom: '4rem' }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-10 h-px bg-[#C5A059]" />
            <span
              className="text-[#C5A059] text-[10px] uppercase tracking-[0.45em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ME by Reign
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={isHeroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="text-white leading-[1.0] mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
            }}
          >
            The{' '}
            <em className="font-light not-italic" style={{ fontStyle: 'italic' }}>
              Edit
            </em>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="text-sm md:text-base leading-relaxed font-light max-w-lg"
            style={{ fontFamily: "'Montserrat', sans-serif", color: 'rgba(255,255,255,0.85)' }}
          >
            Artisan-crafted skincare and luxury home essentials — chosen for their
            craftsmanship, botanical integrity, and the ritual they inspire.
          </motion.p>
        </div>

        {/* Bottom gold divider */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent z-10" />
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          FILTER BAR — sticky below the fixed navbar
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className="sticky z-40 bg-white border-b border-gray-100 shadow-sm"
        style={{ top: 'calc(var(--banner-height, 0px) + 80px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            activeSort={activeSort}
            productCount={filteredProducts.length}
            onCategoryChange={setActiveCategory}
            onSortChange={setActiveSort}
          />
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          PRODUCT GRID
      ──────────────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-100 pb-32 md:pb-100"
          style={{ paddingBottom: '4rem' }}
        >

          <div ref={gridRef}>
            {filteredProducts.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isInView={isGridVisible}
                  />
                ))}
              </div>

            ) : (

              /* Empty state */
              <div className="flex flex-col items-center justify-center py-40 text-center">
                <div className="w-16 h-px bg-[#C5A059]/40 mb-8" />
                <p
                  className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Nothing here yet
                </p>
                <h2
                  className="text-4xl font-serif text-black mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  No Products Found
                </h2>
                <p
                  className="text-gray-400 text-sm max-w-xs mb-10 leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Try a different category or browse the full collection.
                </p>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="px-10 py-3.5 border border-black text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-black hover:text-white transition-all duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  View All
                </button>
              </div>

            )}
          </div>

          {/* TODO: Load More pagination — uncomment when Shopify is connected */}
          {/* {hasNextPage && (
            <div className="flex justify-center mt-20">
              <button
                onClick={loadMore}
                className="px-12 py-4 border border-black text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-black hover:text-white transition-all duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Load More
              </button>
            </div>
          )} */}

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          TRUST STRIP
      ──────────────────────────────────────────────────────────────────── */}
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

    </main >
  )
}
