// تعريف واجهة Metadata
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

// تعريف واجهة Product
export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

// تعريف واجهة WishlistItem
export interface WishlistItem {
  _id: string;
  title: string;
  description?: string;
  price: number;
  imageCover: string;
}

// تعريف واجهة Wishlist
export interface Wishlist {
  _id: string;
  wishlistOwner: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// تعريف واجهة Root
export interface Root {
  results: number;
  metadata: Metadata;
  data: WishlistItem[];
}
