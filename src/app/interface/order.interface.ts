export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string; // موجود في JSON
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsQuantity: number;
  ratingsAverage: number;
}

export interface CartItem {
  _id: string;
  product: Product;
  count: number;
  price: number;
}

export interface Order {
  _id: string;
  id: number;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
