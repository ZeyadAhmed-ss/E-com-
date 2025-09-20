export default async function getSingleCategory(id) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}
