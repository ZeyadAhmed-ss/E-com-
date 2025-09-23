// brands.interface.ts

// Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Response من API لبراند واحد
export interface BrandResponse {
  status: string;
  data: Brand;
}

// Product
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

// Response من API لمنتجات
export interface ProductsResponse {
  status: string;
  results: number;
  data: Product[];
}

// Response من API لبراندات كثيرة
export interface BrandsResponse {
  status: string;
  results: number;
  data: Brand[];
}

// Props لصفحة App Router (صفحة ديناميكية)
export interface BrandDetailPageProps {
  params: {
    id: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}
