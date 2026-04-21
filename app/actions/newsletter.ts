'use server'

/**
 * Server action to handle newsletter signups by submitting to Shopify's standard /contact endpoint.
 * This method adds the customer to the Shopify email marketing list without needing a password.
 */
export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

  if (!email || !shopDomain) {
    return { success: false, message: 'Missing email or shop configuration.' }
  }

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

    // Shopify /contact often returns a 302 or 200 regardless of success on the backend,
    // but as long as it didn't throw an error, we consider the attempt made.
    if (response.ok || response.status === 302) {
      return { success: true, message: 'Thank you for joining our sanctuary.' }
    }

    return { success: false, message: 'Something went wrong. Please try again.' }
  } catch (error) {
    console.error('Newsletter error:', error)
    return { success: false, message: 'Connection error. Please try again later.' }
  }
}
