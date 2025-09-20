"use client";
import React, { useContext } from "react";
import { AddToCart } from "@/src/Api/cartAction/addProductCart.api";
import { CartItemContext } from "@/src/context/cartitemContext";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
  const { dataDetails, getDetails } = useContext(CartItemContext);

async function addProductToCart() {
  try {
    const res = await AddToCart(id);
    if (res?.status === "success") {
      toast.success("✅ Product added to your cart!");
      await getDetails(); 
    } else {
      toast.error(res?.message || "❌ Failed to add product");
    }
  } catch (err) {
    toast.error("⚠️ Something went wrong!");
  }
}


  return (
    <button
      onClick={addProductToCart}
      className="mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-md
                 bg-gradient-to-r from-pink-500 to-purple-600
                 hover:from-pink-600 hover:to-purple-700
                 hover:shadow-lg hover:scale-105
                 transition-all duration-300 flex items-center justify-center gap-2"
    >
      <i className="fas fa-cart-plus"></i>
      Add To Cart
    </button>
  );
}
