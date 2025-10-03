// المنتج
export interface Product {
  [x: string]: any;
  _id: string;
  title: string;
  imageCover: string;
}

// عنصر واحد داخل الـ Cart
export interface CartItem {
  count: number;
  price: number;
  product: Product;
}

// الـ Cart نفسها
export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number; // لو API بيرجع السعر الإجمالي
}

// الـ Response اللي بيجي من الـ API
export interface GetCartResponse {
  [x: string]: SetStateAction<string>;
  status: string;
  numOfCartItems: number;
  data: Cart;
}
