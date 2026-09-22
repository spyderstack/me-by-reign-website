// ─── Shopify Admin API GraphQL Client (Server-Only) ──────────────────────────
//
// This module interacts with the Shopify Admin GraphQL API to securely manage
// customer records and email marketing consent.
//
// SETUP: Add to .env.local:
//   SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//   (or SHOPIFY_ADMIN_API_TOKEN)
//   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
//
// REQUIRED ACCESS SCOPES:
//   - read_customers
//   - write_customers
//
// NEVER import or run this file on the client side.

const SHOPIFY_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const ADMIN_TOKEN =
  process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_API_TOKEN
const ADMIN_API_VERSION =
  process.env.SHOPIFY_ADMIN_API_VERSION || '2024-07'

export interface ShopifyAdminCustomer {
  id: string
  email?: string | null
  emailMarketingConsent?: {
    marketingState?: 'NOT_SUBSCRIBED' | 'PENDING' | 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'REDACTED' | 'INVALID' | null
    marketingOptInLevel?: 'SINGLE_OPT_IN' | 'CONFIRMED_OPT_IN' | 'UNKNOWN' | null
    consentUpdatedAt?: string | null
  } | null
  defaultEmailAddress?: {
    emailAddress?: string | null
    marketingState?: 'NOT_SUBSCRIBED' | 'PENDING' | 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'REDACTED' | 'INVALID' | null
    marketingOptInLevel?: 'SINGLE_OPT_IN' | 'CONFIRMED_OPT_IN' | 'UNKNOWN' | null
  } | null
}

export interface AdminGraphQLUserError {
  field?: string[]
  message: string
}

/**
 * Low-level server-side fetch wrapper for the Shopify Admin GraphQL API.
 */
export async function shopifyAdminFetch<T = unknown>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  if (!SHOPIFY_DOMAIN) {
    throw new Error(
      '[Shopify Admin] Missing store domain. Please configure NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN in .env.local'
    )
  }

  if (!ADMIN_TOKEN) {
    throw new Error(
      '[Shopify Admin] Missing Admin API access token. Please configure SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local (requires read_customers, write_customers scopes).'
    )
  }

  if (ADMIN_TOKEN.startsWith('shpss_')) {
    throw new Error(
      '[Shopify Admin] Invalid token type: The value provided in SHOPIFY_ADMIN_ACCESS_TOKEN starts with "shpss_", which is an App Client Secret (shared secret). The Admin API requires an Admin Access Token, which starts with "shpat_".'
    )
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => '')
    throw new Error(`[Shopify Admin] HTTP ${res.status}: ${res.statusText} - ${errorText}`)
  }

  const json = await res.json()

  if (json.errors && json.errors.length > 0) {
    console.error('[Shopify Admin] GraphQL errors:', json.errors)
    throw new Error(json.errors[0]?.message || 'Shopify Admin GraphQL error')
  }

  return json.data as T
}

// ─── GraphQL Operations ──────────────────────────────────────────────────────

const SEARCH_CUSTOMER_BY_EMAIL_QUERY = `
  query SearchCustomerByEmail($query: String!) {
    customers(first: 1, query: $query) {
      nodes {
        id
        email
        emailMarketingConsent {
          marketingState
          marketingOptInLevel
          consentUpdatedAt
        }
      }
    }
  }
`

const UPDATE_EMAIL_MARKETING_CONSENT_MUTATION = `
  mutation CustomerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer {
        id
        emailMarketingConsent {
          marketingState
          marketingOptInLevel
          consentUpdatedAt
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CREATE_CUSTOMER_MUTATION = `
  mutation CustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        emailMarketingConsent {
          marketingState
          marketingOptInLevel
          consentUpdatedAt
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

// ─── Business Logic Functions ────────────────────────────────────────────────

/**
 * Searches Shopify for an existing customer with the given email address.
 * Matches both full accounts and guest purchasers.
 */
export async function findCustomerByEmail(
  email: string
): Promise<ShopifyAdminCustomer | null> {
  const normalizedEmail = email.trim().toLowerCase()
  const searchQuery = `email:"${normalizedEmail}"`

  const data = await shopifyAdminFetch<{
    customers: { nodes: ShopifyAdminCustomer[] }
  }>({
    query: SEARCH_CUSTOMER_BY_EMAIL_QUERY,
    variables: { query: searchQuery },
  })

  const customer = data.customers?.nodes?.[0]
  if (!customer) return null

  // Ensure exact match in case query returned multiple prefix matches
  const customerEmail =
    customer.email?.trim().toLowerCase() ||
    customer.defaultEmailAddress?.emailAddress?.trim().toLowerCase()

  if (customerEmail && customerEmail !== normalizedEmail) {
    // Exact match safeguard
    return null
  }

  return customer
}

/**
 * Updates an existing customer's email marketing consent state to SUBSCRIBED.
 */
export async function updateCustomerEmailMarketingConsent(
  customerId: string,
  optInLevel: 'SINGLE_OPT_IN' | 'CONFIRMED_OPT_IN' = 'SINGLE_OPT_IN'
): Promise<{ customer: ShopifyAdminCustomer | null; userErrors: AdminGraphQLUserError[] }> {
  const data = await shopifyAdminFetch<{
    customerEmailMarketingConsentUpdate: {
      customer: ShopifyAdminCustomer | null
      userErrors: AdminGraphQLUserError[]
    }
  }>({
    query: UPDATE_EMAIL_MARKETING_CONSENT_MUTATION,
    variables: {
      input: {
        customerId,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
          marketingOptInLevel: optInLevel,
        },
      },
    },
  })

  return data.customerEmailMarketingConsentUpdate
}

/**
 * Creates a new customer record with the given email and email marketing consent SUBSCRIBED.
 * Does NOT set password or create a customer login account.
 */
export async function createCustomerWithMarketingConsent(
  email: string,
  optInLevel: 'SINGLE_OPT_IN' | 'CONFIRMED_OPT_IN' = 'SINGLE_OPT_IN'
): Promise<{ customer: ShopifyAdminCustomer | null; userErrors: AdminGraphQLUserError[] }> {
  const normalizedEmail = email.trim().toLowerCase()

  const data = await shopifyAdminFetch<{
    customerCreate: {
      customer: ShopifyAdminCustomer | null
      userErrors: AdminGraphQLUserError[]
    }
  }>({
    query: CREATE_CUSTOMER_MUTATION,
    variables: {
      input: {
        email: normalizedEmail,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
          marketingOptInLevel: optInLevel,
        },
        tags: ['newsletter', 'website-signup'],
      },
    },
  })

  return data.customerCreate
}
