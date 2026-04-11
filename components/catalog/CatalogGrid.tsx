'use client'

import { useRef, useState, useMemo } from 'react'
import { useInView } from 'motion/react'
import { FilterBar } from './FilterBar'
import { ProductCard } from './ProductCard'
import { NormalizedProduct, SortKey } from '@/lib/shopify/types'

interface CatalogGridProps {
  initialProducts: NormalizedProduct[]
  title?: string
}

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

export function CatalogGrid({ initialProducts }: CatalogGridProps) {
  const gridRef = useRef(null)
  const isGridVisible = useInView(gridRef, { once: true, margin: '-60px' })

  const categories = useMemo(() => {
    const seen = new Set<string>()
    initialProducts.forEach((p) => { 
      if (p.category) seen.add(p.category) 
    })
    return Array.from(seen).sort()
  }, [initialProducts])

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSort, setActiveSort] = useState<SortKey>('MANUAL')

  const filteredProducts = useMemo(() => {
    let base = activeCategory
      ? initialProducts.filter((p) => p.category === activeCategory)
      : initialProducts
    return sortProducts(base, activeSort)
  }, [initialProducts, activeCategory, activeSort])

  return (
    <>
      {/* ── Filter Bar ── */}
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

      {/* ── Product Grid ── */}
      <section className="bg-white">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-100 pb-32 md:pb-100"
          style={{ paddingTop: 'calc(var(--banner-height, 0px) + 50px)', paddingBottom: '4rem' }}
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
        </div>
      </section>
    </>
  )
}
