// المنتج
export interface Product {
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
  [x: string]: SetStateAction<number>;
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// الـ Response اللي بيجي من الـ API
export interface GetCartResponse {
  [x: string]: SetStateAction<string>;
  status: string;
  numOfCartItems: number;
  data: Cart;
}
