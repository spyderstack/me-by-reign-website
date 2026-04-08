'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { ArrowRight, Bag } from '@phosphor-icons/react'

const products = [
  { 
    id: 1, 
    name: 'Golden Elixir Serum',         
    category: 'Skincare',    
    price: '$120.00', 
    tag: 'Best Seller',
    image: '/images/placeholder.png'
  },
  { 
    id: 2, 
    name: 'Oat & Honey Artisanal Soap',  
    category: 'Skincare',    
    price: '$28.00',  
    tag: 'New Arrival',
    image: '/images/placeholder.png'
  },
  { 
    id: 3, 
    name: 'Noir Fig & Amber Candle',      
    category: 'Home Decor',  
    price: '$85.00',  
    tag: 'Limited Edition',
    image: '/images/placeholder.png'
  },
  { 
    id: 4, 
    name: 'Minimalist Sculptural Vase',   
    category: 'Home Decor',  
    price: '$150.00', 
    tag: 'Signature',
    image: '/images/placeholder.png'
  },
]

export function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-white py-32" id="featured-products" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2
              className="text-4xl md:text-5xl font-serif text-black leading-tight mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Curated Essentials
            </h2>
            <p
              className="text-gray-600 text-lg font-light"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Handpicked favourites — crafted for your ritual.
            </p>
          </div>
          <Link
            href="/catalog"
            className="group flex items-center gap-2 text-black hover:text-[#C5A059] transition-colors uppercase tracking-widest text-xs font-semibold whitespace-nowrap pb-2 border-b border-black hover:border-[#C5A059]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            id="featured-products-view-all"
          >
            View Entire Collection
            <ArrowRight
              size={16}
              weight="regular"
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />

                {/* Tag Badge */}
                <div
                  className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-black z-10"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.tag}
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Add to Cart overlay */}
                <button
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 bg-black text-white py-4 text-xs uppercase tracking-widest font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#C5A059] z-10"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  id={`add-to-cart-${product.id}`}
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Bag size={16} weight="regular" />
                  Add to Cart
                </button>
              </div>

              {/* Product Info */}
              <p
                className="text-gray-500 text-[10px] uppercase tracking-widest mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {product.category}
              </p>
              <h3
                className="text-lg font-serif text-black hover:text-[#C5A059] transition-colors duration-200 mb-1 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h3>
              <p
                className="text-gray-900 font-medium text-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {product.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
