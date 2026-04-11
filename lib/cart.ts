// ─── Cart Utility ─────────────────────────────────────────────────────────────
// localStorage-backed cart with a custom "cartUpdated" event for cross-component sync.
// When Shopify is connected, replace these functions with Shopify Cart API calls.

export interface CartItem {
  id: string         // product id (Shopify GID or mock)
  variantId: string  // variant id for Shopify checkout
  name: string
  category: string
  price: number      // numeric — strip "$" before storing
  image: string
  quantity: number
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]
  } catch {
    return []
  }
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}

// ─── Write ────────────────────────────────────────────────────────────────────

function persist(items: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(items))
  window.dispatchEvent(new Event('cartUpdated'))
}

export function addToCart(item: Omit<CartItem, 'quantity'>): void {
  const cart  = getCart()
  const index = cart.findIndex((i) => i.id === item.id)

  let updated: CartItem[]
  if (index >= 0) {
    // Already in cart — bump quantity
    updated = cart.map((i, idx) =>
      idx === index ? { ...i, quantity: i.quantity + 1 } : i
    )
  } else {
    updated = [...cart, { ...item, quantity: 1 }]
  }

  persist(updated)
}

export function updateCartQuantity(id: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(id)
    return
  }
  const updated = getCart().map((i) => (i.id === id ? { ...i, quantity } : i))
  persist(updated)
}

export function removeFromCart(id: string): void {
  persist(getCart().filter((i) => i.id !== id))
}
