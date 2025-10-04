"use server";
import { ICheckout } from "@/src/app/interface/online.interface";
import getMyToken from "@/src/utilities/getMyToken";

export async function onlinePayment(formValues: ICheckout, cartId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found. Please login first.");
  }

  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) {
  throw new Error("Base URL is not defined in env variables.");
}

const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout-session/${cartId}?url=${encodeURIComponent(baseUrl)}`,
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
    throw new Error(`Failed to create checkout session: ${res.status} ${res.statusText}`);
  }

  const payload = await res.json();
  return payload;
}
