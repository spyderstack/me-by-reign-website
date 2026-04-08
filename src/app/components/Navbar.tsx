import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load cart count from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(updatedCart.reduce((sum: number, item: any) => sum + item.quantity, 0));
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const navItems = [
    { label: "Catalog", path: "/catalog" },
    { label: "Our Story", path: "/our-story" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white text-black shadow-sm"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="font-serif text-2xl tracking-widest font-semibold uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aura
              </span>
              <span className={`text-[10px] uppercase tracking-[0.3em] font-medium mt-1 ${isScrolled ? "text-[#C5A059]" : "text-[#C5A059]"}`}>
                Botanicals
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm tracking-[0.15em] uppercase hover:text-[#C5A059] transition-colors duration-300 ${
                  location.pathname === item.path ? "text-[#C5A059]" : isScrolled ? "text-gray-900" : "text-gray-100"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className={`hover:text-[#C5A059] transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}`}>
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className={`hover:text-[#C5A059] transition-colors duration-300 relative ${isScrolled ? "text-gray-900" : "text-white"}`}>
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#C5A059] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden ${isScrolled ? "text-gray-900" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <span className="font-serif text-2xl tracking-widest uppercase text-black">Aura</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col px-6 py-8 space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif text-black hover:text-[#C5A059]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
