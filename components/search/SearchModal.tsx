'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MagnifyingGlass, X, ArrowRight } from '@phosphor-icons/react'

export interface SearchResult {
  type: 'product' | 'blog'
  title: string
  description: string
  url: string
  category?: string
  image?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  data: SearchResult[]
}

export function SearchModal({ isOpen, onClose, data }: SearchModalProps) {
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
      data.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q)
      )
    )
  }, [query, data])

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const groups: ('product' | 'blog')[] = ['product', 'blog']
  const groupLabels = { product: 'Products', blog: 'Articles' }

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
