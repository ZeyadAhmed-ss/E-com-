// Api/brands.api.ts
export default async function getAllBrands() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}
