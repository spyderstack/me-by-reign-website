'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4 antialiased">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-px bg-[#C5A059]" />
            <span
              className="text-[#C5A059] text-[10px] uppercase tracking-[0.45em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Error 404
            </span>
            <span className="w-10 h-px bg-[#C5A059]" />
          </div>

          <h1
            className="text-6xl md:text-8xl mb-8 font-light"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lost in{' '}
            <em className="font-light italic not-italic" style={{ fontStyle: 'italic' }}>
              Transition
            </em>
          </h1>

          <p
            className="text-gray-500 mb-12 text-lg font-light leading-relaxed tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            The sanctuary you are seeking seems to have drifted. <br />
            Let us guide you back to our curated essentials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="bg-black text-white px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-semibold hover:bg-[#C5A059] transition-all duration-500 w-full sm:w-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Return Home
            </Link>
            <Link
              href="/catalog"
              className="border border-black/10 px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-semibold hover:bg-black hover:text-white transition-all duration-500 w-full sm:w-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Shop The Edit
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
