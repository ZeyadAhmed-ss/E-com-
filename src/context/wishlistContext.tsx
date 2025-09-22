"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getWishlist } from "../Api/wishlist/getWishlist.api";
import { removeFromWishlist } from "../Api/wishlist/deleteWishlist.api";

// ======= الانترفيسات =======
export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  price: number;
}

export interface WishlistItem {
  _id: string;
  product: Product;
  price: number;
  imageCover: string;
}

// ======= نوع الكونتكست =======
interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number;
  refreshWishlist: () => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  addItem: (item: WishlistItem) => void;
}

// ======= الكونتكست =======
export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ======= جلب البيانات من API =======
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const data = await getWishlist();
      setWishlist(data?.data || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // ======= حذف عنصر من الـ wishlist =======
  const removeItem = async (id: string) => {
    try {
      await removeFromWishlist(id);
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item from wishlist:", err);
    }
  };

  // ======= إضافة عنصر جديد للـ wishlist =======
  const addItem = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((x) => x._id === item._id)) return prev;
      return [...prev, item];
    });
  };

  // ======= تنفيذ الجلب عند تحميل الكونتكست =======
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
        addItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ======= هوك استخدام الكونتكست =======
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
