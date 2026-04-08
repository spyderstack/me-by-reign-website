import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#faf9f6] py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] relative w-full max-w-lg mx-auto lg:mr-auto lg:ml-0">
              <img
                src="https://images.unsplash.com/photo-1629195068010-1389c5ff86e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBtaW5pbWFsJTIwZ29sZCUyMHdoaXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1NDA1NzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Spa Philosophy"
                className="w-full h-full object-cover rounded-sm shadow-2xl"
              />
              {/* Decorative Element */}
              <div className="absolute -inset-4 border border-[#C5A059]/40 z-[-1] hidden sm:block" />
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <p
              className="text-[#C5A059] tracking-[0.2em] uppercase text-xs font-semibold mb-6 flex items-center gap-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span className="w-12 h-[1px] bg-[#C5A059]" /> Our Philosophy
            </p>
            
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-black leading-[1.2] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Handcrafted with Intention, Defined by Luxury
            </h2>
            
            <div 
              className="space-y-6 text-gray-600 leading-relaxed font-light"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                At Aura Botanicals, we believe that true luxury lies in the details. 
                Every product we offer is meticulously handcrafted by artisans who pour 
                their passion and expertise into creating something extraordinary.
              </p>
              <p>
                From our rich, nourishing skincare formulations created with pure, 
                ethically sourced botanical ingredients, to our elegantly sculpted home 
                decor pieces, our collection is designed to elevate your everyday rituals.
              </p>
              <p className="italic font-serif text-xl text-gray-800 border-l-2 border-[#C5A059] pl-6 my-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                "We don't just create products; we curate experiences that bring the tranquility of a world-class spa into the sanctuary of your home."
              </p>
            </div>
            
            <div className="mt-12">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Signature_of_John_Hancock.svg/1200px-Signature_of_John_Hancock.svg.png" 
                alt="Founder Signature" 
                className="w-48 opacity-40 grayscale contrast-200 sepia"
              />
              <p className="text-xs uppercase tracking-widest text-gray-500 mt-2 font-medium">Eleanor Vance, Founder</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
