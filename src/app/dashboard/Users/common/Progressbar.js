import React from "react";
import { MdCheck } from "react-icons/md";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Personal Details" },
    { id: 2, label: "Organization Details" },
    { id: 3, label: "Assign Permissions" },
  ];

  const currentStepIndex = currentStep - 1;

  return (
    <>
      <div className={`my-6 text-xl font-bold leading-snug tracking-tight ${currentStep > 0 ? "text-black" : "text-black"}`}>
        {steps[currentStepIndex] ? steps[currentStepIndex].label : "No Step Selected"}
      </div>
      <div className="flex justify-between items-center xl:w-[35%] lg:w-[35%] 2k:w-[35%] 4k:w-[35%] md:w-[35%] pr-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              {currentStep > step.id ? (
                <div className="bg-blue-500 w-7 h-7 rounded-full flex justify-center items-center"><MdCheck className="text-white" /></div>
              ) : currentStep === step.id ? (
                <div className="border-2 border-blue-500 w-7 h-7 rounded-full flex justify-center items-center text-blue-500 text-bold">{step.id}</div>
              ) : (
                <div className="bg-blue-500 w-7 h-7 rounded-full flex justify-center items-center text-white opacity-20">{step.id}</div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-auto mx-2 h-[1px] ${currentStep > step.id ? "bg-blue-500" : "bg-gray-300"}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ProgressBar;
