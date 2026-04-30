import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductByHandle, getProductRecommendations } from '@/lib/shopify/client'
import { getProductByHandle as getMockDetail } from '@/lib/products-data'
import ProductDetailClient from './ProductDetailClient'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle)

  if (!product) return { title: 'Product Not Found' }

  const richDetail = getMockDetail(product.handle)
  const description = product.seo?.description || product.description || richDetail?.description || `Shop ${product.name} from ME byReign — handcrafted with botanical intention.`

  return {
    title: product.name,
    description: description.slice(0, 160),
    openGraph: {
      title: `${product.name} — ME byReign`,
      description: description.slice(0, 160),
      type: 'website',
      images: [{ url: product.image, alt: product.imageAlt }],
      url: `/products/${product.handle}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — ME byReign`,
      description: description.slice(0, 160),
      images: [product.image],
    },
    alternates: {
      canonical: `/products/${resolvedParams.handle}`,
    },
  }
}

export const revalidate = 60

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle)

  if (!product) notFound()

  const relatedProducts = await getProductRecommendations(product.id)

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Catalog', href: '/catalog' },
          { name: product.name, href: `/products/${product.handle}` },
        ]}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  )
}
