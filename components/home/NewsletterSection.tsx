'use client'

import { useState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'
import { CheckCircle, WarningCircle } from '@phosphor-icons/react/dist/ssr'

export function NewsletterSection() {
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
    <section className="py-32 bg-[#faf9f6] text-center px-4" id="newsletter-section">
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[#C5A059]" />
          <p
            className="text-[#C5A059] text-[10px] uppercase tracking-[0.25em]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            The Inner Sanctum
          </p>
          <div className="w-8 h-[1px] bg-[#C5A059]" />
        </div>

        <h2
          className="text-4xl md:text-5xl font-serif text-black mb-5 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Join the Sanctuary
        </h2>
        <p
          className="text-gray-500 mb-10 font-light leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Sign up for exclusive rituals, new arrivals, and members-only offers — delivered with intention to your inbox.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-6 bg-white border border-[#C5A059]/30 rounded-sm">
            <CheckCircle size={32} weight="fill" className="text-[#C5A059]" />
            <p className="text-black font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Welcome to the inner sanctum.
            </p>
            <p className="text-gray-500 text-sm">Please check your email to confirm your subscription.</p>
          </div>
        ) : (
          <>
            <form
              action={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              id="newsletter-form"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                disabled={status === 'loading'}
                className="flex-1 bg-white border border-gray-200 px-6 py-4 focus:outline-none focus:border-[#C5A059] transition-colors rounded-sm text-sm disabled:opacity-50"
                aria-label="Email address for newsletter"
                required
                id="newsletter-email-input"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors duration-300 rounded-sm whitespace-nowrap disabled:opacity-50 min-w-[140px] flex items-center justify-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id="newsletter-submit-btn"
              >
                {status === 'loading' ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            {status === 'error' && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-xs mt-4">
                <WarningCircle size={16} />
                <span>{message}</span>
              </div>
            )}
          </>
        )}

        <p
          className="text-gray-400 text-[10px] uppercase tracking-widest mt-5"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
