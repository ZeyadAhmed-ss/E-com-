import React, { JSX } from "react";
import Link from "next/link";
import { BrandResponse, ProductsResponse, Product } from "../../../interface/brands.interface";

interface BrandDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BrandDetail({ params }: BrandDetailPageProps): Promise<JSX.Element> {
  const { id } = params;

  try {
    // Get brand details
    const brandRes = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
      cache: "no-cache",
    });
    if (!brandRes.ok) throw new Error("Failed to fetch brand");
    const brandData: BrandResponse = await brandRes.json();
    const brand = brandData.data;

    // Get products of this brand
    const productsRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`, {
      cache: "no-cache",
    });
    if (!productsRes.ok) throw new Error("Failed to fetch products");
    const productsData: ProductsResponse = await productsRes.json();
    const products = productsData.data || [];

    return (
      <div className="container w-[80%] mx-auto my-32">
        {/* Brand Info */}
        <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-lg transition duration-300">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-auto object-contain p-8 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              {brand.name}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Explore all products from <span className="font-semibold">{brand.name}</span>.
            </p>
            <p className="text-gray-700">
              Created on:{" "}
              <span className="font-medium text-gray-900">
                {new Date(brand.createdAt).toLocaleDateString()}
              </span>
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="/brands"
                className="w-48 py-3 rounded-xl text-purple-700 font-semibold shadow-md border border-purple-300 
                  hover:bg-purple-50 hover:shadow-lg hover:scale-105
                  transition-all duration-300 flex items-center justify-center gap-2"
              >
                🔙 Back to Brands
              </Link>
            </div>
          </div>
        </div>

        {/* Products of this brand */}
        <div className="mt-20">
          <h2 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            {brand.name} Products
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product: Product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300"
                >
                  <img src={product.imageCover} alt={product.title} className="w-full h-56 object-cover" />
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                        {product.price} EGP
                      </span>
                      {product.ratingsAverage && (
                        <span className="text-yellow-500 font-medium flex items-center gap-1">
                          <i className="fas fa-star"></i> {product.ratingsAverage}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No products found for this brand.</p>
          )}
        </div>
      </div>
    );
  } catch {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-red-600 text-xl">Failed to load brand details ❌</p>
      </div>
    );
  }
}
