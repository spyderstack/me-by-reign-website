'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Bag, Check } from '@phosphor-icons/react'
import { NormalizedProduct } from '@/lib/shopify/types'
import { useCart } from '@/components/providers/CartProvider'

interface ProductCardProps {
  product: NormalizedProduct
  index: number
  isInView: boolean
}

export function ProductCard({ product, index, isInView }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    await addItem(product.variantId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
      className="group cursor-pointer"
    >
      {/* Image Container — proper div wrapper so aspect-ratio + next/image fill work */}
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#faf9f6] mb-5">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading={index < 4 ? 'eager' : 'lazy'}
          />

          {/* Tag Badge */}
          {product.tag && (
            <div
              className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-bold text-black z-10 shadow-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {product.tag}
            </div>
          )}

          {/* Sold Out overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
              <span
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600 bg-white/90 px-4 py-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Out of Stock
              </span>
            </div>
          )}

          {/* Gradient on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Quick Add — slides up on hover */}
          {product.available && (
            <button
              className={`absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-4 text-[10px] uppercase tracking-[0.3em] font-bold translate-y-full group-hover:translate-y-0 transition-all duration-300 z-20 ${
                added
                  ? 'bg-[#C5A059] text-white'
                  : 'bg-black text-white hover:bg-[#C5A059]'
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id={`add-to-cart-${product.id}`}
              onClick={handleQuickAdd}
            >
              {added ? (
                <><Check size={16} weight="bold" /> Added!</>
              ) : (
                <><Bag size={16} weight="regular" /> Quick Add</>
              )}
            </button>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <p
        className="text-[#C5A059] text-[9px] uppercase tracking-[0.3em] font-semibold mb-1"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {product.category}
      </p>

      <Link href={`/products/${product.handle}`}>
        <h3
          className="text-lg font-serif text-black hover:text-[#C5A059] transition-colors duration-200 leading-snug mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h3>
      </Link>

      <div className="flex items-baseline gap-2">
        <span
          className="text-gray-900 font-semibold text-sm"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {product.price}
        </span>
        {product.isOnSale && (
          <span
            className="text-gray-400 text-xs line-through font-light"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {product.compareAtPrice}
          </span>
        )}
      </div>
    </motion.div>
  )
}
