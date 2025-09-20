import getAllCategories from "../../../Api/category.api";
import Link from "next/link";
import React from "react";

export default async function Categories() {
  const data = await getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        Explore Categories
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {data?.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-400"
          >
            {/* Image */}
            <div className="relative w-full h-44 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Category Name */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
