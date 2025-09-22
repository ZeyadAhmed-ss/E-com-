// Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
}

// Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
}

// Product
export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  price: number;
}

// عنصر wishlist
export interface WishlistItem {
  _id: string;
  product: Product;
}

// الـ response من أي عملية wishlist
export interface WishlistResponse {
  status: string;
  message: string;
  data: WishlistItem[];
}
