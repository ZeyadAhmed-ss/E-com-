"use client";
import React, { useContext } from "react";
import { AddToCart } from "@/src/Api/cartAction/addProductCart.api";
import { CartItemContext } from "@/src/context/cartitemContext";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function AddBtn({ id }: { id: string }) {
  const context = useContext(CartItemContext);
  const { data: session, status } = useSession(); // ✅ جلب الـ session

  if (!context) throw new Error("CartItemContext not found");

  const { getDetails } = context;

  const handleAddToCart = async () => {
    if (status !== "authenticated" || !session?.user?.token) {
      toast.error("You are not logged in. Please login to get access");
      return;
    }

    const res = await AddToCart(id, session?.user?.token); 
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    await getDetails();
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-md
                 bg-gradient-to-r from-pink-500 to-purple-600
                 hover:from-pink-600 hover:to-purple-700
                 hover:shadow-lg hover:scale-105
                 transition-all duration-300 flex items-center justify-center gap-2"
    >
      <i className="fas fa-cart-plus"></i> Add To Cart
    </button>
  );
}
