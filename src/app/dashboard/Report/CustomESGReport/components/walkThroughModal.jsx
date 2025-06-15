'use client';

import React, { useState } from "react";


const walkthroughSteps = [
  {
    id: 1,
    title: "Drag sections between tables",
    description: "Drag and drop desired sections between available and selected section table to add or remove it from the report.",
    image: '/walkThroughOne.PNG',
  },
  {
    id: 2,
    title: "Select Sub-sections",
    description: "Select checkboxes from the dropdown to select or deselect sub sections.",
    image: '/walkThroughTwo.PNG',
  },
];

const WalkthroughModal = ({ setShow }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 w-[380px] shadow-xl flex flex-col items-center text-center">
        <img
          src={walkthroughSteps[currentStep].image}
          alt="Walkthrough Illustration"
          className="w-full h-auto mb-4"
        />
        {/* Clickable Indicators */}
        <div className="flex gap-2 mb-4">
          {walkthroughSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                currentStep === index ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        <h2 className="text-[16px] font-medium text-gray-900 mb-2">
          {walkthroughSteps[currentStep].title}
        </h2>

        <p className="text-sm text-gray-600 mb-4 pb-5 border-b border-gray-200">
          {walkthroughSteps[currentStep].description}
        </p>

        

        {/* Bottom Button */}
        <div className="flex justify-center w-full">
          <button
            onClick={()=>{setShow(false)}}
            className="text-sm text-gray-800 border border-gray-300 rounded-md px-4 py-1 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalkthroughModal;