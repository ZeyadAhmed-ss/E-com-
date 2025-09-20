"use server";
import getMyToken from "@/src/utilities/getMyToken";

export async function addToWishlist(productId: string) {
  try {
    const token: any = await getMyToken();
    if (!token) return null;

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    return null;
  }
}
