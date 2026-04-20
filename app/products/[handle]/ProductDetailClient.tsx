'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Check, Plus, Star } from '@phosphor-icons/react'
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
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // Fallback to rich mock data for descriptions/ingredients if available
  const richDetail = getMockDetail(product.handle)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await addItem(product.variantId, 1)
    setIsAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Related products logic (using real Shopify recommendations)
  const related = relatedProducts.slice(0, 3)

  const images = product.images.length > 0 ? product.images : [product.image]
  const description = product.description || richDetail?.fullDescription || 'No description available.'
  const size = richDetail?.size || 'Standard'
  const ingredients = richDetail?.ingredients || []
  const benefits = richDetail?.benefits || []
  const howToUse = richDetail?.howToUse || ''

  return (
    <div className="min-h-screen bg-white">

      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-[#2a2010] to-transparent pointer-events-none z-0" />

      {/* ── Breadcrumb ── */}
      <div 
        className="border-b border-gray-100 bg-white relative z-10"
        style={{ paddingTop: 'calc(var(--banner-height, 0px) + 80px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
            id="product-back-link"
          >
            <ArrowLeft size={16} weight="regular" />
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

            {/* Left — Image Gallery */}
            <div>
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="aspect-[3/4] bg-[#faf9f6] overflow-hidden mb-4"
              >
                <img
                  src={images[selectedImage]}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square overflow-hidden bg-[#faf9f6] border-2 transition-all ${selectedImage === i
                          ? 'border-black'
                          : 'border-transparent hover:border-gray-200'
                        }`}
                      id={`product-image-thumb-${i}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right — Product Info */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-5">
                <span className="w-8 h-px bg-[#C5A059]" />
                <p
                  className="text-[#C5A059] text-[9px] uppercase tracking-[0.35em] font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.category}
                </p>
              </div>

              {/* Name */}
              <h1
                className="text-4xl md:text-5xl leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h1>

              {/* Stars (decorative) */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} weight="fill" className="text-[#C5A059]" />
                ))}
                <span
                  className="text-xs text-gray-400 ml-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  4.9 (214 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <p
                  className="text-3xl"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.price}
                </p>
                {product.compareAtPrice && (
                  <p
                    className="text-xl text-gray-400 line-through"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {product.compareAtPrice}
                  </p>
                )}
              </div>

              {/* Full Description */}
              <p
                className="text-gray-600 text-base leading-relaxed mb-8 pb-8 border-b border-gray-100"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {description}
              </p>

              {/* Size */}
              <div className="mb-8">
                <p
                  className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1 font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  SKU / Size
                </p>
                <p
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {size}
                </p>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.available || isAdding}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 uppercase tracking-widest text-xs font-bold transition-all duration-300 mb-3 ${!product.available || isAdding
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : added
                      ? 'bg-[#C5A059] text-white'
                      : 'bg-black text-white hover:bg-[#C5A059]'
                  }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id="product-add-to-cart-btn"
              >
                {!product.available ? (
                  'Out of Stock'
                ) : isAdding ? (
                  'Adding...'
                ) : added ? (
                  <><Check size={18} weight="bold" /> Added to Cart</>
                ) : (
                  <><Plus size={18} weight="regular" /> Add to Cart</>
                )}
              </button>

              <p
                className="text-xs text-gray-400 text-center mb-10"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Free shipping on orders over $100 · Returns within 30 days
              </p>

              {/* Ingredients */}
              {ingredients.length > 0 && (
                <div className="mb-8 pb-8 border-b border-gray-100">
                  <h2
                    className="text-xl mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Key Ingredients
                  </h2>
                  <ul className="space-y-2">
                    {ingredients.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600 text-sm"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <div className="mb-8 pb-8 border-b border-gray-100">
                  <h2
                    className="text-xl mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Benefits
                  </h2>
                  <ul className="space-y-2">
                    {benefits.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600 text-sm"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How to Use */}
              {howToUse && (
                <div>
                  <h2
                    className="text-xl mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    How to Use
                  </h2>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {howToUse}
                  </p>
                </div>
              )}
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
              <p
                className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
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
                  <div className="aspect-[3/4] overflow-hidden bg-white mb-5">
                    <img
                      src={rel.image}
                      alt={rel.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p
                    className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {rel.category}
                  </p>
                  <h3
                    className="text-lg group-hover:text-[#C5A059] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {rel.name}
                  </h3>
                  <p
                    className="text-gray-700 text-sm mt-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
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
