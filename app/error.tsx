'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('[Application Error]:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4 antialiased">
      <div className="text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <span
              className="text-[#C5A059] text-[10px] uppercase tracking-[0.45em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Unexpected Error
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl mb-8 font-light text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A moment of{' '}
            <em className="font-light italic not-italic" style={{ fontStyle: 'italic' }}>
              stillness
            </em>
          </h1>

          <p
            className="text-gray-500 mb-12 text-base font-light leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Our systems are taking a moment to reset. <br />
            Please try refreshing the page or return to the main collection.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => reset()}
              className="bg-black text-white px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-semibold hover:bg-[#C5A059] transition-all duration-500 w-full sm:w-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Try Again
            </button>
            <Link
              href="/"
              className="border border-black/10 px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-semibold hover:bg-black hover:text-white transition-all duration-500 w-full sm:w-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Main Sanctuary
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
