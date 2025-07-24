"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function SuccessPage() {
  const router = useRouter();

  const handleClose = () => {
    window.close(); // Close the current tab
  };

  const handleAuthorizeAnother = () => {
    router.push("/EZGB");
  };

  return (
    <div className="h-[120vh] flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        {/* Success Icon */}
        <div className="w-16 h-16 flex items-center justify-center bg-green-50 rounded-full mb-6 relative">
          <div className="absolute w-16 h-16 rounded-full bg-green-100 opacity-40 animate-ping" />
          <IoMdCheckmarkCircleOutline className="w-8 h-8  text-green-500" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Authorization Successful
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-6 text-center">
          Your utility account is now connected. You can safely close this window.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleClose}
            className="border w-[150px] border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium transition"
          >
            Close
          </button>
          <button
            onClick={handleAuthorizeAnother}
            className="bg-blue-600 w-[300px] text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition"
          >
            Authorize Another Utility Provider
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
