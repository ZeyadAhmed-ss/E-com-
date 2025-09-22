import { UserToken } from "../app/interface/Token.interface";
import getMyToken from "@/src/utilities/getMyToken";
import { Order } from "../app/interface/order.interface";

export async function getUserOrders(): Promise<Order[]> {
  try {
    const token: UserToken | null = await getMyToken();
    if (!token || !token.id) return [];

    const userId = token.id;

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    const orders: Order[] = Array.isArray(data) ? data : [data];

    return orders;
  } catch (err) {
    console.error("Error fetching user orders:", err);
    return [];
  }
}
