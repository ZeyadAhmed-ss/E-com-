export default async function getAllProducts() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      cache: "force-cache",

    }
  );

  const { data } = await response.json();
  return data;
}
