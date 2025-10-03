"use server";

export async function AddToCart(productId: string, token: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`, 
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errData.message || "Failed to add product to cart",
      };
    }

    const data = await res.json();
    return { success: true, message: "Product added to cart successfully", data };
  } catch (err) {
    console.error("Error in AddToCart:", err);
    return { success: false, message: "Something went wrong" };
  }
}
