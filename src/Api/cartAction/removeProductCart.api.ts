"use server";
import getMyToken from "@/src/utilities/getMyToken";

export async function removeProductToCart(id: string) {
  const token = await getMyToken();

  if (!token) {
    return { success: false, message: "Unauthorized: No token found" };
  }

  const headers = {
    token: token,
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to remove product: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch {
  return { success: false, message: "Something went wrong" };
}

}
