"use server";
import getMyToken from "@/src/utilities/getMyToken";

export async function removeFromWishlist(productId: string) {
  try {
    const token: any = await getMyToken();
    if (!token) return null;

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    return null;
  }
}
