"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RiErrorWarningLine } from "react-icons/ri";
import Image from "next/image";

function ErrorPage() {
  const router = useRouter();

  const handleClose = () => {
    window.close();
  };

  const handleRetry = () => {
    router.push("/EZGB");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-[#2ae4ff0d]">
      {/* Top Left SVG Blob */}
      <svg
        className="absolute top-[-80px] left-[-140px] w-[370px] h-[380px] pointer-events-none -z-10"
        width="311"
        height="354"
        viewBox="0 0 311 354"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.85556 352.986C-68.2648 345.929 -150.208 320.396 -176.31 254.904C-201.793 190.966 -148.029 125.634 -112.182 66.8619C-87.6605 26.6594 -51.2549 -1.52166 -8.24086 -20.6467C30.2151 -37.7452 70.8624 -38.736 112.552 -33.0602C164.41 -26.0001 221.223 -24.1631 255.639 15.2788C296.075 61.6203 323.492 127.845 303.83 186.151C284.537 243.361 216.135 259.895 163.307 289.081C110.636 318.181 61.709 359.009 1.85556 352.986Z"
          fill="url(#paint0_linear_2_6377)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2_6377"
            x1="257.268"
            y1="215.978"
            x2="-106.916"
            y2="111.55"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00AEEF" />
            <stop offset="1" stopColor="#6ADF23" />
          </linearGradient>
        </defs>
      </svg>
      {/* Bottom Right SVG Blob */}
      <svg
        className="absolute bottom-[-80px] right-[-160px] w-[560px] h-[320px] pointer-events-none -z-10"
        width="424"
        height="281"
        viewBox="0 0 424 281"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M236.506 112.47C373.333 47.3565 540.026 -32.6994 622.675 15.4005C715.799 69.5973 671.996 196.767 561.841 301.809C466.903 392.34 313.805 428.566 187.259 430.605C74.2363 432.425 -10.5344 391.02 1.87918 310.828C13.4853 235.853 125.553 165.271 236.506 112.47Z"
          fill="url(#paint0_linear_2_6481)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2_6481"
            x1="71.9103"
            y1="363.174"
            x2="611.627"
            y2="122.877"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#007EEF" />
            <stop offset="1" stopColor="#2AE4FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-8 max-w-md w-full flex flex-col">
        {/* Logo and subtitle */}
        <div className="flex flex-col items-left mb-7">
          <img
            src='https://sustainextstorage1.blob.core.windows.net/sustainext-frontend-assets/sustainext_logo.png'
            alt="Sustainext"
            className="h-7 w-24 mb-1"
          />
        </div>
        {/* Heading and error icon */}
        <div className="flex items-center w-full mb-3">
          <span className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-3">
            <RiErrorWarningLine className="w-5 h-5 text-[#F04438]" />
          </span>
          <h2 className="text-lg font-semibold text-gray-900 mb-0">
            Authorization Failed
          </h2>
        </div>
        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-6 w-full text-left">
          Unable to complete the connection. You can retry or close this window.
        </p>
        {/* Buttons */}
        <div className="flex flex-col w-full gap-3">
          <button
            onClick={handleRetry}
            className="w-full bg-[#007EEF] text-white rounded-[6px] py-2 text-sm font-medium hover:bg-[#005bcc] transition"
          >
            Try Again
          </button>
          <button
            onClick={handleClose}
            className="w-full border border-gray-300 text-gray-700 rounded-[6px] py-2 text-sm font-medium hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;