'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { NormalizedCart } from '@/lib/shopify/types'
import { getCart, cartCreate, cartLinesAdd, cartLinesUpdate, cartLinesRemove } from '@/lib/shopify/client'

interface CartContextType {
  cart: NormalizedCart | null
  isLoading: boolean
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_ID_KEY = 'reign_cart_id'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<NormalizedCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCart = useCallback(async (cartId: string) => {
    try {
      const data = await getCart(cartId)
      if (data) {
        setCart(data)
      } else {
        // If cartId is invalid or expired, clear it
        localStorage.removeItem(CART_ID_KEY)
        setCart(null)
      }
    } catch (error) {
      console.error('[CartProvider] Failed to fetch cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (cartId) {
      fetchCart(cartId)
    } else {
      setIsLoading(false)
    }
  }, [fetchCart])

  const addItem = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true)
    try {
      let currentCartId = localStorage.getItem(CART_ID_KEY)
      let updatedCart: NormalizedCart

      if (!currentCartId) {
        updatedCart = await cartCreate([{ variantId, quantity }])
        localStorage.setItem(CART_ID_KEY, updatedCart.id)
      } else {
        updatedCart = await cartLinesAdd(currentCartId, [{ variantId, quantity }])
      }

      setCart(updatedCart)
      // Custom event for any non-react components that might still listen (optional)
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('[CartProvider] Failed to add item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateItem = async (lineId: string, quantity: number) => {
    const currentCartId = localStorage.getItem(CART_ID_KEY)
    if (!currentCartId) return

    setIsLoading(true)
    try {
      const updatedCart = await cartLinesUpdate(currentCartId, [{ id: lineId, quantity }])
      setCart(updatedCart)
    } catch (error) {
      console.error('[CartProvider] Failed to update item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (lineId: string) => {
    const currentCartId = localStorage.getItem(CART_ID_KEY)
    if (!currentCartId) return

    setIsLoading(true)
    try {
      const updatedCart = await cartLinesRemove(currentCartId, [lineId])
      setCart(updatedCart)
    } catch (error) {
      console.error('[CartProvider] Failed to remove item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshCart = async () => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (cartId) {
      await fetchCart(cartId)
    }
  }

  return (
    <CartContext.Provider value={{ cart, isLoading, addItem, updateItem, removeItem, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
