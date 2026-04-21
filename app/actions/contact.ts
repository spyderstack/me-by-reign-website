'use server'

/**
 * Server action to handle dynamic contact form submissions to Shopify.
 * Messages submitted here will appear in the Shopify Admin and be emailed 
 * to the store's "Sender email" address.
 */
export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string
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
        form_type: 'contact',
        utf8: '✓',
        'contact[name]': name,
        'contact[email]': email,
        'contact[body]': `Subject: ${subject}\n\n${message}`,
      }),
    })

    // Shopify often returns a 302 redirect on success
    if (response.ok || response.status === 302) {
      return { success: true, message: 'Thank you for reaching out. We\'ll be in touch soon.' }
    }

    return { success: false, message: 'Something went wrong. Please try again.' }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, message: 'Connection error. Please try again later.' }
  }
}
