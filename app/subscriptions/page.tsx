import { Metadata } from 'next'
import { getSubscriptionProducts } from '@/lib/shopify/client'
import { HeroSection } from '@/components/catalog/HeroSection'
import { SubscriptionCatalogCard } from '@/components/subscriptions/SubscriptionCatalogCard'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Curated Subscriptions — ME byReign',
  description:
    'Explore our bimonthly botanical subscriptions. Customize your body butter and artisanal soap selections with automatic member savings. Skip, pause, or cancel anytime.',
  openGraph: {
    title: 'Curated Subscriptions — ME byReign',
    description:
      'Explore our bimonthly botanical subscriptions. Customize your body butter and artisanal soap selections.',
    url: '/subscriptions',
    type: 'website',
  },
  alternates: {
    canonical: '/subscriptions',
  },
}

export const revalidate = 60

export default async function SubscriptionsPage() {
  const products = await getSubscriptionProducts()

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased pb-24">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Subscriptions', href: '/subscriptions' },
        ]}
      />

      {/* ── HERO (Same golden background image as Catalog) ── */}
      <HeroSection
        title="Subscriptions"
        eyebrow="Ritual Memberships"
        description="Bimonthly botanical rituals crafted for effortless self-care. Choose your preferred scents, enjoy exclusive savings, and experience fresh small-batch skincare delivered straight to your door."
      />

      {/* Subscription Catalog Grid */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pt-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {products.map((product, index) => (
              <SubscriptionCatalogCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#faf9f6] border border-gray-100 p-8 max-w-xl mx-auto">
            <h2
              className="text-2xl font-serif mb-3 text-black"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Subscription Plans Coming Soon
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Create your Silver and Gold subscription products with the Shopify Subscriptions app to see them appear here automatically.
            </p>
            <Link
              href="/catalog"
              className="inline-block px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-colors"
            >
              Explore Boutique Catalog
            </Link>
          </div>
        )}
      </section>

      {/* Membership Guarantees */}
      <section className="mt-20 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-gray-100 text-center">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Bimonthly Delivery
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Freshly handcrafted batches delivered every 2 months.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Tailored Scents
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Select your favorite whipped body butter and soap aromatics.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Total Flexibility
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Pause, skip deliveries, or cancel anytime with one click.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
