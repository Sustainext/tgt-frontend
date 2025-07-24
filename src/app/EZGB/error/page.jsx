"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RiErrorWarningLine } from "react-icons/ri";

function ErrorPage() {
  const router = useRouter();

  const handleClose = () => {
    window.close(); // Closes the current popup/tab
  };

  const handleRetry = () => {
    router.push("/EZGB");
  };

  return (
    <div className="h-[120vh] flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 flex items-center justify-center bg-red-50 rounded-full mb-6 relative">
          <div className="absolute w-16 h-16 rounded-full bg-red-100 opacity-40 animate-ping" />
         <RiErrorWarningLine className="w-7 h-7 text-[#D92D20]" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Authorization Failed
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-6 text-center">
          Unable to complete the connection. You can retry or close this window.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleClose}
            className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium  transition"
          >
            Close
          </button>
          <button
            onClick={handleRetry}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
