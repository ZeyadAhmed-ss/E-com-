"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../app/interface/cart.interface";
import { getLoggedUserCart } from "@/src/Api/cartAction/getLoggedUserCart.api";
import { CartItem } from "../app/interface/getLoggedUserCart";

interface CartContextType {
  cartList: Product[];
  totalCartPrice: number;
  getDetails: () => Promise<void>;
}

export const CartItemContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const getDetails = async () => {
    const res = await getLoggedUserCart();
    if (res?.data) {
      setCartList(res.data.products);
      setTotalCartPrice(res.data.totalCartPrice);
      setList(res.data.products);
    }
  };

  return (
    <CartItemContext.Provider value={{ cartList, totalCartPrice, getDetails }}>
      {children}
    </CartItemContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartItemContext);
  if (!context) throw new Error("CartItemContext not found");
  return context;
};
function setList(products: CartItem[]) {
  throw new Error("Function not implemented.");
}

