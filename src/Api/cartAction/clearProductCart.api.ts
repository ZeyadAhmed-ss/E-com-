"use server";
import getMyToken from "@/src/utilities/getMyToken";

export async function clearCart() {
  const token = await getMyToken();

  if (!token) {
    return { success: false, message: "Unauthorized: No token found" };
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token.token}`,
  };

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers,
  });

  const data = await res.json();
  return data;
}
