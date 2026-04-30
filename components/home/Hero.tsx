'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'

export function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center pt-20"
      style={{ background: 'linear-gradient(135deg, #faf9f6 0%, #f5f0e8 50%, #faf9f6 100%)' }}
      id="hero-section"
    >
      {/* Subtle decorative gold accent — top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2 }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #C5A059 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full aspect-[4/5] md:aspect-[5/6] order-1"
            style={{ maxHeight: 'calc(100vh - 5rem - 5rem)' }}
          >
            {/* Gold border frame */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                border: '2px solid #C5A059',
                boxShadow: '0 0 0 1px rgba(197, 160, 89, 0.15), 0 20px 60px rgba(0, 0, 0, 0.08)',
              }}
            />
            <div className="absolute inset-[6px] rounded-sm overflow-hidden">
              <Image
                src="/images/reign2.png"
                alt="ME byReign — Artisan handmade skincare and home decor"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="flex flex-col justify-center order-2 text-left">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Artisan Crafted Perfection
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#111111',
              }}
            >
              It&apos;s All
              <br />
              <span className="italic font-light text-[#C5A059]">About Me.</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-sm md:text-base leading-relaxed font-light max-w-md mb-10"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: '#555555',
              }}
            >
              Handcrafted with botanical intention. Each product is a ritual —
              a moment of calm in your everyday life. Discover our collection of artisan
              skincare and luxury home décor.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/catalog"
                className="group flex items-center gap-2 bg-[#111111] text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 hover:bg-[#C5A059]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id="hero-shop-btn"
              >
                Shop the Collection
                <ArrowRight
                  size={16}
                  weight="regular"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
              <Link
                href="/our-story"
                className="flex items-center gap-2 border border-[#111111] text-[#111111] px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 hover:bg-[#111111] hover:text-white"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id="hero-story-btn"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right-side vertical scroll accent — hidden on mobile */}
      <div className="hidden md:flex absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6">
        {/* Vertical rotated text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-[#C5A059] text-[10px] uppercase tracking-[0.35em] font-medium"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          Discover
        </motion.p>

        {/* Animated gold diamond */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="relative"
        >
          <motion.div
            className="w-3 h-3 rotate-45"
            style={{ backgroundColor: '#C5A059' }}
            animate={{
              boxShadow: [
                '0 0 0px rgba(197, 160, 89, 0.4)',
                '0 0 12px rgba(197, 160, 89, 0.6)',
                '0 0 0px rgba(197, 160, 89, 0.4)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Trailing dots */}
        <div className="flex flex-col items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] h-[3px] rounded-full"
              style={{ backgroundColor: '#C5A059' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.6 + i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="w-[1px] h-16 origin-top"
          style={{ backgroundColor: 'rgba(197, 160, 89, 0.25)' }}
        />
      </div>
    </section>
  )
}
