"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getLoggedUserCart } from "@/src/Api/cartAction/getLoggedUserCart.api";
import { UpdateProductToCart } from "@/src/Api/cartAction/updateProductCart.api";
import { removeProductToCart } from "@/src/Api/cartAction/removeProductCart.api";
import { clearCart } from "@/src/Api/cartAction/clearProductCart.api";
import { CartItem } from "../../interface/getLoggedUserCart";

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [cartId, setCartId] = useState<string>("");
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    async function fetchCart() {
      setLoading(true);
      try {
        const res = await getLoggedUserCart();
        if (res?.data) {
          setCartList(res.data.products);
          setCartId(res.cartId);
          setTotalPrice(res.data.totalCartPrice);
        }
      } catch {
        toast.error("❌ Failed to fetch cart!");
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [status]);

  const handleUpdateQty = async (id: string, newCount: number) => {
    if (newCount < 1) return;
    const prevCart = [...cartList];
    setCartList(cartList.map((item) =>
      item.product._id === id ? { ...item, count: newCount } : item
    ));
    try {
      const res = await UpdateProductToCart(id, newCount);
      if (res?.data) setTotalPrice(res.data.totalCartPrice);
      toast.success("✅ Quantity updated!");
    } catch {
      setCartList(prevCart);
      toast.error("❌ Failed to update quantity!");
    }
  };

  const handleRemove = async (id: string) => {
    const prevCart = [...cartList];
    setCartList(cartList.filter((item) => item.product._id !== id));
    try {
      const res = await removeProductToCart(id);
      if (res?.data) setTotalPrice(res.data.totalCartPrice);
      toast.success("🗑️ Product removed!");
    } catch {
      setCartList(prevCart);
      toast.error("❌ Failed to remove product!");
    }
  };

  const handleClear = async () => {
    try {
      const res = await clearCart();
      if (res?.message === "success") {
        setCartList([]);
        setTotalPrice(0);
        toast.success("🧹 Cart cleared!");
      }
    } catch {
      toast.error("❌ Failed to clear cart!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!loading && cartList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-7xl"
        >
          🛒
        </motion.div>
        <h2 className="text-4xl font-extrabold text-gray-800 mt-6">
          Oops! Cart is Empty
        </h2>
        <p className="text-gray-500 mt-2 mb-6">
          Let’s fix that — start shopping now!
        </p>
        <a
          href="/home"
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold rounded-2xl shadow hover:scale-105 transition"
        >
          🛍️ Browse Products
        </a>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-44">
      {/* Title with progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl sm:text-5xl pb-8 font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Your Shopping Experience
        </h1>
        <div className="mt-6 w-full max-w-md mx-auto bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((cartList.length / 5) * 100, 100)}%` }}
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
          />
        </div>
        <p className="mt-2 text-gray-500 text-sm">Progress to checkout</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Products */}
        <div className="lg:col-span-2 space-y-8">
          {cartList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white/90 backdrop-blur-lg border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition p-6"
            >
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={150}
                height={150}
                className="rounded-2xl object-cover border border-gray-100 shadow w-full sm:w-40 h-40"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
                  {item.product.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {item.product.category.name}
                </p>
                <span className="text-xl font-extrabold text-purple-600 block">
                  {item.price} EGP
                </span>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                  <button
                    onClick={() => handleUpdateQty(item.product._id, item.count - 1)}
                    className="px-3 py-1 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200"
                  >
                    ➖
                  </button>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    className="font-semibold text-lg"
                  >
                    {item.count}
                  </motion.span>
                  <button
                    onClick={() => handleUpdateQty(item.product._id, item.count + 1)}
                    className="px-3 py-1 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200"
                  >
                    ➕
                  </button>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRemove(item.product._id)}
                className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 shadow"
              >
                ✕
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 h-fit sticky top-28 border border-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">🧾 Order Summary</h2>
          <div className="flex justify-between text-lg mb-4">
            <span>Total Items</span>
            <span className="font-semibold">{cartList.length}</span>
          </div>
          <div className="flex justify-between text-xl mb-8">
            <span>Total Price</span>
            <span className="font-extrabold text-purple-600">{totalPrice} EGP</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/checkout/${cartId}`)}
            className="w-full px-6 py-4 rounded-2xl font-semibold text-white text-lg shadow bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition"
          >
            ✅ Proceed to Checkout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="w-full mt-3 px-6 py-4 rounded-2xl font-semibold text-white text-lg shadow bg-gradient-to-r from-gray-600 to-gray-800 hover:opacity-90 transition"
          >
            🗑️ Clear Cart
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
