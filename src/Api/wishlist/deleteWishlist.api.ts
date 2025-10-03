"use server";
import getMyToken from "@/src/utilities/getMyToken";
import { WishlistResponse } from "@/src/app/interface/wishlist.interface";

export async function removeFromWishlist(
  productId: string
): Promise<WishlistResponse | null> {
  try {
    const token = await getMyToken();
    if (!token?.token) return null; 

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: `${token}`, 
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to remove from wishlist");

    const data: WishlistResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    return null;
  }
}
