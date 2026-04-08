import React from "react";
import { motion } from "motion/react";

export function OurStory() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-black" />
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1761746556491-d8c0123a6f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Botanical ingredients"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl text-white mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Born from a deep reverence for nature's wisdom and centuries-old botanical traditions
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl md:text-5xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Beginning
              </h2>
              <p
                className="text-gray-600 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Aura Botanicals was founded in 2018 by herbalist and aromatherapist Elena Martinez,
                who spent years studying ancient botanical practices across the Mediterranean and Asia.
                Frustrated by the synthetic ingredients dominating the wellness industry, she set out
                to create a collection that honored the purity and potency of nature.
              </p>
              <p
                className="text-gray-600 text-lg leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Each product is handcrafted in small batches using organic, sustainably sourced botanicals.
                We work directly with farmers and foragers who share our commitment to ethical, regenerative practices.
              </p>
            </motion.div>

            <div className="relative h-96 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1770872937123-2004ca6d970d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3RzJTIwbmF0dXJhbCUyMGJvdGFuaWNhbHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Woman with botanical"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl md:text-5xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our Philosophy
              </h2>
              <p
                className="text-gray-600 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                We believe luxury is not about excess—it's about essence. It's the weight of a
                perfectly balanced oil in your palm. The way a room transforms with the subtle
                presence of natural fragrance. The ritual of caring for yourself with ingredients
                you can name and trust.
              </p>
              <p
                className="text-gray-600 text-lg leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Our formulations draw from herbalism, aromatherapy, and traditional spa practices,
                refined through modern understanding of skin science and sustainability. Every
                ingredient serves a purpose. Nothing is included for show.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl text-center mb-20"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Transparency",
                description: "Every ingredient is listed. Every source is traceable. No secrets, no compromises."
              },
              {
                title: "Sustainability",
                description: "Regenerative farming practices, minimal packaging, carbon-neutral shipping."
              },
              {
                title: "Craftsmanship",
                description: "Small-batch production. Hand-poured. Hand-labeled. Made with intention."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3
                  className="text-2xl mb-4 text-[#C5A059]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-gray-400 leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl md:text-6xl mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Welcome to the sanctuary
          </h2>
          <p
            className="text-gray-600 text-lg leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            We're honored to be part of your daily rituals. Thank you for choosing
            products made with care, intention, and respect for the earth.
          </p>
        </div>
      </section>
    </div>
  );
}
