'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useInView, motion } from 'motion/react'

export function HeroSection({ title = 'Edit' }: { title?: string }) {
  const heroRef = useRef(null)
  const isHeroVisible = useInView(heroRef, { once: true })

  return (
    <section
      ref={heroRef}
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: '30vh' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/golden_background.jpg"
          alt="ME byReign — The Edit"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layered overlay: dark at top (navbar legibility) → dark at bottom (text legibility) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </div>

      {/* Hero text — flush bottom, starts below navbar */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: 'calc(var(--banner-height, 0px) + 120px)', paddingBottom: '4rem' }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="w-10 h-px bg-[#C5A059]" />
          <span
            className="text-[#C5A059] text-[10px] uppercase tracking-[0.45em] font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ME <span className="lowercase">by</span>Reign
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={isHeroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="text-white leading-[1.0] mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
          }}
        >
          {title === 'Edit' ? (
            <>
              The <em className="italic font-light not-italic">Edit</em>
            </>
          ) : (
            title
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="text-sm md:text-base leading-relaxed font-light max-w-lg"
          style={{ fontFamily: "'Montserrat', sans-serif", color: 'rgba(255,255,255,0.85)' }}
        >
          Artisan-crafted skincare and luxury home essentials — chosen for their
          craftsmanship, botanical integrity, and the ritual they inspire.
        </motion.p>
      </div>

      {/* Bottom gold divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent z-10" />
    </section>
  )
}
