'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { blogPosts } from '@/lib/blog-posts'

export function BlogPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-32 bg-white" id="blog-preview" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2
            className="text-4xl md:text-5xl font-serif text-black leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From the Journal
          </h2>
          <Link
            href="/journal"
            className="group flex items-center gap-2 text-black hover:text-[#C5A059] transition-colors uppercase tracking-widest text-xs font-semibold whitespace-nowrap pb-2 border-b border-black hover:border-[#C5A059]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            id="blog-preview-read-all"
          >
            Read All Posts
            <ArrowRight
              size={16}
              weight="regular"
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={`/journal/${post.slug}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
              id={`blog-post-${post.id}`}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video mb-6 bg-gray-50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Category */}
              <p
                className="text-[#C5A059] text-[10px] uppercase tracking-widest mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.category}
              </p>

              {/* Title */}
              <h3
                className="text-lg font-serif text-black mb-3 group-hover:text-[#C5A059] transition-colors leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p
                className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.excerpt}
              </p>

              {/* Date */}
              <p
                className="text-gray-400 text-[10px] uppercase tracking-widest"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.date}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
