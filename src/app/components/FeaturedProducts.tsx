import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Golden Elixir Serum",
    category: "Skincare",
    price: "$120.00",
    image:
      "https://images.unsplash.com/photo-1743309026555-97f545a08490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBtaW5pbWFsJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzc1NDA1NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Oat & Honey Artisanal Soap",
    category: "Skincare",
    price: "$28.00",
    image:
      "https://images.unsplash.com/photo-1622989107967-1b74cc324bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHNvYXAlMjBuYXR1cmFsJTIwbHV4dXJ5fGVufDF8fHx8MTc3NTQwNTczOHww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "New Arrival",
  },
  {
    id: 3,
    name: "Noir Fig & Amber Candle",
    category: "Home Decor",
    price: "$85.00",
    image:
      "https://images.unsplash.com/photo-1760804876250-605a3cd49ede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc2NlbnRlZCUyMGNhbmRsZSUyMGhvbWUlMjBkZWNvcnxlbnwxfHx8fDE3NzU0MDU3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Limited Edition",
  },
  {
    id: 4,
    name: "Minimalist Sculptural Vase",
    category: "Home Decor",
    price: "$150.00",
    image:
      "https://images.unsplash.com/photo-1762553395050-ec394919a6ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2VyYW1pYyUyMHZhc2UlMjBlbGVnYW50fGVufDF8fHx8MTc3NTQwNTczOHww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Signature",
  },
];

export function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-white" id="collection" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2
              className="text-4xl md:text-5xl font-serif text-black leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Curated Essentials
            </h2>
            <p
              className="text-gray-600 text-lg leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Discover our exclusive selection of handmade skincare and home
              decor, crafted with the finest natural ingredients and utmost care.
            </p>
          </div>
          <a
            href="#shop"
            className="group flex items-center gap-2 text-black hover:text-[#C5A059] transition-colors uppercase tracking-widest text-xs font-semibold whitespace-nowrap pb-2 border-b border-black hover:border-[#C5A059]"
          >
            View Entire Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-50">
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-black">
                    {product.tag}
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Hover Add to Cart Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20">
                  <button className="w-full bg-black text-white hover:bg-[#C5A059] transition-colors py-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold shadow-lg">
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
                {/* Gradient Overlay for hover button visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="flex-grow flex flex-col">
                <p
                  className="text-gray-500 text-[10px] uppercase tracking-widest mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.category}
                </p>
                <h3
                  className="text-lg font-serif text-black mb-2 group-hover:text-[#C5A059] transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-gray-900 font-medium text-sm mt-auto"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
