"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getLoggedUserCart } from "@/src/Api/cartAction/getLoggedUserCart.api";
import { UpdateProductToCart } from "@/src/Api/cartAction/updateProductCart.api";
import { removeProductToCart } from "@/src/Api/cartAction/removeProductCart.api";
import { clearCart } from "@/src/Api/cartAction/clearProductCart.api";
import { toast } from "sonner";
import { CartItemContext } from "@/src/context/cartitemContext";
import { Product } from "../../interface/cart.interface";

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartId, setId] = useState<string>('');
  const [cartList, setList] = useState<Product[]>([]);
  const [totalPrice, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const { getDetails } = useContext(CartItemContext);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    async function getCartData() {
      setLoading(true);
      try {
        const res = await getLoggedUserCart();
        if (res?.data) {
          setPrice(res.data.totalCartPrice);
          setId(res.cartId);
          setList(res.data.products);
          await getDetails();
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }

    getCartData();
  }, [status, session, getDetails]);

  const handleUpdateQty = async (id: string, newCount: number) => {
    if (newCount < 1) return;
    const prevCart = [...cartList];

    setList((items) =>
      items.map((item) =>
        item.product._id === id ? { ...item, count: newCount } : item
      )
    );

    try {
      const res = await UpdateProductToCart(id, newCount);
      if (res?.data) {
        setPrice(res.data.totalCartPrice);
        toast.success("✅ Quantity updated successfully!");
        await getDetails();
      }
    } catch (err) {
      setList(prevCart);
      toast.error("❌ Failed to update quantity!");
    }
  };

  const handleRemove = async (id: string) => {
    const prevCart = [...cartList];
    setList((items) => items.filter((item) => item.product._id !== id));

    try {
      const res = await removeProductToCart(id);
      if (res?.data) {
        setPrice(res.data.totalCartPrice);
        toast.success("🗑️ Product removed from cart!");
        await getDetails();
      }
    } catch (err) {
      setList(prevCart);
      toast.error("❌ Failed to remove product!");
    }
  };

  const handleClear = async () => {
    try {
      const res = await clearCart();
      if (res?.message === "success") {
        setList([]);
        setPrice(0);
        toast.success("🧹 Your cart has been cleared!");
        await getDetails();
      }
    } catch (error) {
      toast.error("❌ Failed to clear cart!");
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32">
        {" "}
        <h1 className="text-5xl font-extrabold mb-14 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
          {" "}
          🛒 Your Shopping Cart{" "}
        </h1>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {" "}
          {/* Skeleton Items */}{" "}
          <div className="lg:col-span-2 space-y-8">
            {" "}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-8 bg-white border border-gray-200 rounded-3xl shadow-sm p-6 animate-pulse"
              >
                {" "}
                <div className="h-32 w-32 bg-gray-200 rounded-2xl"></div>{" "}
                <div className="flex-1 space-y-4">
                  {" "}
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>{" "}
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>{" "}
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>{" "}
                  <div className="flex gap-3">
                    {" "}
                    <div className="h-8 w-12 bg-gray-200 rounded-lg"></div>{" "}
                    <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>{" "}
                    <div className="h-8 w-12 bg-gray-200 rounded-lg"></div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="h-10 w-16 bg-gray-200 rounded-xl"></div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
          {/* Order Summary Skeleton */}{" "}
          <div className="bg-white rounded-3xl shadow-xl p-10 h-fit sticky top-28 border border-gray-200 animate-pulse space-y-6">
            {" "}
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>{" "}
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>{" "}
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>{" "}
            <div className="h-10 bg-gray-200 rounded-xl"></div>{" "}
            <div className="h-10 bg-gray-200 rounded-xl"></div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }

  // cart page
  return (
    <div className="max-w-7xl mx-auto px-10 py-36">
      <h1 className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
        🛒 Your Shopping Cart
      </h1>

      {cartList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 bg-white rounded-3xl shadow-lg border border-gray-200">
          <p className="text-2xl font-semibold text-gray-700">
            Your cart is empty 🫣
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cartList.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-8 bg-white border border-gray-200 rounded-3xl shadow-sm p-6"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="h-32 w-32 object-contain rounded-2xl border border-gray-100 shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                    {item.product.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    {item.product.category.name}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-extrabold text-gray-900">
                      {item.price} EGP
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleUpdateQty(item.product._id, item.count - 1)
                      }
                      className="px-3 py-1 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                      ➖
                    </button>
                    <span className="font-semibold text-lg text-gray-800">
                      {item.count}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQty(item.product._id, item.count + 1)
                      }
                      className="px-3 py-1 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                      ➕
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="px-5 py-2 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-lg transition-all"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-10 h-fit sticky top-28 border border-gray-200">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Order Summary
            </h2>
            <div className="flex justify-between text-lg mb-4">
              <span className="text-gray-700">Total Items</span>
              <span className="font-semibold text-gray-900">
                {cartList.length}
              </span>
            </div>
            <div className="flex justify-between text-xl mb-8">
              <span className="text-gray-700">Total Price</span>
              <span className="font-extrabold text-gray-900">
                {totalPrice} EGP
              </span>
            </div>

            <button
              onClick={() => router.push(`/checkout/${cartId}`)}
              className="w-full mt-2 px-8 py-4 rounded-2xl font-semibold text-white text-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl transition-all"
            >
              ✅ Proceed to Checkout
            </button>

            <button
              onClick={handleClear}
              className="w-full mt-3 px-8 py-4 rounded-2xl font-semibold text-white text-lg shadow-md bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 hover:shadow-xl transition-all"
            >
              🗑️ Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
