'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Minus, Plus, X, ShoppingBag } from '@phosphor-icons/react'
import { useCart } from '@/components/providers/CartProvider'

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCart() {
  return (

    <div className="min-h-screen bg-white">


      <div
        className="bg-[#111] w-full"
        style={{ height: 'calc(var(--banner-height, 0px) + 80px)' }}
      />
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black via-[#2a2010] to-transparent pointer-events-none z-0" />


      <div className="text-center px-4 pt-20">
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
  const { cart, isLoading, updateItem, removeItem } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Reset checkout state when user navigates back to this page
  useEffect(() => {
    setIsCheckingOut(false)
  }, [])

  const handleUpdateQuantity = async (lineId: string, qty: number) => {
    if (qty <= 0) {
      await removeItem(lineId)
    } else {
      await updateItem(lineId, qty)
    }
  }

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) return
    setIsCheckingOut(true)
    window.location.href = cart.checkoutUrl
  }

  // Handle Loading state for the initial fetch
  if (isLoading && !cart) {
    return (
      <div className="min-h-screen bg-white">


        <div
          className="bg-[#111] w-full"
          style={{ height: 'calc(var(--banner-height, 0px) + 80px)' }}
        />
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black via-[#2a2010] to-transparent pointer-events-none z-0" />
      </div>
    )
  }

  if (!cart || cart.lines.length === 0) return <EmptyCart />

  return (
    <div className="min-h-screen bg-white">


      <div
        className="bg-[#111] w-full"
        style={{ height: 'calc(var(--banner-height, 0px) + 80px)' }}
      />
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black via-[#2a2010] to-transparent pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black via-[#2a2010] to-transparent pointer-events-none z-0" />

        {/* Header */}
        <div className="mb-12 relative z-10">
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
            {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* ── Cart Items ────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.lines.map((line) => (
                <motion.div
                  key={line.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white p-6 flex gap-6 shadow-sm border border-gray-100"
                >
                  {/* Image */}
                  <div className="w-32 h-32 flex-shrink-0 bg-gray-50 overflow-hidden">
                    <img
                      src={line.image}
                      alt={line.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between mb-2">
                      <div>
                        <Link href={`/products/${line.handle}`} className="hover:text-[#C5A059] transition-colors">
                          <h3
                            className="text-xl leading-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {line.name}
                          </h3>
                        </Link>
                        {line.sellingPlan && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#faf7f2] border border-[#C5A059]/30 text-[#8c6b2d] text-[11px] tracking-wide font-medium">
                            <span>✨</span>
                            <span>{line.sellingPlan.name}</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(line.id)}
                        className="text-gray-400 hover:text-black transition-colors h-fit p-1"
                        id={`remove-${line.id}`}
                        aria-label={`Remove ${line.name}`}
                      >
                        <X size={20} weight="regular" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                      {/* Quantity */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Quantity</span>
                        <div className="flex items-center gap-4 border border-gray-100">
                          <button
                            onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30"
                            id={`qty-minus-${line.id}`}
                            disabled={isLoading}
                          >
                            <Minus size={14} weight="regular" />
                          </button>
                          <span
                            className="min-w-[20px] text-center text-sm"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30"
                            id={`qty-plus-${line.id}`}
                            disabled={isLoading}
                          >
                            <Plus size={14} weight="regular" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Subtotal</p>
                        <div className="flex items-baseline justify-end gap-2">
                          {line.compareAtPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {line.compareAtPrice}
                            </span>
                          )}
                          <p
                            className="text-xl font-medium text-black"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {line.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-3 text-black hover:text-[#C5A059] transition-colors text-xs uppercase tracking-[0.2em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="continue-shopping-link"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary ─────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div
              className="bg-white p-8 border border-gray-100 shadow-sm"
              style={{
                position: 'sticky',
                top: 'calc(var(--banner-height, 0px) + 100px)',
              }}
            >
              <h2
                className="text-2xl mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-sm">Items Subtotal</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="font-semibold">{cart.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-sm">Shipping</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-[#C5A059] font-semibold">Calculated at Checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl mb-10">
                <span style={{ fontFamily: "'Playfair Display', serif" }}>Estimated Total</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="font-semibold">
                  {cart.total}
                </span>
              </div>

              <button
                className={`w-full bg-black text-white px-8 py-5 uppercase tracking-widest text-[11px] font-bold transition-all duration-300 mb-6 ${isCheckingOut ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C5A059] hover:shadow-lg'
                  }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                id="checkout-btn"
                disabled={isCheckingOut || isLoading}
                onClick={handleCheckout}
              >
                {isCheckingOut ? 'Opening Secure Checkout...' : 'Proceed to Checkout'}
              </button>

              <div className="space-y-4 text-[10px] text-gray-400">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span className="uppercase tracking-widest font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span className="uppercase tracking-widest font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Tax and shipping calculated later</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
