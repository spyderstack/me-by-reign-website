import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkle, EnvelopeOpen, Gift } from '@phosphor-icons/react/dist/ssr'
import { SubscribeForm } from '@/components/newsletter/SubscribeForm'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Join the Sanctuary | Email Newsletter',
  description:
    'Subscribe to ME byREIGN for private seasonal offerings, artisan botanical skincare rituals, and early access to limited-batch collections.',
  alternates: {
    canonical: '/subscribe',
  },
  openGraph: {
    title: 'Join the Sanctuary — ME byREIGN',
    description:
      'Receive private offerings, artisan skincare guidance, and priority access to limited handcrafted batches.',
    url: `${siteConfig.url}/subscribe`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'ME byREIGN Newsletter' }],
  },
}

const subscriberPerks = [
  {
    icon: Sparkle,
    title: 'First Access to Limited Batches',
    description:
      'Our artisanal body butters and soy candles are created in small, deliberate batches. Subscribers receive first reserve access before public releases.',
  },
  {
    icon: Gift,
    title: 'Private Offerings & Invitations',
    description:
      'Enjoy exclusive seasonal courtesies, private client gifts, and invitations to bespoke bundle events unavailable anywhere else.',
  },
  {
    icon: EnvelopeOpen,
    title: 'Artisan Rituals & Formulations',
    description:
      'Discover conscious botanical ingredients, sacred self-care guides, and intentional wellness traditions curated by Reign.',
  },
]

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-[#0E0E0E] text-white selection:bg-[#C5A059] selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#C5A059]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 blur-[120px] pointer-events-none" />

      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1.5 rounded-full mb-6">
          <Sparkle size={13} className="text-[#C5A059]" weight="fill" />
          <span
            className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            The Inner Sanctuary
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.15]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Subscribe to <span className="italic text-[#C5A059]">ME byREIGN</span>
        </h1>

        <p
          className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-12"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Join our community of discerning individuals who honor artisan craftsmanship,
          pure botanicals, and mindful living. Delivered with intention, never noise.
        </p>

        {/* Subscription Form Card */}
        <div className="relative max-w-xl mx-auto bg-[#151515] border border-white/10 rounded-sm p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" />

          <SubscribeForm
            variant="page"
            idPrefix="subscribe-page"
          />

        </div>
      </section>

      {/* Perks / Benefits Section */}
      <section className="relative py-20 border-t border-white/10 bg-[#111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              className="text-2xl sm:text-3xl font-medium text-white mb-4 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Privileges of Membership
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-4 opacity-70" />
            <p
              className="text-gray-400 text-sm leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Every communication is curated with care. Here is what awaits inside our newsletter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriberPerks.map((perk, index) => {
              const Icon = perk.icon
              return (
                <div
                  key={index}
                  className="bg-[#171717] border border-white/5 p-8 rounded-sm hover:border-[#C5A059]/40 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-sm bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-6">
                    <Icon size={24} weight="regular" />
                  </div>
                  <h3
                    className="text-lg text-white font-medium mb-3 tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {perk.title}
                  </h3>
                  <p
                    className="text-gray-400 text-sm leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {perk.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
