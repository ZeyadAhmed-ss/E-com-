import getAllProducts from "../../../Api/product.api";
import AddBtn from "../../_components/addBtn/page";
import { ProductType } from "../../interface/product.interface";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default async function Products() {
  const dataList = await getAllProducts();

  if (!dataList || dataList.length === 0) {
    return (
      <div className="w-[90%] mx-auto pt-28 pb-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-600 mb-6">
          No Products Available 😔
        </h2>
        <p className="text-gray-500">Check back later for new arrivals!</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto pt-28 pb-20">
      {/* العنوان */}
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-16 pb-2 text-center 
        bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 
        bg-clip-text text-transparent tracking-wide drop-shadow-sm">
        Explore Our Products
      </h2>

      {/* الجريد */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-10
        "
      >
        {dataList.map((product: ProductType) => (
          <div
            key={product._id}
            className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden 
              shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out"
          >
            {/* الكارت كله Link للتفاصيل */}
            <Link href={`/products/${product._id}`} className="flex-1 flex flex-col">
              {/* صورة المنتج */}
              <div className="relative w-full h-64 bg-gray-50">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                {product.price < 500 && (
                  <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Hot 🔥
                  </span>
                )}
              </div>

              {/* تفاصيل المنتج */}
              <div className="p-5 flex flex-col flex-1">
                <h4
                  className="text-lg font-bold mb-1 truncate bg-clip-text text-transparent 
                  bg-gradient-to-r from-pink-500 to-purple-600"
                >
                  {product.title}
                </h4>
                <h3 className="text-gray-500 text-sm mb-3 truncate">
                  {product.category.name}
                </h3>

                {/* السعر + التقييم */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price} EGP
                  </span>
                  <div className="flex items-center gap-1 text-sm">
                    <p className="text-gray-700 font-medium">
                      {product.ratingsAverage}
                    </p>
                    <i className="fas fa-star text-amber-400"></i>
                  </div>
                </div>
              </div>
            </Link>

            {/* زرار Add to Cart مستقل */}
            <div className="p-5 pt-0">
              <AddBtn id={product._id} />
            </div>

            
</div>
        ))}
      </div>
    </div>
  );
}
