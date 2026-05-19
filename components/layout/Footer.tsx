'use client'

import Link from 'next/link'
import { InstagramLogo, FacebookLogo, TiktokLogo, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

const discoverLinks = [
  { label: 'Skincare Collection', href: '/catalog' },
  { label: 'Home Decor', href: '/catalog' },
  { label: 'New Arrivals', href: '/catalog' },
  { label: 'Best Sellers', href: '/catalog' },
]

const infoLinks = [
  { label: 'About Us', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

interface FooterProps {
  policies?: {
    privacyPolicy?: { url: string; title: string }
    termsOfService?: { url: string; title: string }
  }
}

export function Footer({ policies }: FooterProps) {
  return (
    <footer className="bg-[#111] py-24 text-white">
      {/* Gold gradient rule */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50 mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link 
              href="/" 
              className="flex items-center gap-3 mb-6 transition-opacity hover:opacity-80"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="relative h-12 w-12">
                <Image
                  src="/images/reign_logo.png"
                  alt="ME byReign Logo"
                  fill
                  sizes="48px"
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-2xl tracking-widest uppercase text-white leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ME <span className="lowercase">by</span>Reign
                </p>
                <p
                  className="text-[9px] tracking-[0.3em] uppercase text-[#C5A059] mt-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Handcrafted Luxury
                </p>
              </div>
            </Link>
            <p
              className="text-gray-400 text-sm leading-relaxed mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Rooted in botanical tradition and artisan craft. Every product is made with intention, for your most sacred moments.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/reign_mebyreign/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors duration-200"
                aria-label="Instagram"
                id="footer-instagram-link"
              >
                <InstagramLogo size={20} weight="regular" />
              </a>
              <a
                href="https://www.facebook.com/ReignHudson/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors duration-200"
                aria-label="Facebook"
                id="footer-facebook-link"
              >
                <FacebookLogo size={20} weight="regular" />
              </a>
              <a
                href="https://www.tiktok.com/@mebyreign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors duration-200"
                aria-label="TikTok"
                id="footer-tiktok-link"
              >
                <TiktokLogo size={20} weight="regular" />
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
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => window.scrollTo(0, 0)}
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
                    onClick={() => window.scrollTo(0, 0)}
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

          {/* Contact Column */}
          <div>
            {/* Contact Button */}
            <div>
              <Link
                href="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 border border-[#C5A059] px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id="footer-contact-button"
              >
                Contact Us
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-gray-500 text-xs uppercase tracking-widest"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            © {new Date().getFullYear()} ME <span className="lowercase">by</span>REIGN. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={policies?.privacyPolicy?.url || '/privacy'}
              target={policies?.privacyPolicy?.url ? "_blank" : undefined}
              rel={policies?.privacyPolicy?.url ? "noopener noreferrer" : undefined}
              onClick={() => !policies?.privacyPolicy?.url && window.scrollTo(0, 0)}
              className="text-gray-500 text-xs uppercase tracking-widest hover:text-[#C5A059] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="footer-privacy-link"
            >
              Privacy Policy
            </a>
            <a
              href={policies?.termsOfService?.url || '/terms'}
              target={policies?.termsOfService?.url ? "_blank" : undefined}
              rel={policies?.termsOfService?.url ? "noopener noreferrer" : undefined}
              onClick={() => !policies?.termsOfService?.url && window.scrollTo(0, 0)}
              className="text-gray-500 text-xs uppercase tracking-widest hover:text-[#C5A059] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="footer-terms-link"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
