import { Hero }              from '@/components/home/Hero'
import { FeaturedProducts }  from '@/components/home/FeaturedProducts'
import { EditorialBanner }   from '@/components/home/EditorialBanner'
import { Philosophy }        from '@/components/home/Philosophy'
import { BlogPreview }       from '@/components/home/BlogPreview'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white antialiased text-gray-900">
      <main>
        <Hero />
        <FeaturedProducts />
        <EditorialBanner />
        <Philosophy />
        <BlogPreview />
        <NewsletterSection />
      </main>
    </div>
  )
}
