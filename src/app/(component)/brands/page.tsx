import React from "react";
import Link from "next/link";
import getAllBrands from "../../../Api/brands.api";

export default async function Brands() {
  const brands = await getAllBrands();

  if (!brands || brands.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-purple-100 border border-purple-300 text-purple-800 px-6 py-6 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-3xl font-bold mb-3">😕 Oops!</h2>
          <p className="text-lg">No brands found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-32 px-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
        Top Brands
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {brands.map((brand: any) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group flex flex-col items-center bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:border-pink-500 transition-all duration-300 p-4"
          >
            {/* Brand Image */}
            <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-50 overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-300">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Brand Name */}
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
              {brand.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
