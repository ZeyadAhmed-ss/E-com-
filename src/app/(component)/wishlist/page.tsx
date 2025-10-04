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
   
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      removeItem(productId);
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                <span className="inline-block -mb-1 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                  Your Wishlist
                </span>
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Your saved products — keep them here and check back anytime.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
              >
                <i className="fas fa-shopping-bag text-gray-600"></i>
                <span className="text-sm font-medium text-gray-700">Browse products</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="animate-pulse bg-white rounded-2xl shadow border border-gray-100 p-4"
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="h-3 bg-gray-200 rounded mb-3 w-1/2" />
                <div className="h-10 bg-gray-200 rounded w-full" />
              </article>
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          /* Empty state */
          <section className="flex flex-col items-center justify-center py-24 text-center">
            {/* استخدم أي SVG أو صورة توضح الفكرة */}
            <div className="w-48 h-48 mb-6 rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 flex items-center justify-center shadow-lg">
              <i className="fas fa-heart text-5xl text-gray-300"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6 max-w-xl">
              Save items you love. When you're ready, come back here to review, compare and
              purchase your favorites.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <i className="fas fa-search"></i> Explore products
            </Link>
          </section>
        ) : (
          /* Grid of cards */
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item: WishlistItem) => (
              <article
                key={item._id}
                className="relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
                aria-labelledby={`prod-${item._id}`}
              >
                {/* top: image with elegant overlay + badge */}
                <div className="relative w-full h-56 sm:h-64 bg-gray-50">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />

                  {/* Gradient overlay subtle */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/6 to-transparent" />

                  {/* price badge top-left */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                    <span className="text-xs text-gray-600">EGP</span>
                    <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                  </div>

                  {/* remove button top-right */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    title="Remove"
                    className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/95 border border-gray-200 shadow hover:bg-red-500 hover:text-white transition"
                    aria-label={`Remove ${item.product.title} from wishlist`}
                  >
                    <i className="fas fa-heart-broken"></i>
                  </button>
                </div>

                {/* content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3
                    id={`prod-${item._id}`}
                    className="text-lg font-semibold text-gray-900 line-clamp-2"
                  >
                    {item.product.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">{item.product.category?.name}</p>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {item.product.description || "No description available."}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${item.product._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-lg shadow-md text-sm font-medium hover:scale-105 transition"
                    >
                      <i className="fas fa-eye"></i>
                      View
                    </Link>

                    <div className="flex items-center gap-2">
                      {/* Rating */}
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                        <i className="fas fa-star text-amber-400"></i>
                        <span className="text-sm text-gray-700">{item.product.ratingsAverage}</span>
                      </div>

                      {/* Add to cart small button (if you want) */}
                      <Link
                        href={`/cart`} // أو استبدلها بعمل add مباشرة
                        className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                        aria-label={`Go to cart`}
                      >
                        <i className="fas fa-shopping-cart"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* footer subtle */}
                <div className="px-5 pb-5 pt-1">
                  <div className="text-xs text-gray-400">Saved • {new Date().toLocaleDateString()}</div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
