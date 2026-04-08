'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Minus, Plus, X, ShoppingBag } from '@phosphor-icons/react'
import {
  CartItem,
  getCart,
  updateCartQuantity,
  removeFromCart,
} from '@/lib/cart'

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyCart() {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center"
      style={{ paddingTop: 'calc(var(--banner-height, 0px) + 80px)' }}
    >
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} weight="light" className="text-gray-400" />
        </div>
        <h2
          className="text-3xl md:text-4xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your cart is empty
        </h2>
        <p
          className="text-gray-600 mb-8"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Discover our collection of handcrafted botanical treasures
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors duration-300"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          id="empty-cart-explore-btn"
        >
          Explore Catalog
        </Link>
      </div>
    </div>
  )
}

// ─── Cart Page ────────────────────────────────────────────────────────────────
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const load = () => setCartItems(getCart())
    load()
    window.addEventListener('cartUpdated', load)
    return () => window.removeEventListener('cartUpdated', load)
  }, [])

  const handleUpdateQuantity = (id: string, qty: number) => {
    updateCartQuantity(id, qty)
  }

  const handleRemove = (id: string) => {
    removeFromCart(id)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping  = subtotal > 100 ? 0 : 12
  const total     = subtotal + shipping

  if (cartItems.length === 0) return <EmptyCart />

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ paddingTop: 'calc(var(--banner-height, 0px) + 80px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shopping Cart
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Cart Items ────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white p-6 flex gap-6"
                >
                  {/* Image */}
                  <div className="w-32 h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p
                          className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {item.category}
                        </p>
                        <h3
                          className="text-xl"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-400 hover:text-black transition-colors h-fit"
                        id={`remove-${item.id}`}
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={20} weight="regular" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-4 border border-gray-200">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          id={`qty-minus-${item.id}`}
                        >
                          <Minus size={16} weight="regular" />
                        </button>
                        <span
                          className="w-8 text-center"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          id={`qty-plus-${item.id}`}
                        >
                          <Plus size={16} weight="regular" />
                        </button>
                      </div>

                      {/* Price */}
                      <p
                        className="text-xl"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              href="/catalog"
              className="inline-block text-black hover:text-[#C5A059] transition-colors text-sm uppercase tracking-[0.15em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="continue-shopping-link"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary ─────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div
              className="bg-white p-8"
              style={{
                position: 'sticky',
                top: 'calc(var(--banner-height, 0px) + 100px)',
              }}
            >
              <h2
                className="text-2xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }}>Subtotal</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }}>Shipping</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p
                    className="text-sm text-[#C5A059]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Free shipping on orders over $100
                  </p>
                )}
              </div>

              <div className="flex justify-between text-xl mb-8">
                <span style={{ fontFamily: "'Playfair Display', serif" }}>Total</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                className="w-full bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors duration-300 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id="checkout-btn"
                onClick={() => alert('Checkout will be implemented with Shopify.')}
              >
                Proceed to Checkout
              </button>

              <div className="pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                {[
                  'Free shipping on orders over $100',
                  '30-day return policy',
                  'Secure payment processing',
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span style={{ fontFamily: "'Montserrat', sans-serif" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
