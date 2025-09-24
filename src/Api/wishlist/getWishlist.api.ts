"use server";
import getMyToken from "@/src/utilities/getMyToken";
import { WishlistResponse } from "@/src/app/interface/wishlist.interface";

export async function getWishlist(): Promise<WishlistResponse> {
  try {
    const token = await getMyToken();
    if (!token?.token) {
      return { status: "fail", message: "No token", count: 0, data: [] };
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token.token}`, 
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { status: "fail", message: "Failed to fetch wishlist", count: 0, data: [] };
    }

    const data: WishlistResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return { status: "fail", message: "Error fetching wishlist", count: 0, data: [] };
  }
}
