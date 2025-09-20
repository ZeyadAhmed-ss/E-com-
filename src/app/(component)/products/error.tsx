"use client";
import React from "react";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = "Something went wrong while loading data",
}: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-purple-100 border border-purple-300 text-purple-800 px-6 py-4 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">😕 Oops!</h2>
        <p className="text-lg">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-xl transition duration-300"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
}
