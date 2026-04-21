'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 antialiased overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="w-10 h-px bg-[#C5A059]/50" />
            <span
              className="text-[#C5A059] text-[10px] uppercase tracking-[0.5em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Error 404
            </span>
            <span className="w-10 h-px bg-[#C5A059]/50" />
          </div>

          <h1
            className="text-6xl md:text-8xl mb-8 font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lost in{' '}
            <em className="font-light italic" style={{ fontStyle: 'italic' }}>
              Transition
            </em>
          </h1>

          <p
            className="text-gray-400 mb-12 text-lg font-light leading-relaxed tracking-wide max-w-md mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            The sanctuary you are seeking seems to have drifted. <br />
            Let us guide you back to our curated essentials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="bg-white text-black px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-semibold hover:bg-[#C5A059] hover:text-white transition-all duration-500 w-full sm:w-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="404-home-btn"
            >
              Return Home
            </Link>
            <Link
              href="/catalog"
              className="border border-white/20 text-white px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-semibold hover:bg-white hover:text-black transition-all duration-500 w-full sm:w-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="404-catalog-btn"
            >
              Shop The Edit
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
