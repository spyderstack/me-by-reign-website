'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'

export function Philosophy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="bg-[#faf9f6] py-32"
      id="philosophy-section"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Image Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.9 }}
            className="w-full lg:w-1/2 flex-shrink-0"
          >
            <div className="relative max-w-lg mx-auto lg:mx-0">
              {/* Decorative gold border */}
              <div className="absolute -inset-4 border border-[#C5A059]/40 hidden md:block" style={{ zIndex: 0 }} />
              <div className="relative aspect-[4/5] rounded-sm shadow-2xl overflow-hidden" style={{ zIndex: 1 }}>
                <Image
                  src="/images/bio_photo.jpg"
                  alt="ME byReign philosophy — handcrafted with botanical intention"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#C5A059]" />
              <p
                className="text-[#C5A059] text-xs uppercase tracking-[0.2em] font-semibold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Meet Reign
              </p>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-black leading-[1.2] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reign Hudson,<br />
              <span className="italic font-light">Founder</span>
            </h2>

            <p
              className="text-gray-600 leading-relaxed font-light mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Reign Hudson is a former fitness instructor and trainer with 26 years of experience, featured on national and international platforms.
            </p>
            <p
              className="text-gray-600 leading-relaxed font-light mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Driven by a passion for self-care, she transitioned into entrepreneurship, founding ME...byReign LLC, a handmade natural skin and home care brand. What started as a personal passion for creating body butters, scrubs, and candles has grown into a thriving business with a strong presence in New York, Philly, and LA.
            </p>
            <p
              className="text-gray-600 leading-relaxed font-light mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Committed to promoting self-love through natural products, Reign's ultimate goal is to expand globally while inspiring others to embrace wellness and entrepreneurship.
            </p>

            {/* Pull Quote */}
            <blockquote
              className="italic text-xl text-gray-800 border-l-2 border-[#C5A059] pl-6 my-10 leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;
            </blockquote>

            {/* Founder Signature */}
            <div className="flex items-center gap-4 mt-10">
              <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 flex items-center justify-center">
                <span
                  className="text-[#C5A059] text-xl italic font-light"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  L
                </span>
              </div>
              <div>
                <p
                  className="text-black font-medium text-sm"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Lorem Ipsum
                </p>
                <p
                  className="text-gray-500 text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Lorem Ipsum, ME byReign
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
