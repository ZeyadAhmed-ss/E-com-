"use server";

import { Order } from "@/src/app/interface/order.interface";

export async function getUserOrders(userId: string): Promise<Order[] | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch orders");
    const data: Order[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}
