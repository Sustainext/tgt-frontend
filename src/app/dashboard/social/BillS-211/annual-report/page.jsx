'use client'
import React, { useState } from "react";
import Screenone from "./screen1";
import Screentwo from "./screen2";
import Screenthree from "./screen3";
import Screenfour from "./screen4";
import Screenfive from "./screen5";
import Screensix from "./screen6";
import Screenseven from "./screen7";
import Screenend from "./screen8";
import { MdOutlineNavigateNext,MdOutlineNavigateBefore  } from "react-icons/md";

const Annualreport = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const totalSteps = 8;
  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  // State to keep track of selected options

  // Handler for checkbox change

  return (
    <>
      {/* Pagination */}

      <div className="h-[670px] overflow-y-auto scrollable-content">
        {currentStep === 1 && (
          <Screenone
            nextStep={nextStep}
            // handleChange={handleChange}
          />
        )}
         {currentStep === 2 && (
          <Screentwo nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 3 && (
          <Screenthree nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 4 && (
          <Screenfour nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 5 && (
          <Screenfive nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 6 && (
          <Screensix nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 7 && (
          <Screenseven nextStep={nextStep} prevStep={prevStep} />
        )}
       {currentStep === 8 && <Screenend prevStep={prevStep} />}
      </div>
      <div className="w-full">
        <div className="flex justify-center space-x-4 mt-[15px] w-full">
          {/* Previous Button */}
          <button
            className={`px-2  h-[27px] rounded-md text-dark ${currentStep===1?'text-gray-300':''}`}
            disabled={currentStep === 1}
            onClick={() => prevStep()}
            // style={{ display: currentStep === 1 ? "none" : "inline-block" }}
          >
            <MdOutlineNavigateBefore />
          </button>

          {/* Number Buttons */}
          {[...Array(totalSteps)].map((_, i) => (
            <button
              key={i}
              className={`px-2 h-[27px] text-[0.9rem] rounded-md ${
                currentStep === i + 1
                  ? "bg-white shadow-md text-blue-600"
                  : "text-dark hover:bg-gray-300"
              }`}
              onClick={() => goToStep(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            className={`px-2  h-[27px] rounded-md text-dark ${currentStep===7?'text-gray-300':''}`}
            disabled={currentStep === totalSteps}
            onClick={() => nextStep()}
            // style={{ display: currentStep === 7 ? "none" : "inline-block" }}
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
    </>
  );
};

export default Annualreport;