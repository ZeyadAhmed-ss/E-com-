"use client";
import React, { createContext, useState, useEffect } from "react";
import { getLoggedUserCart } from "@/src/Api/cartAction/getLoggedUserCart.api";

// Interface للـ context value
interface CartContextType {
  dataDetails: number;
  setDetails: React.Dispatch<React.SetStateAction<number>>;
  getDetails: () => Promise<void>;
}

// Context بقيمة افتراضية undefined علشان نعرف نعمل useContext بشكل آمن
export const CartItemContext = createContext<CartContextType | undefined>(undefined);

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
