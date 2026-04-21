'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'
import { ArrowLeft, User, Calendar, Clock, ArrowRight, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { NormalizedArticle } from '@/lib/shopify/types'

export function BlogPostClient({
  post,
  related
}: {
  post: NormalizedArticle
  related: NormalizedArticle[]
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    const result = await subscribeToNewsletter(formData)
    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
      setMessage(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div
        className="bg-[#111] w-full"
        style={{ height: 'calc(var(--banner-height, 0px) + 80px)' }}
      />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-[#2a2010] to-transparent pointer-events-none z-0" />

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div
        className="border-b border-gray-100 bg-white relative z-10"

      >
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
          className="w-full h-full object-cover opacity-55 relative z-0"
        />
        <div
          className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
        />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 md:pb-14 z-20">
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

          {/* Shopify HTML Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="shopify-html-content text-lg leading-relaxed text-gray-700 font-light"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Author footer */}
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
                    className="text-xl mb-3 group-hover:text-[#C5A059] transition-colors line-clamp-2 min-h-[3.5rem]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {rel.title}
                  </h3>
                  <div
                    className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[4.5rem]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: rel.excerptHtml || rel.contentHtml }}
                  />
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

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 py-10 bg-white/5 border border-[#C5A059]/30 rounded-sm mt-8">
              <CheckCircle size={32} weight="fill" className="text-[#C5A059]" />
              <p className="text-white font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Welcome to the inner sanctum.
              </p>
              <p className="text-gray-400 text-sm">Please check your email to confirm your subscription.</p>
            </div>
          ) : (
            <>
              <form
                action={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                id="blog-post-newsletter-form"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#C5A059] transition-colors text-white placeholder:text-gray-500 text-sm disabled:opacity-50"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id="blog-post-newsletter-email"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#C5A059] text-white px-8 py-4 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap disabled:opacity-50 min-w-[140px] flex items-center justify-center"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id="blog-post-newsletter-submit"
                >
                  {status === 'loading' ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
              {status === 'error' && (
                <div className="flex items-center justify-center gap-2 text-red-400 text-xs mt-4">
                  <WarningCircle size={16} />
                  <span>{message}</span>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
