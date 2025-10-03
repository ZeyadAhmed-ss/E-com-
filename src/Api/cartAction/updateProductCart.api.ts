"use server";
import getMyToken from "@/src/utilities/getMyToken";

export async function UpdateProductToCart(id: string, countNumber: number) {
  const token = await getMyToken();

  if (!token) {
    return { success: false, message: "Unauthorized: No token found" };
  }

  const payload = {
    count: countNumber,
  };

  const headers = {
    "Content-Type": "application/json",
    token: `${token.token}`, 
  };

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Failed to update product: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch {
    return { success: false, message: "Something went wrong" };
  }
}
