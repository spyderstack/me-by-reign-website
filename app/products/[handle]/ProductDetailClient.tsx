'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Check, Plus, Minus, Star, ShareNetwork, CaretRight, ChatTeardropText } from '@phosphor-icons/react'
import { getProductByHandle as getMockDetail } from '@/lib/products-data'
import { NormalizedProduct } from '@/lib/shopify/types'
import { useCart } from '@/components/providers/CartProvider'

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: NormalizedProduct
  relatedProducts: NormalizedProduct[]
}) {
  const { addItem } = useCart()
  const [selectedMedia, setSelectedMedia] = useState(0)
  const [added, setAdded] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'info' | 'shipping' | 'product-reviews' | 'store-reviews'>('info')

  // Variant Selection State
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initialOptions: Record<string, string> = {}
    product.options.forEach(option => {
      initialOptions[option.name] = option.values[0]
    })
    return initialOptions
  })

  // Find the matching variant based on selected options
  const selectedVariant = useMemo(() => {
    return product.variants.find(variant =>
      variant.selectedOptions.every(
        option => selectedOptions[option.name] === option.value
      )
    ) || product.variants[0]
  }, [product.variants, selectedOptions])

  // Fallback to rich mock data for descriptions/ingredients if available
  const richDetail = getMockDetail(product.handle)

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    setIsAdding(true)
    await addItem(selectedVariant.id, quantity)
    setIsAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const related = relatedProducts.slice(0, 3)
  const ingredients = richDetail?.ingredients || []
  const benefits = richDetail?.benefits || []
  const howToUse = richDetail?.howToUse || ''

  // Format description for better spacing
  const formattedDescription = product.descriptionHtml || product.description.split('\n\n').map((para, i) => (
    <p key={i} className="mb-4">{para}</p>
  ))

  return (
    <div className="min-h-screen bg-white">
      {/* ── Spacer for Nav ── */}
      <div
        className="bg-[#111] w-full"
        style={{ height: 'calc(var(--banner-height, 0px) + 80px)' }}
      />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-[#2a2010] to-transparent pointer-events-none z-0" />
      
      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
            id="product-back-link"
          >
            <ArrowLeft size={16} weight="regular" className="group-hover:-translate-x-1 transition-transform" />
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Back to Catalog
            </span>
          </Link>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — Media Gallery */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative aspect-[3/4] bg-[#faf9f6] overflow-hidden mb-4 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMedia}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="w-full h-full"
                  >
                    {product.media[selectedMedia]?.type === 'VIDEO' || product.media[selectedMedia]?.type === 'EXTERNAL_VIDEO' ? (
                      <video
                        src={product.media[selectedMedia].url}
                        poster={product.media[selectedMedia].previewImage}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={product.media[selectedMedia]?.url || product.image}
                        alt={product.media[selectedMedia]?.alt || product.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                
                <button 
                  onClick={handleShare}
                  className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 z-20"
                >
                  <ShareNetwork size={20} weight="regular" />
                </button>
              </div>

              {product.media.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.media.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedMedia(i)}
                      className={`relative aspect-square overflow-hidden bg-[#faf9f6] border-2 transition-all duration-300 ${
                        selectedMedia === i ? 'border-black scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.previewImage || item.url}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {(item.type === 'VIDEO' || item.type === 'EXTERNAL_VIDEO') && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                            <Plus size={12} weight="fill" className="rotate-45" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right — Product Info */}
            <div className="flex flex-col">
              {/* Category */}
              <div className="flex items-center gap-4 mb-5">
                <span className="w-8 h-px bg-[#C5A059]" />
                <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-bold">
                  {product.category}
                </p>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl leading-tight mb-4 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.name}
              </h1>


              <div className="flex items-end gap-4 mb-10">
                <p className="text-3xl font-light text-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {selectedVariant?.price || product.price}
                </p>
                {selectedVariant?.isOnSale && (
                  <p className="text-xl text-gray-300 line-through mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {selectedVariant.compareAtPrice}
                  </p>
                )}
                {selectedVariant?.isOnSale && (
                  <span className="mb-2 px-2 py-0.5 bg-black text-white text-[8px] uppercase tracking-widest font-bold">
                    Special Offer
                  </span>
                )}
              </div>

              {/* Variant Selectors */}
              <div className="space-y-8 mb-10">
                {product.options
                  .filter(option => option.name !== 'Title' || option.values[0] !== 'Default Title')
                  .map((option) => (
                    <div key={option.name}>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold">
                          Select {option.name}
                        </p>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {selectedOptions[option.name]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {option.values.map((value) => (
                          <button
                            key={value}
                            onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                            className={`px-6 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border ${
                              selectedOptions[option.name] === value
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-3">
                  Quantity
                </p>
                <div className="flex items-center w-fit border border-gray-100 bg-white shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-black"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} weight="bold" />
                  </button>
                  <div className="w-12 h-12 flex items-center justify-center border-x border-gray-100 text-sm font-medium">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-black"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Action Area */}
              <div className="space-y-4 mb-12">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.available || isAdding}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-5 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 relative overflow-hidden group ${
                    !selectedVariant?.available || isAdding
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : added
                        ? 'bg-[#C5A059] text-white'
                        : 'bg-black text-white hover:bg-[#C5A059]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {!selectedVariant?.available ? (
                      <motion.span key="soldout" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                        Out of Stock
                      </motion.span>
                    ) : isAdding ? (
                      <motion.span key="adding" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                        Adding to Cart...
                      </motion.span>
                    ) : added ? (
                      <motion.div key="added" className="flex items-center gap-2" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                        <Check size={18} weight="bold" /> Product Added
                      </motion.div>
                    ) : (
                      <motion.div key="add" className="flex items-center gap-2" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                        <Plus size={18} weight="regular" /> Add to Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Tabs Section */}
              <div className="border-t border-gray-100 pt-10">
                <div className="flex flex-wrap gap-8 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'info', label: 'Product Info' },
                    { id: 'shipping', label: 'Shipping & Returns' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`pb-4 text-[10px] uppercase tracking-[0.25em] font-bold transition-all relative whitespace-nowrap ${
                        activeTab === tab.id ? 'text-black' : 'text-gray-300 hover:text-gray-500'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[200px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'info' && (
                      <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                      >
                        <div className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {typeof formattedDescription === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: formattedDescription }} />
                          ) : (
                            formattedDescription
                          )}
                        </div>
                        
                        {ingredients.length > 0 && (
                          <div className="bg-[#faf9f6] p-6">
                            <h3 className="text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                              <span className="w-4 h-px bg-black" /> Key Ingredients
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {ingredients.map((ing, i) => (
                                <div key={i} className="flex items-center gap-3 text-[11px] text-gray-500">
                                  <div className="w-1 h-1 rounded-full bg-[#C5A059]" />
                                  {ing}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === 'shipping' && (
                      <motion.div
                        key="shipping"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                      >
                        <ChatTeardropText size={40} weight="thin" className="text-[#C5A059] mb-4" />
                        <h3 className="text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Questions about shipping?</h3>
                        <p className="text-gray-500 text-sm mb-6 max-w-sm">
                          Our team is here to assist with any delivery or return inquiries.
                        </p>
                        <Link 
                          href="/contact"
                          className="px-8 py-3 bg-black text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-colors"
                        >
                          Contact Us!
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="py-24 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-10 h-px bg-[#C5A059]" />
              <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-bold">
                You May Also Like
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map((rel) => (
                <Link
                  key={rel.handle}
                  href={`/products/${rel.handle}`}
                  className="group"
                  id={`related-${rel.handle}`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-white mb-5 relative">
                    <img
                      src={rel.image}
                      alt={rel.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-2">
                    {rel.category}
                  </p>
                  <h3 className="text-xl group-hover:text-[#C5A059] transition-colors mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {rel.name}
                  </h3>
                  <p className="text-black text-sm font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {rel.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
