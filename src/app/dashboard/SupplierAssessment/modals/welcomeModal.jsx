"use client";
import React, { useState } from "react";

const WelcomeModal = ({ isModalOpen, setIsModalOpen }) => {
  
    const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
        heading: "Welcome to Supplier Assessments!",
      content:"Easily create and manage supplier assessments. This module helps you gather insights from stakeholders and suppliers efficiently."
    },
    {
        heading:"Create a New Assessment to Send to Suppliers",
      content: "Distribute your forms to selected suppliers and stakeholders. Track responses, monitor progress.",
    },
    {
        heading:"Criteria to Create a New Assessment",
      content: "To create and send assessment the user first needs to create:",
    },
    {
        heading:"Create Stakeholder group",
      content: "Get started by setting up your stakeholder groups.",
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
            
            <div className="border-b border-gray-200">
            <div className="pt-4">
              <p className="text-[17px] text-[#000] font-[700] text-center">
                {slides[currentSlide].heading}
              </p>
            </div>

            <div className="pt-4 mb-4">
              <p className="text-[14px] text-[#667085] font-[400] text-center">
                {slides[currentSlide].content}
              </p>
            </div>

            {currentSlide==2?(
                <div className="p-4 mt-2 mb-4 bg-gray-200 rounded-md">
                    <p className="text-[14px] text-[#667085] font-[400] text-left mb-2">
                    1. Assessment Form : Create structured question sets for assessments. Design tailored forms to collect the necessary information from suppliers.
              </p>
              <p className="text-[14px] text-[#667085] font-[400] text-left">
                    2. Create stakeholders groups with one or more stakeholders and assign to each assessment for efficient feedback collection.
              </p>
                </div>
            ):(
                <div></div>
            )}

            <div className="flex justify-center mt-2 mb-6">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${index === currentSlide ? 'bg-[#007EEF]' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
            </div>
           
  
            <div className="flex justify-between items-center mt-5 mb-3">
              {/* {currentSlide > 0 && (
                
              )} */}
              {currentSlide==3?(
                <button
                className="w-fit h-full py-2 text-[#727272]  cursor-pointer"
                onClick={() => {
                    setIsModalOpen(false);
                  }}
              >
               Create Later
              </button>
              ):(
                <div></div>
              )}

              <div className="flex gap-2 justify-end">
                {currentSlide!=0?(
                     <button
                     className="w-fit h-full mr-2 py-2 px-3 bg-transparent text-[#667085] border border-[#667085] rounded-[8px] shadow cursor-pointer"
                     onClick={handlePrev}
                   >
                     Previous
                   </button>
                ):(
                        <div></div>
                )}
             
                {currentSlide < slides.length - 1 ? (
                <button
                  className="w-[100px] h-full mr-2 py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  className="w-fit h-full mr-2 py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Create
                </button>
              )}
              </div>
              
  
             
            </div>
  
           
          </div>
        </div>
      </div>
    )}
    </>
    
   
  );
};

export default WelcomeModal;
