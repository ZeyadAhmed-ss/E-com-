"use server";
import getMyToken from "@/src/utilities/getMyToken";

export async function getWishlist() {
  try {
    const token: any = await getMyToken();
    if (!token) return [];

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return [];
  }
}
