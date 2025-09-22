"use server";
import getMyToken from "@/src/utilities/getMyToken";
import { GetCartResponse } from "../../app/interface/getLoggedUserCart"; // حط الـ interfaces في ملف types/cart.ts

export async function getLoggedUserCart(): Promise<GetCartResponse | null> {
  try {
    const token = await getMyToken();
    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const headers = {
      token: token,
      "Content-Type": "application/json",
    };

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cart: ${res.statusText}`);
    }

    const data: GetCartResponse = await res.json();
    return data;
  } catch (error) {
    console.error("getLoggedUserCart Error:", error);
    return null;
  }
}
