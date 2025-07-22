"use client";
import React from "react";
import { useRouter } from "next/navigation";

function SuccessPage({ onPrimary, onSecondary }) {
   const router = useRouter();
  return (
    <div className="h-[125vh] flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-100 to-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Success!</h2>
        <p className="text-gray-500 mb-6 text-center">Your operation was completed successfully.</p>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => router.push("/EZGB")}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 text-sm font-medium transition"
          >
           Authorise
          </button>
          <button
            onClick={onSecondary}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-sm font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;