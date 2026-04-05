'use client'

import { useState, useEffect } from 'react'
import { X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { seasonalBanner } from '@/lib/seasonal-banner'

export function SeasonalBanner() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const isBannerVisible = seasonalBanner.enabled && !dismissed
    document.documentElement.style.setProperty('--banner-height', isBannerVisible ? '40px' : '0px')
    return () => {
      document.documentElement.style.setProperty('--banner-height', '0px')
    }
  }, [dismissed])

  if (!seasonalBanner.enabled) return null

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 bg-[#111] text-white overflow-hidden z-[60]"
          id="seasonal-banner"
        >
          <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center relative">
            <p
              className="text-[10px] uppercase tracking-[0.25em] text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {seasonalBanner.message}{' '}
              <a
                href={seasonalBanner.linkHref}
                className="text-[#C5A059] underline underline-offset-2 hover:opacity-80 transition-opacity"
                id="seasonal-banner-link"
              >
                {seasonalBanner.linkLabel}
              </a>
            </p>
            <button
              onClick={() => setDismissed(true)}
              className="absolute right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss banner"
              id="seasonal-banner-dismiss"
            >
              <X size={14} weight="regular" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
