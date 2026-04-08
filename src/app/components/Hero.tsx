import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1629195068010-1389c5ff86e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBtaW5pbWFsJTIwZ29sZCUyMHdoaXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1NDA1NzQ0fDA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Luxury Spa Background"
          className="w-full h-full object-cover object-center scale-105"
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#C5A059] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Artisan Crafted Perfection
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Elevate Your <br />
          <span className="italic font-light">Ritual</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-200 max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-12 font-light"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Discover our curated collection of handmade skincare and artisanal home decor, 
          designed to transform your everyday routines into luxurious moments of tranquility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#skincare"
            className="group flex items-center gap-2 bg-white text-black px-8 py-4 hover:bg-[#C5A059] hover:text-white transition-all duration-300 uppercase tracking-widest text-xs font-semibold"
          >
            Shop Skincare
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#home-decor"
            className="group flex items-center gap-2 border border-white text-white px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs font-semibold"
          >
            Shop Decor
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-white text-[10px] uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-[#C5A059] absolute top-0 left-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
