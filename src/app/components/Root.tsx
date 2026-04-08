import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion, useScroll, useSpring } from "motion/react";

export function Root() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white selection:bg-[#C5A059] selection:text-white font-sans antialiased text-gray-900">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#C5A059] origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
