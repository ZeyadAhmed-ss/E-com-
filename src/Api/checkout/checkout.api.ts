"use server";
import { ICheckout, CheckoutResponse } from "@/src/app/interface/online.interface";
import getMyToken from "@/src/utilities/getMyToken";

export async function onlinePayment(
  formValues: ICheckout,
  cartId: string
): Promise<CheckoutResponse> {
  const token = await getMyToken();
  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to create checkout session: ${res.statusText}`);
  }

  const payload: CheckoutResponse = await res.json();
  return payload;
}
