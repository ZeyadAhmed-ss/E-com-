"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductById } from "../../../../Api/productD.api";
import AddBtn from "@/src/app/_components/addBtn/page";

// APIs للـ wishlist
import { addToWishlist } from "../../../../Api/wishlist/postWishlist.api";
import { removeFromWishlist } from "../../../../Api/wishlist/deleteWishlist.api";
import { getWishlist } from "../../../../Api/wishlist/getWishlist.api";
import { useWishlist } from "@/src/context/wishlistContext";

import { toast } from "sonner";
import { Root, ProductData } from "../../../interface/productD.interface";

interface ProductDetailProps {
  params: { id: string };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { id } = params;

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  const { addItem, removeItem } = useWishlist();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data: Root = await getProductById(id);
        setProduct(data.data); 
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const checkWishlist = async () => {
      const data = await getWishlist();
      if (data?.data?.some((item: { _id: string }) => item._id === id)) {
        setInWishlist(true);
      }
    };
    checkWishlist();
  }, [id]);

  const toggleWishlist = async () => {
    if (inWishlist) {
      await removeFromWishlist(id);
      removeItem(id);
      setInWishlist(false);
      toast.error("Removed from Wishlist ❌", { duration: 2000 });
    } else {
      await addToWishlist(id);
      if (product) {
        addItem({
          _id: product._id,
          product: {
            _id: product._id,
            title: product.title,
            imageCover: product.imageCover,
            category: product.category,
            brand: product.brand,
            ratingsAverage: product.ratingsAverage,
            price: product.price,
          },
          price: product.price,
          imageCover: product.imageCover,
        });
      }

      setInWishlist(true);
      toast.success("Added to Wishlist ✅", { duration: 2000 });
    }
  };

  if (loading)
    return (
      <div className="container w-[70%] mx-auto my-40">
        {/* Skeleton Loader */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md h-[400px] bg-gray-200 animate-pulse rounded-3xl" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-10 bg-gray-200 rounded-md animate-pulse w-3/4" />
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-full" />
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/2" />
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/3" />
            <div className="h-10 bg-gray-200 rounded-md animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );

  if (!product) return <p>Failed to load product</p>;

  return (
    <div className="container w-[70%] mx-auto my-36">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Product Image */}
        <div className="flex-1 flex justify-center relative">
          <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-xl hover:border-pink-500 transition-colors duration-300 relative">
            <Image
              src={product.imageCover}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 text-2xl transition-transform transform hover:scale-125"
            >
              <i
                className={`${
                  inWishlist
                    ? "fas fa-heart text-pink-500"
                    : "far fa-heart text-gray-400"
                }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            {product.title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center gap-4 text-xl font-semibold">
            <span className="text-gray-900">Price:</span>
            <span className="text-purple-600">{product.price} EGP</span>
          </div>
          <p className="text-gray-700">
            Category:{" "}
            <span className="font-medium text-gray-900">
              {product.category?.name}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-medium">
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              {product.ratingsAverage}
            </span>
            <span className="text-gray-500 text-sm">(Customer Rating)</span>
          </div>

          <AddBtn id={product._id} />

          <Link
            href="/products"
            className="w-full py-3 rounded-xl text-purple-700 font-semibold shadow-md border border-purple-300 
            hover:bg-purple-50 hover:shadow-lg hover:scale-105
            transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="fas fa-arrow-left"></i> Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
