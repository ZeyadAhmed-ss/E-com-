"use server";
import getMyToken from "@/src/utilities/getMyToken";
import { Root } from "../../app/interface/wishlist.interface"; // استيراد الانترفيس

export async function getWishlist(): Promise<Root> {
  try {
    const token = await getMyToken();
    if (!token) {
      
      return {
        results: 0,
        metadata: {
          currentPage: 1,
          numberOfPages: 1,
          limit: 0,
          nextPage: 1,
        },
        data: [],
      };
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        results: 0,
        metadata: {
          currentPage: 1,
          numberOfPages: 1,
          limit: 0,
          nextPage: 1,
        },
        data: [],
      };
    }

    const data: Root = await res.json(); // نطبق الانترفيس مباشرة
    return data;
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return {
      results: 0,
      metadata: {
        currentPage: 1,
        numberOfPages: 1,
        limit: 0,
        nextPage: 1,
      },
      data: [],
    };
  }
}
