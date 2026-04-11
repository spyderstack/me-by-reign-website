'use server'

import { createCheckout } from './client'

export async function redirectToCheckout(items: { variantId: string; quantity: number }[]) {
  const checkoutUrl = await createCheckout(items)
  return checkoutUrl
}
