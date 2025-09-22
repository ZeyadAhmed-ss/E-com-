import { WishlistItem } from "./DeleteWishlist.interface";

export interface WishlistResponse {
  status: string;
  message: string;
  data: WishlistItem[];
}
