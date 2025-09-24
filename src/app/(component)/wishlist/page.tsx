"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist, WishlistItem } from "@/src/context/wishlistContext";
import { removeFromWishlist } from "@/src/Api/wishlist/deleteWishlist.api";
import { toast } from "sonner"; 

export default function WishlistPage() {
  const { wishlist, removeItem } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات أو تحديث عند الحاجة
    setLoading(false);
  }, []);

  const handleRemove = async (productId: string) => {
    await removeFromWishlist(productId);
    removeItem(productId);
    toast.error("Removed from Wishlist ❌");
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 flex items-center justify-center gap-3">
          My Wishlist <i className="fas fa-heart text-pink-500"></i>
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <div
                key={skeleton}
                className="animate-pulse border rounded-2xl p-6 bg-white shadow-md"
              >
                <div className="h-56 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <i className="fas fa-heart-broken text-6xl text-gray-400 mb-6"></i>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Start adding your favorite products to see them here.
            </p>
            <Link
              href="/products"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <i className="fas fa-shopping-bag mr-2"></i> Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlist.map((item: WishlistItem) => (
              <div
                key={item._id}
                className="border rounded-2xl p-6 shadow-lg bg-white flex flex-col hover:shadow-2xl transition duration-300 relative"
              >
                <div className="relative w-full h-60 mb-5">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    className="object-contain rounded-lg"
                  />
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="absolute top-3 right-3 bg-white border border-gray-300 text-gray-600 p-2 rounded-full shadow hover:bg-red-500 hover:text-white hover:border-red-500 transition"
                    title="Remove from Wishlist"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                  {item.product.title}
                </h2>
                <p className="text-gray-500 mb-3 line-clamp-2 text-sm">
                  {item.product.description || "No description available."}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-pink-600">
                    ${item.price}
                  </span>
                  <Link
                    href={`/products/${item.product._id}`}
                    className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <i className="fas fa-eye mr-2"></i> View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
