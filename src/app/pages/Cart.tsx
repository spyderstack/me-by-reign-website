import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router";

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 12;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
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
            to="/catalog"
            className="inline-block bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
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
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
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
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
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
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-black transition-colors h-fit"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-4 border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
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
              to="/catalog"
              className="inline-block text-black hover:text-[#C5A059] transition-colors text-sm uppercase tracking-[0.15em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 sticky top-24">
              <h2
                className="text-2xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-[#C5A059]">
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
                className="w-full bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors mb-4"
                onClick={() => alert("Checkout functionality would be implemented here")}
              >
                Proceed to Checkout
              </button>

              <div className="pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
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
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-start gap-3">
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
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-start gap-3">
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
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
