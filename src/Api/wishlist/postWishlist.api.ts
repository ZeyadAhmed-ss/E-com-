"use server";
import getMyToken from "@/src/utilities/getMyToken";
import { WishlistResponse, AddToWishlistRequest } from "../../app/interface/wishlist.interface";

export async function addToWishlist(productId: string): Promise<WishlistResponse | null> {
  try {
    const token = await getMyToken(); 
    if (!token) return null;

    const body: AddToWishlistRequest = { productId };

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to add to wishlist");

    const data: WishlistResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    return null;
  }
}
