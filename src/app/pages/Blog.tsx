import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Ancient Art of Botanical Skincare",
    excerpt: "Exploring time-honored traditions from Mediterranean herbalists and how they inform our modern formulations.",
    date: "March 28, 2026",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1763742259246-80eb61e760d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Creating a Mindful Morning Ritual",
    excerpt: "How to transform your skincare routine into a grounding practice that sets the tone for your entire day.",
    date: "March 21, 2026",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1774887554034-c73a4edc3d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMGx1eHVyeSUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "The Power of Rose in Natural Beauty",
    excerpt: "Discover why rose has been treasured for centuries and how we harness its properties in our signature serum.",
    date: "March 14, 2026",
    category: "Ingredients",
    image: "https://images.unsplash.com/photo-1766599433288-f03a601e90c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Bringing Spa Energy Into Your Home",
    excerpt: "Simple ways to create a sanctuary atmosphere through scent, light, and intentional design.",
    date: "March 7, 2026",
    category: "Home",
    image: "https://images.unsplash.com/photo-1683640862718-c001169c8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxzcGElMjB3ZWxsbmVzcyUyMGx1eHVyeSUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Understanding Clean Beauty",
    excerpt: "What 'clean' really means, why it matters, and how to navigate the overwhelming world of natural skincare.",
    date: "February 28, 2026",
    category: "Education",
    image: "https://images.unsplash.com/photo-1764599955087-7095c3540510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "Seasonal Skincare: Spring Edition",
    excerpt: "Adjusting your routine as the seasons change to support your skin's evolving needs.",
    date: "February 21, 2026",
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1774348599868-8e4bec62eafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8bHV4dXJ5JTIwc2tpbmNhcmUlMjBwcm9kdWN0cyUyMG5hdHVyYWwlMjBib3RhbmljYWx8ZW58MXx8fHwxNzc1Njg3MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    readTime: "6 min read"
  }
];

export function Blog() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Thoughts on botanical beauty, wellness rituals, and creating sanctuary
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] text-[#C5A059] mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Featured • {blogPosts[0].category}
              </p>
              <h2
                className="text-4xl md:text-5xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {blogPosts[0].title}
              </h2>
              <p
                className="text-gray-600 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
                <span>{blogPosts[0].date}</span>
                <span>•</span>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <button className="group flex items-center gap-3 text-black hover:text-[#C5A059] transition-colors">
                <span
                  className="uppercase tracking-[0.15em] text-sm"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Read Article
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-4 pb-6">
                  <p
                    className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.category}
                  </p>
                  <h3
                    className="text-2xl mb-4 group-hover:text-[#C5A059] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-gray-600 mb-4 leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2
            className="text-4xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Never Miss an Article
          </h2>
          <p
            className="text-gray-400 mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Get our latest insights on botanical wellness delivered to your inbox
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#C5A059] transition-colors text-white placeholder:text-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-[#C5A059] text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
