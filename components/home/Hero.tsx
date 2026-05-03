// 'use client'

// import Link from 'next/link'
// import Image from 'next/image'
// import { motion } from 'motion/react'
// import { ArrowRight } from '@phosphor-icons/react'

// export function Hero() {
//   return (
//     <section
//       className="relative h-screen bg-black overflow-hidden flex items-center justify-center"
//       id="hero-section"
//     >
//       {/* Background Image s */}
//       <div className="absolute inset-0 scale-105 z-0">
//         <Image
//           //src="https://images.unsplash.com/photo-1629195068010-1389c5ff86e4?auto=format&fit=crop&q=80&w=1920"
//           //src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           //src="/images/heroimage.png"
//           //src="/images/background2.jpeg"
//           src="/images/reignpic.png"
//           //src="https://unsplash.com/photos/white-ceramic-round-plate-beside-white-ceramic-teacup-on-brown-wooden-table-a-LwvEw6TiM"
//           alt="ME byReign — Artisan handmade skincare and home decor"
//           fill
//           sizes="100vw"
//           className="object-cover object-center"
//           priority
//         />
//       </div>

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/50 z-10" />

//       {/* Content */}
//       <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 mt-44 md:mt-0">
//         {/* Headline */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-3xl md:text-7xl lg:text-5xl font-serif text-white leading-tight mb-6"
//           style={{ fontFamily: "'Playfair Display', serif" }}
//         >
//           It's All About <span className="text-[70px] italic font-light">ME...byReign</span>.
//           <br />
//         </motion.h1>

//         {/* Body */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="text-gray-200 text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto mb-10"
//           style={{ fontFamily: "'Montserrat', sans-serif" }}
//         >
//           Handcrafted with botanical intention. Discover our collection of artisan skincare and luxury home décor.
//         </motion.p>

//         {/* CTAs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="flex flex-col sm:flex-row items-center justify-center gap-4"
//         >
//           <Link
//             href="/catalog"
//             className="group flex items-center gap-2 bg-white text-black px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 hover:bg-[#C5A059] hover:text-white"
//             style={{ fontFamily: "'Montserrat', sans-serif" }}
//             id="hero-shop-btn"
//           >
//             Shop the Collection
//             <ArrowRight
//               size={16}
//               weight="regular"
//               className="group-hover:translate-x-1 transition-transform duration-200"
//             />
//           </Link>
//           <Link
//             href="/our-story"
//             className="flex items-center gap-2 border border-white text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 hover:bg-white hover:text-black"
//             style={{ fontFamily: "'Montserrat', sans-serif" }}
//             id="hero-story-btn"
//           >
//             Our Story
//           </Link>
//         </motion.div>
//       </div>

//       {/* Scroll Indicator */}
      // <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-3">
      //   <p
      //     className="text-white text-[10px] uppercase tracking-widest"
      //     style={{ fontFamily: "'Montserrat', sans-serif" }}
      //   >
      //     Scroll
      //   </p>
      //   <div className="relative w-[1px] h-14 bg-white/20 overflow-hidden">
      //     <motion.div
      //       className="absolute top-0 left-0 w-full bg-[#C5A059]"
      //       style={{ height: '50%' }}
      //       animate={{ y: [0, '200%'] }}
      //       transition={{
      //         duration: 1.5,
      //         repeat: Infinity,
      //         ease: 'linear',
      //       }}
      //     />
      //   </div>
      // </div>
//     </section>
//   )
// }


'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'

export function Hero() {
  return (
    <section
      className="relative h-screen bg-black overflow-hidden flex items-center"
      id="hero-section"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 scale-105 z-0">
        <Image
          src="/images/newbackground.png"
          alt="ME byReign — Artisan handmade skincare and home decor"
          fill
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-right"
          priority
        />
        {/* Subtle gradient to blend image into the black background on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-10 hidden md:block" />
        {/* Mobile gradient to ensure readability and blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-transparent z-10 md:hidden" />
      </div>





      {/* Dark overlay for mobile readability */}
      <div className="absolute inset-0 bg-black/40 md:bg-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 text-left text-white w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24 pt-[400px] md:pt-0">
        <div className="max-w-[85%] sm:max-w-2xl">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-4 md:mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            It's All About <br />
            <span className="text-[32px] sm:text-[50px] md:text-[70px] lg:text-[80px] italic font-light block mt-2">ME...byReign</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-200 text-xs sm:text-base md:text-lg leading-relaxed font-light max-w-lg mb-6 md:mb-12"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Handcrafted with botanical intention. Discover our collection of artisan skincare and luxury home décor.
          </motion.p>


          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start justify-start gap-6"
          >
            <Link
              href="/catalog"
              className="group flex items-center gap-3 bg-white text-black px-10 py-5 uppercase tracking-widest text-xs font-semibold transition-all duration-300 hover:bg-[#C5A059] hover:text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="hero-shop-btn"
            >
              Shop the Collection
              <ArrowRight
                size={18}
                weight="regular"
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              href="/our-story"
              className="flex items-center gap-3 border border-white text-white px-10 py-5 uppercase tracking-widest text-xs font-semibold transition-all duration-300 hover:bg-white hover:text-black"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              id="hero-story-btn"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-3">
        <p
          className="text-white text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Scroll
        </p>
        <div className="relative w-[1px] h-14 bg-white/20 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#C5A059]"
            style={{ height: '50%' }}
            animate={{ y: [0, '200%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>
    </section>

  )
}
