'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { Philosophy }        from '@/components/home/Philosophy'




export default function OurStoryPage() {
  const heroRef = useRef(null)
  const isHeroIn = useInView(heroRef, { once: true })

  return (
    <main className="min-h-screen bg-white antialiased">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex items-end overflow-hidden bg-[#111]"
        style={{ minHeight: '55vh' }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/golden_background.jpg"
            alt="The Journal — ME byReign"
            fill priority sizes="100vw"
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
        </div>

        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ paddingTop: 'calc(var(--banner-height, 0px) + 140px)', paddingBottom: '3rem' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isHeroIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-8 h-px bg-[#C5A059]" />
            <span
              className="text-[#C5A059] text-[10px] uppercase tracking-[0.45em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ME byReign
            </span>
            <span className="w-8 h-px bg-[#C5A059]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={isHeroIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1.05,
            }}
          >
            Our <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Story</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isHeroIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22 }}
            className="text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif", color: 'rgba(255,255,255,0.85)' }}
          >
            Born from a deep reverence for nature's wisdom and centuries-old botanical traditions
          </motion.p>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent z-10" />
      </section>

      {/* ── FEATURED POST ─────────────────────────────────────────────────── */}
      <Philosophy />
      {/* ── NEWSLETTER CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#111] py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 60% 50%, #C5A059 0%, transparent 65%)' }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#C5A059]/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <div className="w-8 h-px bg-[#C5A059]/60" />
          </div>

          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
            }}
          >
            Never Miss an{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Article</em>
          </h2>
          <p
            className="text-gray-400 mb-10 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Get our latest insights on botanical wellness, rituals, and new arrivals — delivered to your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
            id="blog-newsletter-form"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#C5A059] transition-colors text-white placeholder:text-gray-500 text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="blog-newsletter-email"
            />
            <button
              type="submit"
              className="bg-[#C5A059] text-white px-8 py-4 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="blog-newsletter-submit"
            >
              Subscribe
            </button>
          </form>

          <p
            className="text-gray-600 text-[10px] uppercase tracking-widest mt-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            No spam. Unsubscribe anytime.
          </p>
        </div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
      </section>

    </main>
  )
}
