"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  const handleFrontendClick = () => {
    window.open("https://nikemainpage.netlify.app/", "_blank");
  };

  const handleBackendClick = () => {
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Assessment Portal
        </h1>
        <p className="text-gray-600 mb-10">
          Choose which part of the project you&apos;d like to view:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={handleFrontendClick}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold shadow hover:bg-indigo-500 transition duration-200"
          >
            Frontend
          </button>

          <button
            onClick={handleBackendClick}
            className="w-full bg-gray-800 text-white py-3 rounded-xl text-lg font-semibold shadow hover:bg-gray-700 transition duration-200"
          >
            Backend
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
