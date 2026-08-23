'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Sparkle } from '@phosphor-icons/react'
import { NormalizedProduct } from '@/lib/shopify/types'

interface SubscriptionCatalogCardProps {
  product: NormalizedProduct
  index: number
}

export function SubscriptionCatalogCard({ product, index }: SubscriptionCatalogCardProps) {
  // Extract selling plan details if available
  const sellingPlanAllocations = product.variants?.[0]?.sellingPlanAllocations || []
  const firstPlan = sellingPlanAllocations[0]
  const planName = firstPlan?.sellingPlan?.name || 'Deliver every 2 months'
  const displayPrice = firstPlan?.price || product.price
  const comparePrice = firstPlan?.compareAtPrice || product.compareAtPrice

  // Customizable options list (e.g. Soap Choice, Body Butter Choice)
  const customizableOptions = product.options.filter(
    (opt) => opt.name !== 'Title' && opt.values[0] !== 'Default Title'
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group flex flex-col bg-white border border-gray-100 p-6 md:p-8 hover:border-[#C5A059]/40 hover:shadow-lg transition-all duration-500"
    >
      {/* Product Image */}
      <Link href={`/products/${product.handle}`} className="block relative aspect-[4/3] overflow-hidden bg-[#faf9f6] mb-6">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          priority={index === 0}
        />
        <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-bold text-[#8c6b2d] flex items-center gap-1.5 shadow-sm">
          <Sparkle size={12} weight="fill" />
          <span>Subscription Plan</span>
        </div>
      </Link>

      {/* Cadence Tag */}
      <p
        className="text-[#C5A059] text-[10px] uppercase tracking-[0.25em] font-bold mb-2"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {planName}
      </p>

      {/* Product Title */}
      <Link href={`/products/${product.handle}`}>
        <h3
          className="text-2xl md:text-3xl text-black font-serif hover:text-[#C5A059] transition-colors leading-snug mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h3>
      </Link>

      {/* Description Snippet */}
      {product.description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>
      )}

      {/* Customizable Options Summary */}
      {customizableOptions.length > 0 && (
        <div className="mb-6 pt-4 border-t border-gray-100">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2.5">
            Customizable Options:
          </p>
          <div className="flex flex-wrap gap-2">
            {customizableOptions.map((opt) => (
              <span
                key={opt.name}
                className="px-2.5 py-1 bg-[#faf7f2] border border-[#C5A059]/30 text-gray-800 text-[11px] font-medium"
              >
                ✓ {opt.name} ({opt.values.length} {opt.values.length === 1 ? 'choice' : 'scents'})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pricing & CTA */}
      <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
            Recurring Price
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-light text-black"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {displayPrice}
            </span>
            {comparePrice && (
              <span className="text-sm text-gray-400 line-through">
                {comparePrice}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/products/${product.handle}`}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-[#C5A059] transition-all duration-300 group/btn"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span>Customize</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
