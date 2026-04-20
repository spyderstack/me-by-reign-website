import { Hero }              from '@/components/home/Hero'
import { FeaturedProducts }  from '@/components/home/FeaturedProducts'
import { EditorialBanner }   from '@/components/home/EditorialBanner'
import { Philosophy }        from '@/components/home/Philosophy'
import { BlogPreview }       from '@/components/home/BlogPreview'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { getAllProducts, getAllArticles } from '@/lib/shopify/client'

export const revalidate = 60

export default async function HomePage() {
  // Fetch first 4 products for the featured section
  const { products } = await getAllProducts({ first: 4 })
  // Fetch 3 most recent articles for the blog preview
  const { articles } = await getAllArticles({ first: 3 })

  return (
    <div className="min-h-screen bg-white antialiased text-gray-900">
      <main>
        <Hero />
        <FeaturedProducts initialProducts={products} />
        <EditorialBanner />
        <Philosophy />
        <BlogPreview posts={articles} />
        <NewsletterSection />
      </main>
    </div>
  )
}
