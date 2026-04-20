'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, User, Calendar, Clock, ArrowRight } from '@phosphor-icons/react'
import { BLOG_POSTS } from '@/lib/blog-posts'

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 2)

  return (
    <div className="min-h-screen bg-white">

      {/* ── Dark Header Underlay for Navbar ── */}
      <div
        className="bg-[#111] w-full"
        style={{ height: 'calc(var(--banner-height, 0px) + 80px)' }}
      />

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
            id="blog-back-link"
          >
            <ArrowLeft size={16} weight="regular" />
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Back to The Blog
            </span>
          </Link>
        </div>
      </div>

      {/* ── Hero Image ───────────────────────────────────────────────────── */}
      <section className="relative bg-black overflow-hidden" style={{ height: '60vh' }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }}
        />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 md:pb-14">
          <div className="max-w-4xl mx-auto">
            <p
              className="text-[#C5A059] text-[9px] uppercase tracking-[0.4em] font-bold mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {post.category}
            </p>
            <h1
              className="text-white mb-6 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 6vw, 4rem)',
              }}
            >
              {post.title}
            </h1>

            <div
              className="flex flex-wrap items-center gap-5 text-sm"
              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Montserrat', sans-serif" }}
            >
              <span className="flex items-center gap-2">
                <User size={14} weight="regular" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} weight="regular" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} weight="regular" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article Body ─────────────────────────────────────────────────── */}
      <article className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Gold divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-px bg-[#C5A059]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <div className="w-10 h-px bg-[#C5A059]" />
          </div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl leading-relaxed text-gray-700 mb-14"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {post.content.intro}
          </motion.p>

          {/* Sections */}
          {post.content.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="mb-12"
            >
              <h2
                className="mb-5"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                }}
              >
                {section.heading}
              </h2>
              <p
                className="text-gray-600 leading-relaxed text-base"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {section.text}
              </p>
            </motion.div>
          ))}

          {/* Pull quote / conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-gray-100"
          >
            <div className="border-l-2 border-[#C5A059] pl-6">
              <p
                className="text-lg leading-relaxed text-gray-700 italic"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.content.conclusion}
              </p>
            </div>
          </motion.div>

          {/* Author */}
          <div className="mt-14 pt-10 border-t border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/15 flex items-center justify-center flex-shrink-0">
              <User size={22} className="text-[#C5A059]" />
            </div>
            <div>
              <p
                className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Written by
              </p>
              <p
                className="text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.author}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ── Related Articles ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-24 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-10 h-px bg-[#C5A059]" />
              <p
                className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Related Articles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group"
                  id={`related-blog-${rel.id}`}
                >
                  <div className="aspect-[16/9] overflow-hidden bg-white mb-6">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p
                    className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {rel.category}
                  </p>
                  <h3
                    className="text-xl mb-3 group-hover:text-[#C5A059] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {rel.title}
                  </h3>
                  <p
                    className="text-gray-500 text-sm leading-relaxed mb-4"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {rel.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-2 text-black group-hover:text-[#C5A059] transition-colors"
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.25em] font-bold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Read Article
                    </span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ───────────────────────────────────────────────── */}
      <section className="py-24 bg-[#111] relative overflow-hidden">
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
            Insights on botanical wellness, rituals, and new arrivals — delivered to your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
            id="blog-post-newsletter-form"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#C5A059] transition-colors text-white placeholder:text-gray-500 text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="blog-post-newsletter-email"
            />
            <button
              type="submit"
              className="bg-[#C5A059] text-white px-8 py-4 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="blog-post-newsletter-submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
