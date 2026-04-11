import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductByHandle, getProductRecommendations } from '@/lib/shopify/client'
import { getProductByHandle as getMockDetail } from '@/lib/products-data'
import ProductDetailClient from './ProductDetailClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle)

  if (!product) return { title: 'Product Not Found' }

  const richDetail = getMockDetail(product.handle)
  const description = product.description || richDetail?.description || `Purchase ${product.name} from ME by Reign.`

  return {
    title: product.name,
    description: description,
    openGraph: {
      title: product.name,
      description: description,
      images: [{ url: product.image, alt: product.imageAlt }],
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

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
