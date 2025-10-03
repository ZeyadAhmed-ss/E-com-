"use server";
import getMyToken from "@/src/utilities/getMyToken";
import { GetCartResponse } from "../../app/interface/getLoggedUserCart";

export async function getLoggedUserCart(): Promise<GetCartResponse | null> {
  try {
    const token = await getMyToken();
    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
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
