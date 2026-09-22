'use client'

import React, { useState, useId } from 'react'
import {
  CheckCircle,
  WarningCircle,
  Info,
  EnvelopeSimple,
  ArrowRight,
} from '@phosphor-icons/react'

export type SubscribeStatus = 'idle' | 'loading' | 'success' | 'already_subscribed' | 'error'

export interface SubscribeFormProps {
  variant?: 'page' | 'footer' | 'inline'
  className?: string
  idPrefix?: string
  onSuccess?: (status: 'subscribed' | 'already_subscribed') => void
}

export function SubscribeForm({
  variant = 'page',
  className = '',
  idPrefix,
  onSuccess,
}: SubscribeFormProps) {
  const generatedId = useId()
  const prefix = idPrefix || `sub-${generatedId.replace(/:/g, '')}`

  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<SubscribeStatus>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const emailInputId = `${prefix}-email`
  const consentCheckboxId = `${prefix}-consent`
  const honeypotId = `${prefix}-extra`

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!email.trim()) {
      setStatus('error')
      setFeedbackMessage('Please enter your email address.')
      return
    }

    if (!consent) {
      setStatus('error')
      setFeedbackMessage(
        'Please tick the consent box to confirm you wish to receive our email updates.'
      )
      return
    }

    setStatus('loading')
    setFeedbackMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          consent,
          honeypot: honeypot.trim(),
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        if (data.status === 'already_subscribed') {
          setStatus('already_subscribed')
          setFeedbackMessage(
            data.message ||
              'You are already subscribed to our newsletter. Thank you for being a part of ME byREIGN!'
          )
          onSuccess?.('already_subscribed')
        } else {
          setStatus('success')
          setFeedbackMessage(
            data.message ||
              'Thank you for joining our sanctuary. Welcome to ME byREIGN.'
          )
          onSuccess?.('subscribed')
          setEmail('')
          setConsent(false)
        }
      } else {
        setStatus('error')
        setFeedbackMessage(
          data.error || 'Something went wrong. Please check your email and try again.'
        )
      }
    } catch (err) {
      console.error('[SubscribeForm] Request failed:', err)
      setStatus('error')
      setFeedbackMessage(
        'Unable to connect to the subscription service. Please try again later.'
      )
    }
  }

  // ─── Inline Variant (for Blog & Wide Sections) ──────────────────────────────
  if (variant === 'inline') {
    return (
      <div className={`w-full ${className}`}>
        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-3 py-8 px-6 bg-white/5 border border-[#C5A059]/40 rounded-sm text-center max-w-md mx-auto"
            id={`${prefix}-inline-success`}
          >
            <CheckCircle size={32} weight="fill" className="text-[#C5A059]" />
            <p
              className="text-white font-medium text-base tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome to the Inner Sanctuary
            </p>
            <p
              className="text-gray-300 text-xs sm:text-sm max-w-sm leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {feedbackMessage}
            </p>
          </div>
        ) : status === 'already_subscribed' ? (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-3 py-8 px-6 bg-white/5 border border-amber-500/40 rounded-sm text-center max-w-md mx-auto"
            id={`${prefix}-inline-already-subscribed`}
          >
            <Info size={32} weight="fill" className="text-amber-400" />
            <p
              className="text-white font-medium text-base tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Already Subscribed
            </p>
            <p
              className="text-gray-300 text-xs sm:text-sm max-w-sm leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {feedbackMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto" id={`${prefix}-form`} noValidate>
            {/* Hidden Honeypot Field */}
            <div
              className="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
              aria-hidden="true"
              tabIndex={-1}
            >
              <label htmlFor={honeypotId}>Do not fill this field</label>
              <input
                type="text"
                id={honeypotId}
                name="sanctuary_verify"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Email Input + Submit Button Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <label htmlFor={emailInputId} className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  id={emailInputId}
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  disabled={status === 'loading'}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full bg-white/10 border border-white/20 px-6 py-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors disabled:opacity-50 rounded-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#C5A059] text-white px-8 py-4 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap disabled:opacity-50 min-w-[140px] flex items-center justify-center gap-2 shrink-0 rounded-none cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id={`${prefix}-submit`}
              >
                {status === 'loading' ? (
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight size={13} weight="bold" />
                  </>
                )}
              </button>
            </div>

            {/* Explicit Consent Checkbox */}
            <div className="flex items-start justify-center gap-2.5 text-left pt-1 px-1">
              <input
                type="checkbox"
                id={consentCheckboxId}
                name="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked)
                  if (status === 'error') setStatus('idle')
                }}
                disabled={status === 'loading'}
                className="mt-0.5 h-3.5 w-3.5 rounded border-gray-500 bg-white/10 text-[#C5A059] accent-[#C5A059] focus:ring-[#C5A059] cursor-pointer disabled:opacity-50 shrink-0"
              />
              <label
                htmlFor={consentCheckboxId}
                className="text-xs text-gray-400 leading-tight cursor-pointer select-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                I agree to receive marketing emails from ME byREIGN. Unsubscribe anytime.
              </label>
            </div>

            {/* Error Message */}
            {status === 'error' && feedbackMessage && (
              <div
                role="alert"
                aria-live="polite"
                className="flex items-center justify-center gap-2 text-rose-400 text-xs pt-1"
                id={`${prefix}-error`}
              >
                <WarningCircle size={16} className="shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}
          </form>
        )}
      </div>
    )
  }

  // ─── Footer Variant ──────────────────────────────────────────────────────────
  if (variant === 'footer') {
    return (
      <div className={`w-full ${className}`}>
        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="bg-[#1c1a17] border border-[#C5A059]/40 rounded-sm p-4 text-[#C5A059] flex items-start gap-3 text-xs"
            id={`${prefix}-footer-success`}
          >
            <CheckCircle size={18} weight="fill" className="shrink-0 mt-0.5" />
            <div>
              <p className="font-medium tracking-wider uppercase text-[11px]">
                Subscription Confirmed
              </p>
              <p className="text-gray-300 mt-1 leading-relaxed text-[12px]">
                {feedbackMessage}
              </p>
            </div>
          </div>
        ) : status === 'already_subscribed' ? (
          <div
            role="status"
            aria-live="polite"
            className="bg-[#1c1a17] border border-amber-500/30 rounded-sm p-4 text-amber-200 flex items-start gap-3 text-xs"
            id={`${prefix}-footer-already-subscribed`}
          >
            <Info size={18} weight="fill" className="shrink-0 mt-0.5 text-amber-400" />
            <div>
              <p className="font-medium tracking-wider uppercase text-[11px] text-amber-400">
                Already Subscribed
              </p>
              <p className="text-gray-300 mt-1 leading-relaxed text-[12px]">
                {feedbackMessage}
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
            id={`${prefix}-form`}
            noValidate
          >
            {/* Hidden Honeypot Field for anti-bot protection */}
            <div
              className="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
              aria-hidden="true"
              tabIndex={-1}
            >
              <label htmlFor={honeypotId}>Do not fill this field</label>
              <input
                type="text"
                id={honeypotId}
                name="sanctuary_verify"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Email Input + Submit Button Row */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <label htmlFor={emailInputId} className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  id={emailInputId}
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  disabled={status === 'loading'}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full bg-white/5 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors disabled:opacity-50"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#C5A059] text-white px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#b08d48] transition-colors duration-200 disabled:opacity-50 inline-flex items-center justify-center gap-1.5 shrink-0"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id={`${prefix}-submit`}
              >
                {status === 'loading' ? (
                  <span className="inline-block h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Join</span>
                    <ArrowRight size={12} weight="bold" />
                  </>
                )}
              </button>
            </div>

            {/* Explicit Consent Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id={consentCheckboxId}
                name="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked)
                  if (status === 'error') setStatus('idle')
                }}
                disabled={status === 'loading'}
                className="mt-0.5 h-3.5 w-3.5 rounded border-gray-600 bg-white/5 text-[#C5A059] accent-[#C5A059] focus:ring-[#C5A059] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
              />
              <label
                htmlFor={consentCheckboxId}
                className="text-[11px] text-gray-400 leading-tight cursor-pointer select-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                I agree to receive marketing emails from ME byREIGN. Unsubscribe anytime.
              </label>
            </div>

            {/* Error Message */}
            {status === 'error' && feedbackMessage && (
              <div
                role="alert"
                aria-live="polite"
                className="flex items-start gap-2 text-rose-400 text-xs mt-1 pt-1"
                id={`${prefix}-error`}
              >
                <WarningCircle size={15} className="shrink-0 mt-0.5" />
                <span>{feedbackMessage}</span>
              </div>
            )}
          </form>
        )}
      </div>
    )
  }

  // ─── Standard / Page Variant ────────────────────────────────────────────────
  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-[#1C1A17] border border-[#C5A059]/40 rounded-sm p-8 text-center"
          id={`${prefix}-page-success`}
        >
          <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} weight="fill" />
          </div>
          <h3
            className="text-xl text-white font-medium mb-2 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Welcome to the Sanctuary
          </h3>
          <p
            className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {feedbackMessage}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 text-xs uppercase tracking-[0.2em] text-[#C5A059] hover:underline"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Subscribe another email
          </button>
        </div>
      ) : status === 'already_subscribed' ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-[#1C1A17] border border-amber-500/40 rounded-sm p-8 text-center"
          id={`${prefix}-page-already-subscribed`}
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Info size={28} weight="fill" />
          </div>
          <h3
            className="text-xl text-white font-medium mb-2 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Already Subscribed
          </h3>
          <p
            className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {feedbackMessage}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 text-xs uppercase tracking-[0.2em] text-[#C5A059] hover:underline"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Check another email
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          id={`${prefix}-form`}
          noValidate
        >
          {/* Hidden Honeypot Field */}
          <div
            className="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
            aria-hidden="true"
            tabIndex={-1}
          >
            <label htmlFor={honeypotId}>Do not fill this field</label>
            <input
              type="text"
              id={honeypotId}
              name="sanctuary_verify"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Email Input Group */}
          <div>
            <label
              htmlFor={emailInputId}
              className="block text-xs uppercase tracking-[0.2em] text-gray-300 mb-2 font-medium"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Email Address <span className="text-[#C5A059]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <EnvelopeSimple size={18} />
              </div>
              <input
                type="email"
                id={emailInputId}
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                disabled={status === 'loading'}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full bg-[#111] border border-gray-700 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors rounded-sm disabled:opacity-50"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>
          </div>

          {/* Explicit Marketing Consent Checkbox */}
          <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-sm">
            <input
              type="checkbox"
              id={consentCheckboxId}
              name="consent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (status === 'error') setStatus('idle')
              }}
              disabled={status === 'loading'}
              className="mt-1 h-4 w-4 rounded border-gray-600 bg-[#111] text-[#C5A059] accent-[#C5A059] focus:ring-[#C5A059] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
            />
            <label
              htmlFor={consentCheckboxId}
              className="text-xs text-gray-400 leading-relaxed cursor-pointer select-none"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              I agree to receive marketing emails, artisanal product previews, and private
              invitations from ME byREIGN. I understand I can unsubscribe at any time.
            </label>
          </div>

          {/* Error Message */}
          {status === 'error' && feedbackMessage && (
            <div
              role="alert"
              aria-live="polite"
              className="flex items-start gap-2.5 p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-sm text-rose-300 text-xs"
              id={`${prefix}-error`}
            >
              <WarningCircle size={17} className="shrink-0 mt-0.5 text-rose-400" />
              <span className="leading-relaxed">{feedbackMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#C5A059] text-white py-4 uppercase tracking-[0.25em] text-xs font-bold hover:bg-[#b08d48] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 rounded-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            id={`${prefix}-submit`}
          >
            {status === 'loading' ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <span>Subscribe to Newsletter</span>
                <ArrowRight size={14} weight="bold" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
