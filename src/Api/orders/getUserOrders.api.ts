
"use server";
export async function getUserOrders(userId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}
