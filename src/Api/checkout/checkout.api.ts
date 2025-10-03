"use server";
import { ICheckout } from "@/src/app/interface/online.interface";
import getMyToken from "@/src/utilities/getMyToken";

export async function onlinePayment(formValues: ICheckout, cartId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const baseUrl =
    process.env.NEXTAUTH_URL || "http://localhost:3000";

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
    {
      method: "POST",
      headers: {
        token: `${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to create checkout session: ${res.statusText}`);
  }

  const payload = await res.json();
  return payload;
}
