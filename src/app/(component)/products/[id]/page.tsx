"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductById } from "../../../../Api/productD.api";
import AddBtn from "@/src/app/_components/addBtn/page";

import { addToWishlist } from "../../../../Api/wishlist/postWishlist.api";
import { removeFromWishlist } from "../../../../Api/wishlist/deleteWishlist.api";
import { useWishlist } from "@/src/context/wishlistContext";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { ProductData } from "../../../interface/productD.interface";

interface ProductDetailProps {
  params: { id: string };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { id } = params;

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  const { wishlist, addItem, removeItem } = useWishlist();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setInWishlist(wishlist.some((item) => item._id === id));
  }, [wishlist, id]);

  const toggleWishlist = async () => {
    if (!product) return;

    if (inWishlist) {
      await removeFromWishlist(id);
      removeItem(id);
      toast.error("Removed from Wishlist ❌", { duration: 2000 });
    } else {
      await addToWishlist(id);
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
      toast.success("Added to Wishlist ✅", { duration: 2000 });
    }
  };

  if (loading)
    return (
      <div className="w-full flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );

  if (!product) return <p className="text-center mt-20">Failed to load product</p>;

  return (
    <div className="container mx-auto my-52 px-6 lg:px-20">
      <div className="flex flex-col md:flex-row gap-16 items-start">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 flex justify-center"
        >
          <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white relative group">
            <Image
              src={product.imageCover}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <button
              onClick={toggleWishlist}
              className="absolute top-5 right-5 text-3xl transition-transform transform hover:scale-125"
            >
              <i
                className={`${
                  inWishlist
                    ? "fas fa-heart bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
                    : "far fa-heart text-gray-400"
                }`}
              ></i>
            </button>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 space-y-8"
        >
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 leading-tight">
            {product.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed tracking-wide">
            {product.description}
          </p>

          <div className="flex items-center gap-6 text-2xl font-semibold">
            <span className="text-gray-800">Price:</span>
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {product.price} EGP
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <span className="font-medium">
              Category:{" "}
              <span className="text-gray-900">{product.category?.name}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fas fa-star text-yellow-400"></i>
            <span className="text-lg font-semibold">{product.ratingsAverage}</span>
            <span className="text-gray-500">(Customer Rating)</span>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            <motion.div whileHover={{ scale: 1.05 }}>
              <AddBtn id={product._id} />
            </motion.div>

            <Link
              href="/products"
              className="w-full py-3 rounded-xl text-purple-700 font-semibold shadow-md border border-purple-300 
              hover:bg-purple-50 hover:shadow-lg hover:scale-105
              transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fas fa-arrow-left"></i> Back to Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
