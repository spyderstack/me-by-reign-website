require('dotenv').config({ path: '.env.local' })

async function check() {
  const query = `
    {
      products(first: 5) {
        nodes {
          handle
          title
          variants(first: 5) {
            nodes {
              title
              price { amount }
              selectedOptions { name value }
            }
          }
        }
      }
    }
  `
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query })
  })
  const json = await res.json()
  console.dir(json, { depth: null })
}
check()
