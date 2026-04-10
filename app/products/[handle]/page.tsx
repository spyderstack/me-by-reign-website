import { notFound } from 'next/navigation'
import { getProductByHandle } from '@/lib/products-data'
import ProductDetailClient from './ProductDetailClient'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const resolvedParams = await params;
  const product = getProductByHandle(resolvedParams.handle)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
