'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { SortKey } from '@/lib/shopify/types'
import { CATALOG_CATEGORIES } from '@/lib/categories'

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Featured',    value: 'MANUAL'       },
  { label: 'Best Selling', value: 'BEST_SELLING' },
  { label: 'Newest',      value: 'CREATED_AT'   },
  { label: 'Price: Low',  value: 'PRICE_ASC'    },
  { label: 'Price: High', value: 'PRICE_DESC'   },
]

interface FilterBarProps {
  activeCategorySlug?: string | null
  activeSort: SortKey
  productCount: number
  onSortChange: (sort: SortKey) => void
}

export function FilterBar({
  activeCategorySlug = null,
  activeSort,
  productCount,
  onSortChange,
}: FilterBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    // 4px tolerance buffer for sub-pixel rendering
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4)
  }, [])

  useEffect(() => {
    checkScroll()
    const rafId = requestAnimationFrame(checkScroll)
    const timer = setTimeout(checkScroll, 100)

    window.addEventListener('resize', checkScroll)
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    el.scrollTo({
      left: direction === 'right' ? maxScroll : 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Category Filters Container with Scroll Indicator Arrows */}
      <div className="relative w-[calc(100%+2rem)] md:w-auto -mx-4 px-4 md:mx-0 md:px-0">
        {/* Left Arrow with soft gradient fade */}
        <div
          className={`absolute left-0 top-0 h-9 z-10 flex items-center pl-3 pr-7 bg-gradient-to-r from-white via-white/95 to-transparent transition-opacity duration-200 md:hidden ${
            canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Scroll categories left"
            className="flex items-center justify-center text-black hover:text-[#C5A059] active:scale-90 transition-all cursor-pointer"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
          </button>
        </div>

        {/* Right Arrow with soft gradient fade */}
        <div
          className={`absolute right-0 top-0 h-9 z-10 flex items-center pr-3 pl-7 bg-gradient-to-l from-white via-white/95 to-transparent transition-opacity duration-200 md:hidden ${
            canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Scroll categories right"
            className="flex items-center justify-center text-black hover:text-[#C5A059] active:scale-90 transition-all cursor-pointer"
          >
            <ArrowRight weight="bold" className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Rail */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex items-center h-9 gap-2.5 sm:gap-3 whitespace-nowrap min-w-max">
            <Link
              href="/catalog"
              scroll={false}
              className={`h-9 flex items-center justify-center px-5 text-[10px] uppercase tracking-[0.25em] font-bold border transition-all duration-200 flex-shrink-0 leading-none ${
                !activeCategorySlug
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="filter-category-all"
            >
              All
            </Link>

            {CATALOG_CATEGORIES.map((cat) => {
              const isSelected =
                Boolean(activeCategorySlug && (
                  activeCategorySlug.toLowerCase() === cat.slug.toLowerCase() ||
                  cat.aliases.includes(activeCategorySlug.toLowerCase())
                ))

              return (
                <Link
                  key={cat.slug}
                  href={`/catalog/${cat.slug}`}
                  scroll={false}
                  className={`h-9 flex items-center justify-center px-5 text-[10px] uppercase tracking-[0.25em] font-bold border transition-all duration-200 flex-shrink-0 leading-none ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id={`filter-category-${cat.slug}`}
                >
                  {cat.title}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right side: count + sort */}
      <div className="flex items-center gap-8">
        <p
          className="text-gray-300 text-[10px] uppercase tracking-[0.25em] whitespace-nowrap hidden sm:block"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {productCount} {productCount === 1 ? 'Product' : 'Products'}
        </p>

        {/* Sort Dropdown */}
        <div className="relative group">
          <label htmlFor="sort-select" className="sr-only">Sort by</label>
          <select
            id="sort-select"
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="appearance-none bg-transparent border-0 text-[10px] uppercase tracking-[0.3em] font-bold text-black border-b border-transparent hover:border-[#C5A059] pr-8 py-2 cursor-pointer focus:outline-none focus:border-black transition-all"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
