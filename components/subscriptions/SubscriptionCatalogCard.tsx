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
      className="group flex flex-col bg-white border border-[#E2DDD5] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(197,160,89,0.18)] hover:border-[#C5A059] p-7 md:p-9 transition-all duration-500 relative overflow-hidden"
    >
      {/* Top Gold Accent Bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#C5A059]/30 via-[#C5A059] to-[#C5A059]/30 opacity-75 group-hover:opacity-100 transition-opacity" />

      {/* Product Image */}
      <Link href={`/products/${product.handle}`} className="block relative aspect-[4/3] overflow-hidden bg-[#faf9f6] mb-6 border border-[#ECE7DF]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          priority={index === 0}
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#C5A059]/40 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.25em] font-bold text-[#8c6b2d] flex items-center gap-1.5 shadow-sm">
          <Sparkle size={12} weight="fill" className="text-[#C5A059]" />
          <span>Subscription Plan</span>
        </div>
      </Link>

      {/* Cadence Tag */}
      <div className="mb-3">
        <span
          className="inline-block px-2.5 py-1 bg-[#FAF7F2] border border-[#C5A059]/30 text-[#8c6b2d] text-[10px] uppercase tracking-[0.25em] font-bold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {planName}
        </span>
      </div>

      {/* Product Title */}
      <Link href={`/products/${product.handle}`}>
        <h3
          className="text-2xl md:text-3xl text-black font-serif hover:text-[#8c6b2d] transition-colors leading-snug mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h3>
      </Link>

      {/* Description Snippet */}
      {product.description && (
        <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>
      )}

      {/* Customizable Options Summary */}
      {customizableOptions.length > 0 && (
        <div className="mb-6 pt-5 border-t border-[#ECE7DF]">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-3">
            Customizable Options:
          </p>
          <div className="flex flex-wrap gap-2">
            {customizableOptions.map((opt) => (
              <span
                key={opt.name}
                className="px-3 py-1.5 bg-[#FAF7F2] border border-[#C5A059]/35 text-neutral-800 text-[11px] font-medium shadow-xs"
              >
                ✓ {opt.name} ({opt.values.length} {opt.values.length === 1 ? 'choice' : 'scents'})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pricing & CTA */}
      <div className="mt-auto pt-6 border-t border-[#ECE7DF] flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-0.5">
            Recurring Price
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-light text-black"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {displayPrice}
            </span>
            {comparePrice && comparePrice !== '$0.00' && comparePrice !== '$0' && comparePrice !== displayPrice && (
              <span className="text-sm text-neutral-400 line-through">
                {comparePrice}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/products/${product.handle}`}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-[#C5A059] shadow-sm transition-all duration-300 group/btn"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span>Customize</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
