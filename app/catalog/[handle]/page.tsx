import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProducts, getCollectionProducts, getAllCollections } from '@/lib/shopify/client'
import { CatalogGrid } from '@/components/catalog/CatalogGrid'
import { HeroSection } from '@/components/catalog/HeroSection'
import { CollectionJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/categories'

export const revalidate = 60

/**
 * Pre-render all category and collection routes at build time.
 */
export async function generateStaticParams() {
  const categorySlugs = getAllCategorySlugs()
  const collections = await getAllCollections(50)

  const categoryParams = categorySlugs.map((slug) => ({ handle: slug }))
  const collectionParams = collections.map((c) => ({ handle: c.handle }))

  // Deduplicate handles
  const handlesMap = new Map<string, { handle: string }>()
  for (const item of [...categoryParams, ...collectionParams]) {
    handlesMap.set(item.handle.toLowerCase(), item)
  }

  return Array.from(handlesMap.values())
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const categoryConfig = getCategoryBySlug(handle)

  if (categoryConfig) {
    const title = `${categoryConfig.title} — Shop the Collection`
    const description = categoryConfig.description

    return {
      title,
      description,
      openGraph: {
        title: `${categoryConfig.title} — ME byReign`,
        description,
        url: `/catalog/${categoryConfig.slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${categoryConfig.title} — ME byReign`,
        description,
      },
      alternates: {
        canonical: `/catalog/${categoryConfig.slug}`,
      },
    }
  }

  // Fallback: Check if it's a Shopify Collection
  const collectionData = await getCollectionProducts({ handle })
  if (collectionData.title) {
    return {
      title: `${collectionData.title} — Shop the Collection`,
      description: `Explore our ${collectionData.title} collection. Handcrafted botanical skincare and luxury home essentials from ME byReign.`,
      openGraph: {
        title: `${collectionData.title} — ME byReign`,
        description: `Explore our ${collectionData.title} collection.`,
        url: `/catalog/${handle}`,
        type: 'website',
      },
      alternates: {
        canonical: `/catalog/${handle}`,
      },
    }
  }

  return {
    title: 'Collection Not Found — ME byReign',
  }
}

export default async function CatalogDynamicPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const categoryConfig = getCategoryBySlug(handle)

  // 1. Handle Category Route
  if (categoryConfig) {
    const { products: allProducts } = await getAllProducts({ first: 100 })

    // Filter products using categoryConfig.matches
    const categoryProducts = allProducts.filter((p) =>
      categoryConfig.matches(p.category || '')
    )

    return (
      <main className="min-h-screen bg-white text-gray-900 antialiased">
        <CollectionJsonLd
          name={categoryConfig.title}
          description={categoryConfig.description}
          url={`/catalog/${categoryConfig.slug}`}
        />
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', href: '/' },
            { name: 'Catalog', href: '/catalog' },
            { name: categoryConfig.title, href: `/catalog/${categoryConfig.slug}` },
          ]}
        />

        {/* ── HERO ── */}
        <HeroSection
          title={categoryConfig.title}
          eyebrow={categoryConfig.eyebrow}
          description={categoryConfig.description}
        />

        {/* ── INTERACTIVE GRID (Filter/Sort/Grid) ── */}
        <CatalogGrid
          initialProducts={categoryProducts}
          activeCategorySlug={categoryConfig.slug}
          title={categoryConfig.title}
        />
      </main>
    )
  }

  // 2. Handle Shopify Collection Route
  const { products, title } = await getCollectionProducts({
    handle,
    first: 100,
  })

  // If not found as collection or category, 404
  if (!products || !title || (products.length === 0 && title === handle)) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <CollectionJsonLd
        name={title}
        description={`Explore our ${title} collection from ME byReign.`}
        url={`/catalog/${handle}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Catalog', href: '/catalog' },
          { name: title, href: `/catalog/${handle}` },
        ]}
      />

      {/* ── HERO ── */}
      <HeroSection title={title} />

      {/* ── INTERACTIVE GRID ── */}
      <CatalogGrid
        initialProducts={products}
        activeCategorySlug={handle}
        title={title}
      />
    </main>
  )
}