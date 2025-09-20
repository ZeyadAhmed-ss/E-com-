"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function PageNotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-pink-100 border border-pink-300 text-pink-800 px-6 py-6 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">🚫 Page Not Found</h2>
        <p className="text-lg text-gray-700 mb-4">
          Sorry, the page you are looking for doesnt exist or has been moved.
        </p>
        <button
          onClick={() => router.push("/home")}
          className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-xl transition duration-300"
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
}
