import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We'll be in touch soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1630587342832-2d7d49860436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzcGElMjB3ZWxsbmVzcyUyMGx1eHVyeSUyMGludGVyaW9yJTIwZ29sZHxlbnwxfHx8fDE3NzU2ODczNjV8MA&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Spa interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            We'd love to hear from you. Whether you have a question about our products,
            need guidance on your routine, or just want to say hello.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-3xl md:text-4xl mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm uppercase tracking-[0.15em] text-gray-700 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 px-6 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm uppercase tracking-[0.15em] text-gray-700 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 px-6 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm uppercase tracking-[0.15em] text-gray-700 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 px-6 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm uppercase tracking-[0.15em] text-gray-700 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-gray-50 border border-gray-200 px-6 py-4 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h2
                  className="text-3xl md:text-4xl mb-8"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Visit Our Studio
                </h2>
                <p
                  className="text-gray-600 leading-relaxed mb-8"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Stop by our studio in Santa Fe to experience our full collection,
                  consult with our herbalists, and discover your perfect ritual.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <h3
                      className="text-sm uppercase tracking-[0.15em] mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Address
                    </h3>
                    <p className="text-gray-600">
                      128 Canyon Road<br />
                      Santa Fe, NM 87501
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <h3
                      className="text-sm uppercase tracking-[0.15em] mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Phone
                    </h3>
                    <p className="text-gray-600">+1 (505) 982-3456</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <h3
                      className="text-sm uppercase tracking-[0.15em] mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Email
                    </h3>
                    <p className="text-gray-600">hello@aurabotanicals.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h3
                  className="text-sm uppercase tracking-[0.15em] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Studio Hours
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>Monday – Friday: 10am – 6pm</p>
                  <p>Saturday: 11am – 5pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500 text-sm uppercase tracking-[0.15em]">
            Map integration placeholder
          </p>
        </div>
      </section>
    </div>
  );
}
