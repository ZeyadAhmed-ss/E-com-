"use server";
import getMyToken from "@/src/utilities/getMyToken";

export async function getUserOrders() {
  try {
    const token: any = await getMyToken();
    if (!token || !token.id) return [];

    const userId = token.id;

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  } catch (err) {
    console.error("Error fetching user orders:", err);
    return [];
  }
}
