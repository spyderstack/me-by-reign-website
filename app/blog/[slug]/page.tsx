import { getArticleByHandle, getAllArticles } from '@/lib/shopify/client'
import { BlogPostClient } from './BlogPostClient'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const post = await getArticleByHandle(resolvedParams.slug)
  if (!post) notFound()

  // Get related articles (same category, exclude current)
  // We fetch a few recent articles to filter from.
  const { articles: allArticles } = await getAllArticles({ first: 10 })
  const related = allArticles
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2)

  return <BlogPostClient post={post} related={related} />
}
