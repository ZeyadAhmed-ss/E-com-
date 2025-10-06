"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/mnngzlgw", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-16 pb-8 font-poppins relative">
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
            <li>
              <Link href="/products" className="hover:text-pink-400 transition">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-pink-400 transition">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/offers" className="hover:text-pink-400 transition">
                Special Offers
              </Link>
            </li>
            <li>
              <Link href="/new" className="hover:text-pink-400 transition">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/about" className="hover:text-pink-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-pink-400 transition">
                Our Team
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-pink-400 transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-pink-400 transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/faq" className="hover:text-pink-400 transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-pink-400 transition">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-pink-400 transition">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-pink-400 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="relative">
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">
            Get In Touch
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Feel free to reach out with any questions or feedback.
            <p>My email is: zeyadlevi@gmail.com</p>
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="px-3 py-2 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="px-3 py-2 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="3"
              required
              className="px-3 py-2 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
            <button
              type="submit"
              className="bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Send Message
            </button>
          </form>

          {/* Toast */}
          {status === "success" && (
            <div className="absolute bottom-[-60px] left-0 right-0 bg-green-500 text-white text-center py-2 rounded-lg shadow-md animate-fade-in">
              ✅ Message sent successfully!
            </div>
          )}
          {status === "error" && (
            <div className="absolute bottom-[-60px] left-0 right-0 bg-red-500 text-white text-center py-2 rounded-lg shadow-md animate-fade-in">
              ❌ Something went wrong, please try again.
            </div>
          )}
        </div>
      </div>

      {/* Payments & Copyright */}
      <div className="container mx-auto px-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-700 pt-6">
        <div className="flex gap-4 text-2xl text-gray-400">
          <i className="fab fa-cc-visa hover:text-blue-500 transition"></i>
          <i className="fab fa-cc-mastercard hover:text-red-500 transition"></i>
          <i className="fab fa-cc-paypal hover:text-blue-400 transition"></i>
          <i className="fab fa-cc-amex hover:text-indigo-400 transition"></i>
        </div>

        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
