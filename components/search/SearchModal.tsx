'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MagnifyingGlass, X, ArrowRight } from '@phosphor-icons/react'

interface SearchResult {
  type: 'product' | 'blog' | 'page'
  title: string
  description: string
  url: string
  category?: string
  image?: string
}

const SEARCH_DATA: SearchResult[] = [
  // ── Products ────────────────────────────────────────────────────────────────
  {
    type: 'product',
    title: 'Golden Elixir Serum',
    description: 'Our signature botanical face serum — a radiance ritual in a bottle.',
    url: '/products/golden-elixir-serum',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1768483018807-bd0b9ab86539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'product',
    title: 'Oat & Honey Artisanal Soap',
    description: 'A gentle cold-process soap bar that cleanses without stripping.',
    url: '/products/oat-honey-soap',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'product',
    title: 'Noir Fig & Amber Candle',
    description: 'A deep, complex fragrance for your most intentional space.',
    url: '/products/noir-fig-amber-candle',
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1603905485372-c8e96a3a4aaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'product',
    title: 'Minimalist Sculptural Vase',
    description: 'Hand-thrown stoneware — each piece is one of a kind.',
    url: '/products/minimalist-sculptural-vase',
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1772442364571-c340bcc2efc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'product',
    title: 'Velvet Rose Body Oil',
    description: 'A silky, fast-absorbing body oil with a true rose botanical heart.',
    url: '/products/velvet-rose-body-oil',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1573575155376-b5010099301b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'product',
    title: 'Linen Cloud Pillowcase Set',
    description: 'European flax linen — breathable, temperature-regulating, effortlessly beautiful.',
    url: '/products/linen-cloud-pillowcase',
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'product',
    title: 'Obsidian Face Roller',
    description: 'Volcanic obsidian, hand-polished. A tool and a ritual object.',
    url: '/products/obsidian-face-roller',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'product',
    title: 'Cedar & Sage Room Mist',
    description: 'A single spritz that transforms a room into a sanctuary.',
    url: '/products/cedar-sage-room-mist',
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },

  // ── Blog Posts ──────────────────────────────────────────────────────────────
  {
    type: 'blog',
    title: 'The Ancient Art of Botanical Skincare',
    description: 'Exploring time-honored traditions from Mediterranean herbalists',
    url: '/blog/ancient-art-of-botanical-skincare',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1763742259246-80eb61e760d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'blog',
    title: 'Creating a Mindful Morning Ritual',
    description: 'Transform your skincare routine into a grounding practice',
    url: '/blog/mindful-morning-ritual',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'blog',
    title: 'The Power of Rose in Natural Beauty',
    description: 'Why rose has been treasured for centuries',
    url: '/blog/power-of-rose-in-natural-beauty',
    category: 'Ingredients',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'blog',
    title: 'Bringing Spa Energy Into Your Home',
    description: 'Simple ways to create a sanctuary atmosphere',
    url: '/blog/spa-energy-into-your-home',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'blog',
    title: 'Understanding Clean Beauty',
    description: "What 'clean' really means and why it matters",
    url: '/blog/understanding-clean-beauty',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    type: 'blog',
    title: 'Seasonal Skincare: Spring Edition',
    description: 'Adjusting your routine as the seasons change',
    url: '/blog/seasonal-skincare-spring-edition',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },

  // ── Pages ───────────────────────────────────────────────────────────────────
  { type: 'page', title: 'Our Story', description: 'Learn about our journey and philosophy', url: '/our-story' },
  { type: 'page', title: 'Catalog', description: 'Browse our handcrafted collection', url: '/catalog' },
  { type: 'page', title: 'The Blog', description: 'Read our journal on botanical beauty and wellness', url: '/blog' },
  { type: 'page', title: 'Contact', description: 'Get in touch with our studio', url: '/contact' },
  { type: 'page', title: 'Shopping Cart', description: 'View your cart and checkout', url: '/cart' },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus + body lock
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // Filter on query change
  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(
      SEARCH_DATA.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q)
      )
    )
  }, [query])

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const groups: ('product' | 'blog' | 'page')[] = ['product', 'blog', 'page']
  const groupLabels = { product: 'Products', blog: 'Articles', page: 'Pages' }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[200] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, scale: 0.97, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl z-[201] px-4"
          >
            <div className="bg-white shadow-2xl" style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>

              {/* Input */}
              <div className="border-b border-gray-100 px-6 py-5 flex items-center gap-4 flex-shrink-0">
                <MagnifyingGlass size={22} weight="regular" className="text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products, articles, pages…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-lg focus:outline-none text-gray-900"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id="search-input"
                />
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-black transition-colors flex-shrink-0"
                  aria-label="Close search"
                >
                  <X size={22} weight="regular" />
                </button>
              </div>

              {/* Results / Empty States */}
              <div className="overflow-y-auto flex-1">

                {/* No results */}
                {query && results.length === 0 && (
                  <div className="py-16 text-center">
                    <p
                      className="text-gray-400"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  </div>
                )}

                {/* Results grouped by type */}
                {results.length > 0 && (
                  <div className="p-4">
                    {groups.map((type) => {
                      const typeResults = results.filter((r) => r.type === type)
                      if (!typeResults.length) return null
                      return (
                        <div key={type} className="mb-6">
                          <p
                            className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-3 px-3"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {groupLabels[type]}
                          </p>
                          <div className="space-y-1">
                            {typeResults.map((result, i) => (
                              <Link
                                key={i}
                                href={result.url}
                                onClick={onClose}
                                className="flex items-center gap-4 px-3 py-3 hover:bg-[#faf9f6] transition-colors group rounded-sm"
                              >
                                {result.image ? (
                                  <div className="w-14 h-14 flex-shrink-0 bg-gray-100 overflow-hidden">
                                    <img
                                      src={result.image}
                                      alt={result.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-14 h-14 flex-shrink-0 bg-[#faf9f6] flex items-center justify-center">
                                    <MagnifyingGlass size={20} className="text-gray-300" />
                                  </div>
                                )}

                                <div className="flex-1 min-w-0">
                                  <p
                                    className="text-gray-900 truncate group-hover:text-[#C5A059] transition-colors"
                                    style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem' }}
                                  >
                                    {result.title}
                                  </p>
                                  <p
                                    className="text-sm text-gray-500 truncate mt-0.5"
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                                  >
                                    {result.description}
                                  </p>
                                  {result.category && (
                                    <p
                                      className="text-[10px] text-[#C5A059] uppercase tracking-widest mt-1"
                                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                                    >
                                      {result.category}
                                    </p>
                                  )}
                                </div>

                                <ArrowRight
                                  size={16}
                                  className="text-gray-300 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all flex-shrink-0"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Idle state */}
                {!query && (
                  <div className="py-16 text-center">
                    <MagnifyingGlass size={48} className="text-gray-200 mx-auto mb-5" />
                    <p
                      className="text-gray-400 text-sm"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Search products, articles, and pages
                    </p>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
