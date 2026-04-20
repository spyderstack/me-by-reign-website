import { getAllArticles } from '@/lib/shopify/client'
import { BlogClient } from './BlogClient'

export const dynamic = 'force-dynamic'; // Ensures we fetch the latest articles

export default async function BlogPage() {
  const { articles } = await getAllArticles()
  
  return <BlogClient articles={articles} />
}
