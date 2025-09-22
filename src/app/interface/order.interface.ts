// Subcategory
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product
export interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

// CartItem
export interface CartItem {
  count: number;
  product: Product;
  price: number;
  _id: string;
}

// ShippingAddress
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// User
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// Order
export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}
