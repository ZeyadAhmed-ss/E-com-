import { Brand } from "../app/interface/brands.interface";

interface BrandsResponse {
  status: string;
  results: number;
  data: Brand[];
}

export default async function getAllBrands(): Promise<BrandsResponse | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "no-cache",
    });
    if (!res.ok) throw new Error("Failed to fetch brands");

    const data: BrandsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return null;
  }
}
