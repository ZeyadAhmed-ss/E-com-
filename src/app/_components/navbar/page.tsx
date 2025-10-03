"use client";
import { useCart } from "@/src/context/cartitemContext";
import { useWishlist } from "@/src/context/wishlistContext";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartList } = useCart();
  const { wishlistCount } = useWishlist();

  // حساب مجموع العناصر في الكارت
  const totalCartItems = cartList.reduce((acc, item) => acc + item.count, 0);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-indigo-700 tracking-wide cursor-pointer hover:scale-105 transition-transform duration-300">
          <i className="fas fa-shopping-cart bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"></i>
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            FreshCart
          </span>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div
          className="lg:hidden text-2xl text-gray-700 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 text-gray-700 font-medium text-lg">
          {["Home", "Products", "Categories", "Brands"].map((item, index) => (
            <li key={index} className="relative">
              <Link
                href={item === "Home" ? "/home" : `/${item.toLowerCase()}`}
                className="relative group transition-colors block"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side (Cart + Wishlist + Auth Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative text-2xl text-gray-600 hover:text-pink-500 transition-colors duration-300"
          >
            <i className="fas fa-heart"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative text-2xl text-gray-600 hover:text-indigo-500 transition-colors duration-300"
          >
            <i className="fas fa-shopping-basket"></i>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-800 font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-lg truncate max-w-[150px]">
                {session.user?.name}
              </span>
              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className={`px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 ${
                  isLoggingOut
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-105"
                }`}
              >
                {isLoggingOut ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Logging out...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-out-alt"></i>
                    Sign Out
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/signup"
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-user-plus"></i> sign up
              </Link>
              <Link
                href="/signin"
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-sign-in-alt"></i> Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 gap-6">
          {/* Links */}
          <ul className="flex flex-col gap-4 text-gray-700 font-medium text-lg">
            {["Home", "Products", "Categories", "Brands"].map((item, index) => (
              <li key={index}>
                <Link
                  href={item === "Home" ? "/home" : `/${item.toLowerCase()}`}
                  className="block hover:text-indigo-600 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="border-gray-200 my-4" />

          {/* Wishlist + Cart */}
          <div className="flex gap-6 text-2xl">
            <Link
              href="/wishlist"
              className="relative text-gray-600 hover:text-pink-500 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-heart"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative text-gray-600 hover:text-indigo-500 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-shopping-basket"></i>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-indigo-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 my-4" />

          {/* Auth Section */}
          {status === "authenticated" ? (
            <div className="flex flex-col gap-3">
              <span className="text-gray-800 font-semibold text-lg">
                {session.user?.name}
              </span>
              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className={`px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 justify-center ${
                  isLoggingOut
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-105"
                }`}
              >
                {isLoggingOut ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Out...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-out-alt"></i>
                    sign Out
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/signup"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-user-plus"></i> signup
              </Link>
              <Link
                href="/signin"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-sign-in-alt"></i> Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
