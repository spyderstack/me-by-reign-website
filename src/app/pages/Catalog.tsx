import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Rose & Chamomile Face Serum",
    category: "Skincare",
    price: 78,
    image: "https://images.unsplash.com/photo-1768483018807-bd0b9ab86539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Luxurious botanical serum with organic rose and chamomile"
  },
  {
    id: 2,
    name: "Botanical Night Cream",
    category: "Skincare",
    price: 92,
    image: "https://images.unsplash.com/photo-1764599955087-7095c3540510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Deep nourishing cream with natural botanicals"
  },
  {
    id: 3,
    name: "Lavender & Sage Cleanser",
    category: "Skincare",
    price: 64,
    image: "https://images.unsplash.com/photo-1775126454577-4846f3e55cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Gentle cleansing formula with lavender and sage extract"
  },
  {
    id: 4,
    name: "Eucalyptus Body Oil",
    category: "Skincare",
    price: 56,
    image: "https://images.unsplash.com/photo-1573575155376-b5010099301b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Refreshing eucalyptus-infused body oil"
  },
  {
    id: 5,
    name: "Ceramic Diffuser Vessel",
    category: "Home Decor",
    price: 124,
    image: "https://images.unsplash.com/photo-1771287490580-0d75787b278a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yJTIwbmF0dXJhbCUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzU2ODczNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Handcrafted ceramic vessel with natural reed diffuser"
  },
  {
    id: 6,
    name: "Botanical Wall Art Set",
    category: "Home Decor",
    price: 186,
    image: "https://images.unsplash.com/photo-1774202471140-f5c8f7512c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yJTIwbmF0dXJhbCUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzU2ODczNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Curated set of framed botanical prints"
  },
  {
    id: 7,
    name: "Artisan Dried Flower Arrangement",
    category: "Home Decor",
    price: 98,
    image: "https://images.unsplash.com/photo-1764430501059-ca369b3ff8fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yJTIwbmF0dXJhbCUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzU2ODczNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Elegant dried flower arrangement in a glass vase"
  },
  {
    id: 8,
    name: "Minimalist Ceramic Vase",
    category: "Home Decor",
    price: 142,
    image: "https://images.unsplash.com/photo-1772442364571-c340bcc2efc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yJTIwbmF0dXJhbCUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzU2ODczNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Hand-textured ceramic vase with natural finish"
  },
];

export function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Skincare", "Home Decor"];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1629195068010-1389c5ff86e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzcGElMjB3ZWxsbmVzcyUyMGx1eHVyeSUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Luxury spa interior"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1
              className="text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Catalog
            </h1>
            <p
              className="text-gray-200 max-w-2xl mx-auto text-lg"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Handcrafted botanical treasures for body and home
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-6 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 text-sm tracking-[0.15em] uppercase transition-all ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-white text-black w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C5A059] hover:text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="px-2">
                  <p
                    className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {product.category}
                  </p>
                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <p
                    className="text-black"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    ${product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
