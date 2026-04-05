'use client'

import Link from 'next/link'
import { InstagramLogo, FacebookLogo, TwitterLogo, MapPin, Phone, Envelope, ArrowRight } from '@phosphor-icons/react/dist/ssr'

const discoverLinks = [
  { label: 'Skincare Collection', href: '/collections/skincare' },
  { label: 'Home Decor', href: '/collections/home-decor' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Gift Cards', href: '/gift-cards' },
]

const infoLinks = [
  { label: 'About Us', href: '/our-story' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Shipping & Returns', href: '/shipping' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-[#111] py-24 text-white">
      {/* Gold gradient rule */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50 mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <p
              className="text-3xl tracking-widest uppercase text-white mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ME by Reign
            </p>
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Handcrafted Luxury
            </p>
            <p
              className="text-gray-400 text-sm leading-relaxed mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Rooted in botanical tradition and artisan craft. Every product is made with intention, for your most sacred moments.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors duration-200"
                aria-label="Instagram"
                id="footer-instagram-link"
              >
                <InstagramLogo size={20} weight="regular" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors duration-200"
                aria-label="Facebook"
                id="footer-facebook-link"
              >
                <FacebookLogo size={20} weight="regular" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors duration-200"
                aria-label="Twitter"
                id="footer-twitter-link"
              >
                <TwitterLogo size={20} weight="regular" />
              </a>
            </div>
          </div>

          {/* Discover Column */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.25em] text-white mb-6 font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Discover
            </h3>
            <ul className="space-y-4">
              {discoverLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm uppercase tracking-wider text-gray-400 hover:text-[#C5A059] transition-colors duration-200"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    id={`footer-discover-${link.label.toLowerCase().replace(/[\s&]+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.25em] text-white mb-6 font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Information
            </h3>
            <ul className="space-y-4">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm uppercase tracking-wider text-gray-400 hover:text-[#C5A059] transition-colors duration-200"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    id={`footer-info-${link.label.toLowerCase().replace(/[\s&]+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact Column */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.25em] text-white mb-6 font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Join the Ritual
            </h3>
            <p
              className="text-gray-400 text-sm mb-5 leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Subscribe + receive 15% off your first order.
            </p>
            <form
              className="flex items-center border-b border-gray-700 pb-2 mb-8 group focus-within:border-[#C5A059] transition-colors"
              onSubmit={(e) => e.preventDefault()}
              id="footer-newsletter-form"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="bg-transparent flex-1 text-sm text-white placeholder-gray-500 focus:outline-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id="footer-email-input"
              />
              <button
                type="submit"
                className="text-gray-400 hover:text-[#C5A059] transition-colors ml-2"
                aria-label="Subscribe"
                id="footer-subscribe-btn"
              >
                <ArrowRight size={18} weight="regular" />
              </button>
            </form>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={15} weight="regular" className="text-[#C5A059] mt-0.5 shrink-0" />
                <p
                  className="text-gray-400 text-xs leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  123 Bliss Lane, Atlanta, GA 30301
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} weight="regular" className="text-[#C5A059] shrink-0" />
                <a
                  href="tel:+14045550123"
                  className="text-gray-400 text-xs hover:text-[#C5A059] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id="footer-phone-link"
                >
                  +1 (404) 555-0123
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Envelope size={15} weight="regular" className="text-[#C5A059] shrink-0" />
                <a
                  href="mailto:hello@mebyreign.com"
                  className="text-gray-400 text-xs hover:text-[#C5A059] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id="footer-email-link"
                >
                  hello@mebyreign.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-gray-500 text-xs uppercase tracking-widest"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            © {new Date().getFullYear()} ME by Reign. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-gray-500 text-xs uppercase tracking-widest hover:text-[#C5A059] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="footer-privacy-link"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 text-xs uppercase tracking-widest hover:text-[#C5A059] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="footer-terms-link"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
