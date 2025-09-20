import getAllProducts from "../../../Api/product.api";
import AddBtn from "../../_components/addBtn/page";
import { ProductType } from "../../interface/product.interface";
import Link from "next/link";
import React from "react";

export default async function Products() {
  const dataList = await getAllProducts();
  

  return (
    <div className="container w-[90%] mx-auto my-10">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
        All Products
      </h2>
      <div className="flex flex-wrap -m-4">
        {dataList?.map((product: ProductType) => (
          <div
            key={product._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
          >
            <div
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md 
              hover:shadow-xl hover:border-pink-500 transition-colors duration-300 flex flex-col h-full cursor-pointer"
            >
              {/* img product */}
              <Link href={`/products/${product._id}`}>
                <div className="w-full h-90 overflow-hidden">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              {/* details product */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h4
                    className="text-lg font-semibold mb-1 truncate bg-clip-text text-transparent 
                    bg-gradient-to-r from-pink-500 to-purple-600"
                  >
                    {product.title}
                  </h4>
                  <h3 className="text-gray-800 font-medium mb-2 truncate">
                    {product.category.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">
                      {product.price} EGP
                    </span>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-700">{product.ratingsAverage}</p>
                      <i className="fas fa-star text-amber-400"></i>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                

                  <AddBtn id={product._id} />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
