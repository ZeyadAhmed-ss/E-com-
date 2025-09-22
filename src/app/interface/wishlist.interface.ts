// PostWishlist.interface.ts

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

export interface WishlistResponse {
  status: string;
  message: string;
  count: number;
  data: WishlistItem[];
}


export interface AddToWishlistRequest {
  productId: string;
}
