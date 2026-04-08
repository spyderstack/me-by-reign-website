'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MagnifyingGlass, Bag, List, X } from '@phosphor-icons/react'
import { getCartCount } from '@/lib/cart'

const navLinks = [
  { label: 'Catalog', href: '/catalog' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Sync count on mount and on every cart update
    const sync = () => setCartCount(getCartCount())
    sync()
    window.addEventListener('cartUpdated', sync)
    return () => window.removeEventListener('cartUpdated', sync)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white text-black shadow-sm'
            : 'bg-transparent text-white'
        }`}
        style={{ top: 'var(--banner-height, 0px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start leading-none group" id="navbar-logo">
              <span
                className="text-2xl tracking-widest uppercase font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ME by Reign
              </span>
              <span
                className="text-[10px] tracking-[0.3em] uppercase mt-0.5"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: isScrolled ? '#C5A059' : '#C5A059',
                }}
              >
                Handcrafted Luxury
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.15em] uppercase transition-colors duration-200 hover:text-[#C5A059]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button
                className="transition-colors duration-200 hover:text-[#C5A059]"
                aria-label="Search"
                id="navbar-search-btn"
              >
                <MagnifyingGlass size={20} weight="regular" />
              </button>

              <Link
                href="/cart"
                className="relative transition-colors duration-200 hover:text-[#C5A059]"
                aria-label={`Shopping bag (${cartCount} items)`}
                id="navbar-cart-btn"
              >
                <Bag size={20} weight="regular" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                    style={{ backgroundColor: '#C5A059', fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden transition-colors duration-200 hover:text-[#C5A059]"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                id="navbar-menu-btn"
              >
                <List size={24} weight="regular" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-black hover:text-[#C5A059] transition-colors"
                aria-label="Close menu"
                id="navbar-mobile-close-btn"
              >
                <X size={28} weight="regular" />
              </button>
            </div>

            {/* Mobile brand */}
            <div className="px-10 pb-10 border-b border-gray-100">
              <p
                className="text-3xl tracking-widest uppercase"
                style={{ fontFamily: "'Playfair Display', serif", color: '#111' }}
              >
                ME by Reign
              </p>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mt-1 text-[#C5A059]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Handcrafted Luxury
              </p>
            </div>

            {/* Mobile nav links */}
            <nav className="flex flex-col px-10 py-12 gap-8" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl text-black hover:text-[#C5A059] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    onClick={() => setMobileOpen(false)}
                    id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile footer */}
            <div className="mt-auto px-10 pb-12">
              <p
                className="text-xs text-gray-400 uppercase tracking-widest"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Free shipping on orders over $65
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
