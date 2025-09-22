export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandResponse {
  status: string;
  data: Brand;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: string;
  results: number;
  data: Product[];
}
