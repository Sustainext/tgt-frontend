"use client";
import React from "react";
import { useRouter } from "next/navigation";

function ErrorPage({ onPrimary, onSecondary }) {
    const router = useRouter();
  return (
    <div className="h-[125vh] flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-100 to-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Something went wrong</h2>
        <p className="text-gray-500 mb-6 text-center">
          We’re sorry, but an unexpected error has occurred.
          Please try again or contact support if the problem persists.
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => router.push("/EZGB")}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 text-sm font-medium transition"
          >
            Retry
          </button>
          <button
            onClick={onSecondary}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-sm font-medium transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;