'use client'

export function NewsletterSection() {
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
          Sign up to receive 15% off your first order of luxury handcrafted botanical goods — plus exclusive rituals, new arrivals, and members-only offers.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
          id="newsletter-form"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white border border-gray-200 px-6 py-4 focus:outline-none focus:border-[#C5A059] transition-colors rounded-sm text-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            required
            id="newsletter-email-input"
          />
          <button
            type="submit"
            className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors duration-300 rounded-sm whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            id="newsletter-submit-btn"
          >
            Subscribe
          </button>
        </form>

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
