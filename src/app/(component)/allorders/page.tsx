"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserOrders } from "@/src/Api/orders/getUserOrders.api";
import { Order } from "../../interface/order.interface";
import Image from "next/image";

export default function AllOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchOrders = async () => {
        setLoading(true);
        const data = await getUserOrders(session.user.id);
        setOrders(data || []);
        setLoading(false);
      };
      fetchOrders();
    }
  }, [status, session]);

  // Skeleton Loader
  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 my-20 space-y-12">
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="border rounded-3xl p-6 shadow-md bg-white animate-pulse space-y-4"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 border rounded-xl"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded object-cover"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-3 w-40 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-600 text-xl">No orders found 😕</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 my-20 space-y-12">
      <h1 className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
        My Orders
      </h1>

      <div className="flex flex-col gap-10">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-3xl p-6 shadow-md bg-white hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <h2 className="font-bold text-lg text-gray-800 mb-2 md:mb-0">
                Order #{order._id}
              </h2>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  order.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              Total:{" "}
              <span className="font-semibold text-indigo-600">
                {order.totalOrderPrice} EGP
              </span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-3 border rounded-xl hover:shadow-md transition"
                >
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800 line-clamp-1">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.count} × {item.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
