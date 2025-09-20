export async function getProductById(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("Failed to fetch product");

    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
