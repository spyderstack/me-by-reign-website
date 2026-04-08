// app/catalog/[handle]/page.tsx
//
// This is the filtered collection route — e.g. /catalog/skincare
//
// Currently re-uses the same CatalogPage layout but pre-filters by handle.
// When Shopify is connected, replace mock data with:
//   const { products, title } = await getCollectionProducts({ handle })

import CatalogPage from '@/app/catalog/page'

// TODO: generate static params from real Shopify collections
// export async function generateStaticParams() {
//   const collections = await getAllCollections()
//   return collections.map((c) => ({ handle: c.handle }))
// }

export default function CollectionHandlePage({
  params,
}: {
  params: { handle: string }
}) {
  // For now, this just renders the full catalog page.
  // Once Shopify is live, pass `handle` into getCollectionProducts()
  // and render a filtered version of CatalogPage with server data.
  return <CatalogPage />
}