'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Ancient Art of Botanical Skincare',
    excerpt:
      'Exploring time-honored traditions from Mediterranean herbalists and how they inform our modern formulations.',
    date: 'March 28, 2026',
    category: 'Heritage',
    image:
      'https://images.unsplash.com/photo-1763742259246-80eb61e760d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Creating a Mindful Morning Ritual',
    excerpt:
      'How to transform your skincare routine into a grounding practice that sets the tone for your entire day.',
    date: 'March 21, 2026',
    category: 'Wellness',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '5 min read',
  },
  {
    id: 3,
    title: 'The Power of Rose in Natural Beauty',
    excerpt:
      'Discover why rose has been treasured for centuries and how we harness its properties in our signature serum.',
    date: 'March 14, 2026',
    category: 'Ingredients',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Bringing Spa Energy Into Your Home',
    excerpt:
      'Simple ways to create a sanctuary atmosphere through scent, light, and intentional design.',
    date: 'March 7, 2026',
    category: 'Home',
    image:
      'https://images.unsplash.com/photo-1600857062241-98e5dba7f417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'Understanding Clean Beauty',
    excerpt:
      "What 'clean' really means, why it matters, and how to navigate the overwhelming world of natural skincare.",
    date: 'February 28, 2026',
    category: 'Education',
    image:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '10 min read',
  },
  {
    id: 6,
    title: 'Seasonal Skincare: Spring Edition',
    excerpt:
      "Adjusting your routine as the seasons change to support your skin's evolving needs.",
    date: 'February 21, 2026',
    category: 'Skincare',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '6 min read',
  },
]

function PostGrid({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <Link href={`/blog/${post.id}`} className="block">
          {/* Image */}
          <div className="relative aspect-[3/2] overflow-hidden bg-[#faf9f6] mb-5">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Category badge */}
            <div
              className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-bold text-black shadow-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {post.category}
            </div>
          </div>

          {/* Meta */}
          <p
            className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {post.date} &nbsp;·&nbsp; {post.readTime}
          </p>

          {/* Title */}
          <h3
            className="text-xl font-serif text-black group-hover:text-[#C5A059] transition-colors duration-200 leading-snug mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className="text-gray-500 text-sm leading-relaxed font-light mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {post.excerpt}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-black group-hover:text-[#C5A059] transition-colors duration-200">
            <span
              className="text-[10px] uppercase tracking-[0.3em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Read Article
            </span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
          </Link>
        </motion.article>
      ))}
    </div>
  )
}

export default function BlogPage() {
  const heroRef = useRef(null)
  const isHeroIn = useInView(heroRef, { once: true })
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

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
            alt="The Journal — ME by Reign"
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
              ME by Reign
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
            The <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Blog</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isHeroIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22 }}
            className="text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif", color: 'rgba(255,255,255,0.85)' }}
          >
            Thoughts on botanical beauty, wellness rituals, and creating sanctuary
          </motion.p>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent z-10" />
      </section>

      {/* ── FEATURED POST ─────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-px bg-[#C5A059]" />
            <p
              className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Featured
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image */}
            <Link href={`/blog/${featured.id}`} className="relative aspect-[16/9] overflow-hidden bg-[#faf9f6] group cursor-pointer block">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </Link>

            {/* Content */}
            <div>
              <p
                className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {featured.category}
              </p>

              <h2
                className="font-serif text-black leading-tight mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                }}
              >
                {featured.title}
              </h2>

              <p
                className="text-gray-500 text-base leading-relaxed font-light mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {featured.excerpt}
              </p>

              <div
                className="flex items-center gap-4 text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-10"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                <span>{featured.readTime}</span>
              </div>

              <Link href={`/blog/${featured.id}`} className="group flex items-center gap-3 border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-300 inline-flex">
                <span
                  className="text-[10px] uppercase tracking-[0.3em] font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Read Article
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL POSTS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#faf9f6] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-px bg-[#C5A059]" />
            <p
              className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              All Articles
            </p>
          </div>

          <PostGrid posts={rest} />
        </div>
      </section>

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
