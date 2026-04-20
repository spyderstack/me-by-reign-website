'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { MapPin, Phone, Envelope } from '@phosphor-icons/react'

// ─── Contact form state ───────────────────────────────────────────────────────
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_FORM: FormData = { name: '', email: '', subject: '', message: '' }

// ─── Contact details ──────────────────────────────────────────────────────────
const contactDetails = [
  {
    Icon: MapPin,
    label: 'Address',
    value: '123 Bliss Lane\nAtlanta, GA 30301',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+1 (404) 555-0123',
  },
  {
    Icon: Envelope,
    label: 'Email',
    value: 'hello@mebyreign.com',
  },
]

const hours = [
  { days: 'Monday – Friday', time: '10am – 6pm' },
  { days: 'Saturday', time: '11am – 5pm' },
  { days: 'Sunday', time: 'Closed' },
]

export default function ContactPage() {
  const heroRef   = useRef(null)
  const formRef   = useRef(null)
  const isHeroIn  = useInView(heroRef, { once: true })
  const isFormIn  = useInView(formRef, { once: true, margin: '-60px' })

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData(INITIAL_FORM)
    setTimeout(() => setSubmitted(false), 5000)
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

      {/* ── FORM + INFO ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32" ref={formRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isFormIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-px bg-[#C5A059]" />
                <p
                  className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Send a Message
                </p>
              </div>

              <h2
                className="font-serif text-black mb-10 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                We&apos;re Here for{' '}
                <span className="italic font-light">You</span>
              </h2>

              {/* Success message */}
              {submitted && (
                <div className="mb-8 p-5 bg-[#faf9f6] border-l-2 border-[#C5A059]">
                  <p
                    className="text-sm text-gray-700 font-light"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Thank you for reaching out. We&apos;ll be in touch soon.
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
                      className="w-full bg-[#faf9f6] border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors"
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
                      className="w-full bg-[#faf9f6] border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors"
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
                    className="w-full bg-[#faf9f6] border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors"
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
                    className="w-full bg-[#faf9f6] border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-[#C5A059] transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id="contact-submit-btn"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isFormIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col gap-14"
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-px bg-[#C5A059]" />
                  <p
                    className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Visit Our Studio
                  </p>
                </div>

                <h2
                  className="font-serif text-black mb-5 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
                >
                  Come Experience
                  <br />
                  <span className="italic font-light">The Sanctuary</span>
                </h2>

                <p
                  className="text-gray-500 text-sm leading-relaxed font-light"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop by our Atlanta studio to experience our full collection, consult
                  with our team, and discover the ritual that&apos;s right for you.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-7">
                {contactDetails.map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-5 items-start">
                    <div className="w-11 h-11 bg-[#faf9f6] border border-gray-100 flex items-center justify-center shrink-0">
                      <Icon size={18} weight="regular" className="text-[#C5A059]" />
                    </div>
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-gray-700 text-sm font-light leading-relaxed whitespace-pre-line"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="border-t border-gray-100 pt-8">
                <p
                  className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Studio Hours
                </p>
                <div className="space-y-3">
                  {hours.map(({ days, time }) => (
                    <div key={days} className="flex justify-between text-sm text-gray-600 font-light">
                      <span style={{ fontFamily: "'Montserrat', sans-serif" }}>{days}</span>
                      <span
                        className={time === 'Closed' ? 'text-gray-400' : 'text-black font-medium'}
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ───────────────────────────────────────────────── */}
      <section className="h-80 bg-[#faf9f6] border-t border-gray-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin size={28} weight="light" className="text-[#C5A059] mx-auto mb-4" />
          <p
            className="text-gray-400 text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Map integration placeholder
          </p>
        </div>
      </section>

    </main>
  )
}
