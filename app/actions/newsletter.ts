'use server'

import {
  findCustomerByEmail,
  updateCustomerEmailMarketingConsent,
  createCustomerWithMarketingConsent,
} from '@/lib/shopify/admin-client'

/**
 * Server action to handle newsletter signups.
 * Uses the Shopify Admin GraphQL API when configured,
 * preserving customer records and updating marketing consent.
 */
export async function subscribeToNewsletter(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const adminToken =
    process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_API_TOKEN

  if (!email || !shopDomain) {
    return { success: false, message: 'Missing email or shop configuration.' }
  }

  // 1. If Admin token is available, use Shopify Admin GraphQL flow
  if (adminToken) {
    try {
      const existingCustomer = await findCustomerByEmail(email)

      if (existingCustomer) {
        const marketingState =
          existingCustomer.emailMarketingConsent?.marketingState ||
          existingCustomer.defaultEmailAddress?.marketingState

        if (marketingState === 'SUBSCRIBED') {
          return {
            success: true,
            status: 'already_subscribed',
            message: 'You are already subscribed to our newsletter.',
          }
        }

        const updateResult = await updateCustomerEmailMarketingConsent(
          existingCustomer.id,
          'SINGLE_OPT_IN'
        )

        if (updateResult.userErrors && updateResult.userErrors.length > 0) {
          return {
            success: false,
            message: updateResult.userErrors[0].message,
          }
        }

        return {
          success: true,
          status: 'subscribed',
          message: 'Thank you for joining our sanctuary.',
        }
      }

      // Customer does not exist yet
      const createResult = await createCustomerWithMarketingConsent(
        email,
        'SINGLE_OPT_IN'
      )

      if (createResult.userErrors && createResult.userErrors.length > 0) {
        const isDuplicate = createResult.userErrors.some((err) =>
          err.message?.toLowerCase().includes('already taken')
        )
        if (isDuplicate) {
          const recheck = await findCustomerByEmail(email)
          if (recheck) {
            await updateCustomerEmailMarketingConsent(recheck.id, 'SINGLE_OPT_IN')
            return {
              success: true,
              status: 'subscribed',
              message: 'Thank you for joining our sanctuary.',
            }
          }
        }
        return {
          success: false,
          message: createResult.userErrors[0].message,
        }
      }

      return {
        success: true,
        status: 'subscribed',
        message: 'Thank you for joining our sanctuary.',
      }
    } catch (adminError) {
      console.error('[subscribeToNewsletter] Admin API failed, falling back:', adminError)
    }
  }

  // 2. Fallback to /contact endpoint if Admin API token is not yet configured
  try {
    const response = await fetch(`https://${shopDomain}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        form_type: 'customer',
        utf8: '✓',
        'contact[email]': email,
        'contact[tags]': 'newsletter',
        'contact[context]': 'newsletter-signup',
      }),
    })

    if (response.ok || response.status === 302) {
      return { success: true, message: 'Thank you for joining our sanctuary.' }
    }

    return { success: false, message: 'Something went wrong. Please try again.' }
  } catch (error) {
    console.error('Newsletter fallback error:', error)
    return { success: false, message: 'Connection error. Please try again later.' }
  }
}
