'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { submitContactForm } from '@/app/actions/contact'

// ─── Contact form state ───────────────────────────────────────────────────────
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_FORM: FormData = { name: '', email: '', subject: '', message: '' }

export default function ContactPage() {
  const heroRef   = useRef(null)
  const formRef   = useRef(null)
  const isHeroIn  = useInView(heroRef, { once: true })
  const isFormIn  = useInView(formRef, { once: true, margin: '-60px' })

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const form = new FormData()
    form.append('name', formData.name)
    form.append('email', formData.email)
    form.append('subject', formData.subject)
    form.append('message', formData.message)

    const result = await submitContactForm(form)
    
    if (result.success) {
      setStatus('success')
      setFormData(INITIAL_FORM)
      // Optional: Reset status after 10 seconds
      setTimeout(() => setStatus('idle'), 10000)
    } else {
      setStatus('error')
      setErrorMessage(result.message)
    }
  }

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
            alt="Contact ME byReign"
            fill priority sizes="100vw"
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/85" />
        </div>

        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 text-center"
          style={{ paddingTop: 'calc(var(--banner-height, 0px) + 140px)' }}
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
              ME byReign
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
            Get in{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Touch</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isHeroIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22 }}
            className="text-gray-300 text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            We&apos;d love to hear from you — whether it&apos;s a question about our products,
            guidance on your ritual, or simply a hello.
          </motion.p>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent z-10" />
      </section>

      {/* ── FORM SECTION ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32" ref={formRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isFormIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-10 h-px bg-[#C5A059]" />
                <p
                  className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Send a Message
                </p>
                <div className="w-10 h-px bg-[#C5A059]" />
              </div>

              <h2
                className="font-serif text-black mb-10 leading-tight text-center"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                We&apos;re Here for{' '}
                <span className="italic font-light">You</span>
              </h2>

              {/* Success message */}
              {status === 'success' && (
                <div className="mb-8 p-5 bg-[#faf9f6] border-l-2 border-[#C5A059]">
                  <p
                    className="text-sm text-gray-700 font-light"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </p>
                </div>
              )}

              {/* Error message */}
              {status === 'error' && (
                <div className="mb-8 p-5 bg-red-50 border-l-2 border-red-500">
                  <p
                    className="text-sm text-red-700 font-light"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {errorMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7" id="contact-form">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2 font-bold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-[#faf9f6] border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2 font-bold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-[#faf9f6] border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2 font-bold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-[#faf9f6] border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2 font-bold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    disabled={status === 'loading'}
                    className="w-full bg-[#faf9f6] border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors resize-none disabled:opacity-50"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-black text-white py-4 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-[#C5A059] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center min-h-[52px]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id="contact-submit-btn"
                >
                  {status === 'loading' ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}
