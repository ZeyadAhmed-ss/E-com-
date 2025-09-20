"use client";
import React, { createContext, useState, useEffect } from "react";
import { getLoggedUserCart } from "@/src/Api/cartAction/getLoggedUserCart.api";

export const CartItemContext = createContext<any>(null);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [dataDetails, setDetails] = useState<number>(0);

  async function getDetails() {
    try {
      const res = await getLoggedUserCart();
      setDetails(res?.numOfCartItems ?? 0);
    } catch (err) {
      console.error("Error fetching cart details:", err);
      setDetails(0);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <CartItemContext.Provider value={{ dataDetails, setDetails, getDetails }}>
      {children}
    </CartItemContext.Provider>
  );
}
