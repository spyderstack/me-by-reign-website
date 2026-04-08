import React from "react";
import { Hero } from "../components/Hero";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Philosophy } from "../components/Philosophy";
import { motion } from "motion/react";

export function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />

      {/* Banner Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1743309026555-97f545a08490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBtaW5pbWFsJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzc1NDA1NzM3fDA&ixlib=rb-4.1.0&q=80&w=1920')] bg-cover bg-center" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2
            className="text-3xl md:text-5xl text-white font-serif mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "An oasis of calm in a chaotic world. The most exquisite handcrafted care."
          </h2>
          <p className="text-[#C5A059] uppercase tracking-[0.2em] text-sm font-semibold">
            — Vogue Magazine
          </p>
        </div>
      </section>

      <Philosophy />

      {/* Newsletter / CTA Section */}
      <section className="py-32 bg-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-4xl font-serif text-black mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Join the Sanctuary
          </h2>
          <p
            className="text-gray-500 mb-8 font-light"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Sign up to receive 15% off your first order of luxury handcrafted botanical goods.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-50 border border-gray-200 px-6 py-4 focus:outline-none focus:border-black transition-colors rounded-sm"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors rounded-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
