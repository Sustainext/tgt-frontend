"use client";
import React, { useState } from "react";
import GRISVG from "../../../../../public/gri.svg";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const TopicSelectedPopup = ({ isModalOpen, setIsModalOpen }) => {
  const router= useRouter()
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="modal-content-custom-width">
              <div className="flex justify-between items-center drop-shadow-lg pt-6 w-full">
                <div className="flex">
                  <Image src={GRISVG} className="w-7 h-7 mr-2" />
                  <h2 className="self-stretch text-black  text-[18px] font-bold">
                    <span>Materiality topics selected</span>
                  </h2>
                </div>

                <button
                  className="absolute top-2 right-2 mt-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div>
              <p className="text-[14px] text-[#667085] font-[400] pt-4">
              The material topics for the selected time period and Organization and year has been selected and updated.
                </p>
              </div>
              <div className="flex justify-between items-center mt-5 mb-3">
              <button
                  className="w-auto h-full mr-2 py-2 px-3 text-[#727272]  cursor-pointer"
                  onClick={()=>{router.push("/dashboard")}}
                >
                  {"<"} Back to Dashboard
                </button>
                  <button className="w-auto h-full mr-2  py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer" 
                  >
                  Continue Materiality Assessment Process
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopicSelectedPopup;
