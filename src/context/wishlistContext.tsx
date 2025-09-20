"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getWishlist } from "../Api/wishlist/getWishlist.api";
import { removeFromWishlist } from "../Api/wishlist/deleteWishlist.api";

interface WishlistContextType {
  wishlist: any[];
  wishlistCount: number;
  refreshWishlist: () => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  addItem: (item: any) => void; // ✅ أضفنا دي
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    const data = await getWishlist();
    setWishlist(data?.data || []);
    setLoading(false);
  };

  const removeItem = async (id: string) => {
    await removeFromWishlist(id);
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  const addItem = (item: any) => {
    setWishlist((prev) => {
      if (prev.find((x) => x._id === item._id)) return prev; // لو موجود متضفوش تاني
      return [...prev, item];
    });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        refreshWishlist: fetchWishlist,
        removeItem,
        addItem, // ✅
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
