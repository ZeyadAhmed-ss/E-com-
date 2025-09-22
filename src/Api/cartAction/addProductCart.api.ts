"use server"
import getMyToken from "@/src/utilities/getMyToken";

export async function AddToCart(id: string) {
  try {
 
    const token = await getMyToken();
    if (!token) {
      throw new Error("No token found. Please login first.");
    }

   
    const payload = {
      productId: id,
    };

 
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };

    
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to add product to cart: ${res.statusText}`
      );
    }

    
    const data = await res.json();
    return data;
  } catch {
  return { success: false, message: "Something went wrong" };
}

}
