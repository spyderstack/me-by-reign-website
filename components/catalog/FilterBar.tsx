'use client'

import { SortKey } from '@/lib/shopify/types'

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Featured',    value: 'MANUAL'       },
  { label: 'Best Selling', value: 'BEST_SELLING' },
  { label: 'Newest',      value: 'CREATED_AT'   },
  { label: 'Price: Low',  value: 'PRICE_ASC'    },
  { label: 'Price: High', value: 'PRICE_DESC'   },
]

interface FilterBarProps {
  categories: string[]          // All unique product categories
  activeCategory: string | null // Currently selected category, null = All
  activeSort: SortKey
  productCount: number
  onCategoryChange: (category: string | null) => void
  onSortChange: (sort: SortKey) => void
}

export function FilterBar({
  categories,
  activeCategory,
  activeSort,
  productCount,
  onCategoryChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Category Filters */}
      <div className="w-full md:w-auto overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex items-center gap-3 whitespace-nowrap min-w-max pb-1 md:pb-0">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-5 py-2 text-[10px] uppercase tracking-[0.25em] font-bold border transition-all duration-200 ${
              activeCategory === null
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            id="filter-category-all"
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-5 py-2 text-[10px] uppercase tracking-[0.25em] font-bold border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
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
