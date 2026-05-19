'use server'

import { sendContactNotification } from '@/lib/email'

/**
 * Server action to handle contact form submissions via custom email notification.
 */
export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!email || !message) {
    return { success: false, message: 'Missing email or message.' }
  }

  try {
    const result = await sendContactNotification({
      name: name || 'A Customer',
      email,
      subject: subject || 'No Subject',
      message,
    });

    if (result.success) {
      return { success: true, message: 'Thank you for reaching out. We\'ll be in touch soon.' }
    }

    return { success: false, message: 'Something went wrong. Please try again.' }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, message: 'Connection error. Please try again later.' }
  }
}
