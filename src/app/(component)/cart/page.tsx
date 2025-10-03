"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getLoggedUserCart } from "@/src/Api/cartAction/getLoggedUserCart.api";
import { UpdateProductToCart } from "@/src/Api/cartAction/updateProductCart.api";
import { removeProductToCart } from "@/src/Api/cartAction/removeProductCart.api";
import { clearCart } from "@/src/Api/cartAction/clearProductCart.api";
import { toast } from "sonner";
import { Product } from "../../interface/cart.interface";
import { CartItem } from "../../interface/getLoggedUserCart";

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [cartId, setCartId] = useState<string>("");
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status, router]);

  // Fetch cart data
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
      } catch (err) {
        toast.error("❌ Failed to fetch cart!");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [status]);

  // Update quantity
  const handleUpdateQty = async (id: string, newCount: number) => {
    if (newCount < 1) return;
    const prevCart = [...cartList];
    setCartList(cartList.map(item => item.product._id === id ? { ...item, count: newCount } : item));
    
    try {
      const res = await UpdateProductToCart(id, newCount);
      if (res?.data) setTotalPrice(res.data.totalCartPrice);
      toast.success("✅ Quantity updated!");
    } catch {
      setCartList(prevCart);
      toast.error("❌ Failed to update quantity!");
    }
  };

  // Remove item
  const handleRemove = async (id: string) => {
    const prevCart = [...cartList];
    setCartList(cartList.filter(item => item.product._id !== id));

    try {
      const res = await removeProductToCart(id);
      if (res?.data) setTotalPrice(res.data.totalCartPrice);
      toast.success("🗑️ Product removed!");
    } catch {
      setCartList(prevCart);
      toast.error("❌ Failed to remove product!");
    }
  };

  // Clear cart
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
      <div className="max-w-7xl mx-auto px-10 py-36">
        <h1 className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
          🛒 Your Shopping Cart
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Skeleton Items */}
          <div className="lg:col-span-2 space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-8 bg-white border border-gray-200 rounded-3xl shadow-sm p-6 animate-pulse"
              >
                <div className="h-32 w-32 bg-gray-200 rounded-2xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex gap-3">
                    <div className="h-8 w-12 bg-gray-200 rounded-lg"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
                <div className="h-10 w-16 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
          {/* Order Summary Skeleton */}
          <div className="bg-white rounded-3xl shadow-xl p-10 h-fit sticky top-28 border border-gray-200 animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded-xl"></div>
            <div className="h-10 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && cartList.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Your cart is empty 🫣
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven’t added anything yet.
        </p>
        <a
          href="/home"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold rounded-2xl shadow hover:opacity-90 transition"
        >
          🛍️ Start Shopping
        </a>
      </div>
    </div>
  );
}


  return (
    <div className="max-w-7xl mx-auto px-10 py-36">
      <h1 className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
        🛒 Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cartList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="h-32 w-32 object-contain rounded-2xl border border-gray-100 shadow-sm"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{item.product.title}</h2>
                <p className="text-sm text-gray-500 mb-3">{item.product.category.name}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-extrabold text-gray-900">{item.price} EGP</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleUpdateQty(item.product._id, item.count - 1)} className="px-3 py-1 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200">➖</button>
                  <span className="font-semibold text-lg">{item.count}</span>
                  <button onClick={() => handleUpdateQty(item.product._id, item.count + 1)} className="px-3 py-1 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200">➕</button>
                </div>
              </div>
              <button onClick={() => handleRemove(item.product._id)} className="px-5 py-2 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">✕</button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-10 h-fit sticky top-28 border border-gray-200">
          <h2 className="text-3xl font-bold mb-8">Order Summary</h2>
          <div className="flex justify-between text-lg mb-4">
            <span>Total Items</span>
            <span className="font-semibold">{cartList.length}</span>
          </div>
          <div className="flex justify-between text-xl mb-8">
            <span>Total Price</span>
            <span className="font-extrabold">{totalPrice} EGP</span>
          </div>

          <button onClick={() => router.push(`/checkout/${cartId}`)} className="w-full mt-2 px-8 py-4 rounded-2xl font-semibold text-white text-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-600">
            ✅ Proceed to Checkout
          </button>
          <button onClick={handleClear} className="w-full mt-3 px-8 py-4 rounded-2xl font-semibold text-white text-lg shadow-md bg-gradient-to-r from-gray-500 to-gray-700">
            🗑️ Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
