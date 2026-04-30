import { Metadata } from 'next'
import { getArticleByHandle, getAllArticles } from '@/lib/shopify/client'
import { BlogPostClient } from './BlogPostClient'
import { notFound } from 'next/navigation'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getArticleByHandle(resolvedParams.slug)

  if (!post) return { title: 'Post Not Found' }

  const description =
    post.excerptHtml?.replace(/<[^>]+>/g, '').slice(0, 160) ||
    `Read "${post.title}" on the ME byReign journal.`

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.title }] : [],
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const post = await getArticleByHandle(resolvedParams.slug)
  if (!post) notFound()

  // Get related articles (same category, exclude current)
  const { articles: allArticles } = await getAllArticles({ first: 10 })
  const related = allArticles
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2)

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerptHtml?.replace(/<[^>]+>/g, '').slice(0, 160) || ''}
        url={`/blog/${post.slug}`}
        image={post.image}
        datePublished={post.date}
        author={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Journal', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <BlogPostClient post={post} related={related} />
    </>
  )
}
