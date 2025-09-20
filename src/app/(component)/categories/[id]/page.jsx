import Link from "next/link";
export default async function CategoryDetail({ params }) {
  let message = "Something went wrong while loading category";
  const { id } = params;

  try {
    // 🟣 Fetch Category Data
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      { cache: "force-cache" }
    );
    const data = await res.json();
    const category = data?.data;

    // 🟣 Fetch Products in Category
    const productsRes = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
      { cache: "force-cache" }
    );
    const productsData = await productsRes.json();
    const products = productsData?.data || [];

    return (
      <div className="container w-[80%] mx-auto my-20 space-y-16">
        {/* 🔹 Category Details */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Category Image */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-xl hover:border-pink-500 transition-colors duration-300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Category Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              {category.name}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Discover amazing products in{" "}
              <span className="font-semibold">{category.name}</span> category.
            </p>

            {/* Created At */}
            <p className="text-gray-700">
              Created on:{" "}
              <span className="font-medium text-gray-900">
                {new Date(category.createdAt).toLocaleDateString()}
              </span>
            </p>

            {/* Back Button */}
            <div className="flex gap-4 mt-6">
              <Link
                href="/categories"
                className="w-48 py-3 rounded-xl text-purple-700 font-semibold shadow-md border border-purple-300 
                  hover:bg-purple-50 hover:shadow-lg hover:scale-105
                  transition-all duration-300 flex items-center justify-center gap-2"
              >
                🔙 Back to Categories
              </Link>
            </div>
          </div>
        </div>

        {/* 🔹 Products in Category */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">
            Products in {category.name}
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-3xl shadow-md hover:shadow-2xl border border-gray-200 hover:border-purple-400 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.title}
                    </h3>

                    {/* Price + Rating */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                        {product.price} EGP
                      </span>

                      {product.ratingsAverage && (
                        <div className="flex items-center gap-1">
                          <i className="fas fa-star text-yellow-400"></i>
                          <span className="text-gray-800 font-semibold">
                            {product.ratingsAverage}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <Link
                      href={`/products/${product._id}`}
                      className="w-full text-center py-2.5 rounded-xl text-white font-medium shadow-md 
                bg-gradient-to-r from-pink-500 to-purple-600
                hover:from-pink-600 hover:to-purple-700
                hover:shadow-lg hover:scale-105
                transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-purple-100 border border-purple-300 text-purple-800 px-6 py-6 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-3xl font-bold mb-3">😕 Oops!</h2>
          <p className="text-lg">{message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition duration-300"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }
}
