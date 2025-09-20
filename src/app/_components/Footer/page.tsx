"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-16 pb-8 mt-10 font-poppins">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-white tracking-wide">
            My<span className="text-pink-500">Shop</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 mb-6">
            Elevating your shopping experience with premium products and 
            world-class customer service. Trust, Quality & Innovation.
          </p>
          <div className="flex gap-3">
            {["facebook-f", "twitter", "instagram", "linkedin-in"].map(
              (icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-white/10 hover:bg-pink-500 hover:text-white transition duration-300 transform hover:scale-110"
                >
                  <i className={`fab fa-${icon} text-sm`}></i>
                </a>
              )
            )}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">
            Shop
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/products" className="hover:text-pink-400 transition">All Products</a></li>
            <li><a href="/categories" className="hover:text-pink-400 transition">Categories</a></li>
            <li><a href="/offers" className="hover:text-pink-400 transition">Special Offers</a></li>
            <li><a href="/new" className="hover:text-pink-400 transition">New Arrivals</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/about" className="hover:text-pink-400 transition">About Us</a></li>
            <li><a href="/team" className="hover:text-pink-400 transition">Our Team</a></li>
            <li><a href="/careers" className="hover:text-pink-400 transition">Careers</a></li>
            <li><a href="/blog" className="hover:text-pink-400 transition">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/faq" className="hover:text-pink-400 transition">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-pink-400 transition">Shipping</a></li>
            <li><a href="/returns" className="hover:text-pink-400 transition">Returns</a></li>
            <li><a href="/contact" className="hover:text-pink-400 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">
            Newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe for the latest deals, updates and exclusive offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-pink-500 px-4 py-2 rounded-r-lg text-white font-semibold hover:bg-pink-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Payment & Copyright */}
      <div className="container mx-auto px-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-700 pt-6">
        {/* Payments */}
        <div className="flex gap-4 text-2xl text-gray-400">
          <i className="fab fa-cc-visa hover:text-blue-500 transition"></i>
          <i className="fab fa-cc-mastercard hover:text-red-500 transition"></i>
          <i className="fab fa-cc-paypal hover:text-blue-400 transition"></i>
          <i className="fab fa-cc-amex hover:text-indigo-400 transition"></i>
        </div>

        {/* Copy */}
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
