import React from "react";
import { motion } from "motion/react";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  ArrowRight,
  MapPin,
  Phone
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111] text-white py-24 relative overflow-hidden">
      {/* Decorative Gold Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <a href="/" className="inline-block mb-4">
              <span
                className="font-serif text-3xl tracking-widest uppercase block"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aura
              </span>
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-medium">
                Botanicals
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Elevating daily rituals through artisanal craftsmanship and nature's finest ingredients. Experience true spa luxury in the comfort of your home.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-[#C5A059] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-[#C5A059] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-[#C5A059] transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>Discover</h4>
            <ul className="space-y-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {['Skincare Collection', 'Home Decor', 'New Arrivals', 'Best Sellers', 'Gift Cards'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#C5A059] text-sm transition-colors uppercase tracking-wider">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>Information</h4>
            <ul className="space-y-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {['About Us', 'Sustainability', 'Shipping & Returns', 'FAQ', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#C5A059] text-sm transition-colors uppercase tracking-wider">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>Join the Ritual</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Subscribe to our newsletter for exclusive offers, early access to new collections, and wellness tips.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-gray-700 py-3 pr-10 text-sm text-white focus:outline-none focus:border-[#C5A059] transition-colors uppercase tracking-widest placeholder-gray-600"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C5A059] transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-1" />
                <span style={{ fontFamily: "'Montserrat', sans-serif" }}>123 Artisan Way<br/>Los Angeles, CA 90210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span style={{ fontFamily: "'Montserrat', sans-serif" }}>+1 (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span style={{ fontFamily: "'Montserrat', sans-serif" }}>concierge@aurabotanicals.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            © {new Date().getFullYear()} Aura Botanicals. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
