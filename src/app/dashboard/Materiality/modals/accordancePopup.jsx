"use client";
import React, { useState } from "react";
import GRISVG from "../../../../../public/gri.svg";
import Image from "next/image";

const AccordancePopup = ({ isModalOpen, setIsModalOpen }) => {
  
    const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      content: "Material topics are topics that represent the organization’s most significant impacts on the economy, environment, and people, including impacts on their human rights. Section 1 of this Standard provides guidance on how to determine material topics and helps in understanding and reporting the disclosures in this section.",
    },
    {
        heading:"Disclosure 3-1 Process to determine material topics",
      content: "This disclosure requires information on how the organization has determined its material topics.",
    },
    {
        heading:"Disclosure 3-2 List of material topics",
      content: "This disclosure requires information on the organization’s material topics.",
    },
    {
        heading:"Disclosure 3-3 Management of material topics",
      content: "This disclosure requires the organization to explain how it manages each of its material topics. This means that the organization is required to report this disclosure for each of its material topics. The requirements in this disclosure apply to every material topic.",
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <>
    {isModalOpen && (
        <div className="modal-overlay z-50">
        <div className="modal-center">
          <div className="modal-content-custom">
            <div className="flex justify-between items-center drop-shadow-lg pt-6 w-full">
              <div className="flex">
                <Image src={GRISVG} className="w-7 h-7 mr-2" />
                <h2 className="self-stretch text-black text-[18px] font-bold">
                  <span>GRI-Material Topic</span>
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
            
            <div className="pt-4">
              <p className="text-[15px] text-[#000] font-[700]">
                {slides[currentSlide].heading}
              </p>
            </div>

            <div className="pt-4">
              <p className="text-[14px] text-[#667085] font-[400]">
                {slides[currentSlide].content}
              </p>
            </div>
  
            <div className="flex justify-between items-center mt-5 mb-3">
              {/* {currentSlide > 0 && (
                
              )} */}
              <button
                  className="w-2/6 h-full mr-2 py-2 px-3 text-[#727272]  cursor-pointer"
                  onClick={handlePrev}
                >
                  Previous
                </button>
  
              {currentSlide < slides.length - 1 ? (
                <button
                  className="w-2/6 h-full mr-2 py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  className="w-2/6 h-full mr-2 py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Done
                </button>
              )}
            </div>
  
            <div className="flex justify-center mt-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${index === currentSlide ? 'bg-[#007EEF]' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
    
   
  );
};

export default AccordancePopup;
