"use client";
import React from "react";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Importing icons for completed/incomplete steps

const FrameworkModal = ({ framework, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-3xl w-full shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{framework.name}</h3>
          <BsArrowsAngleExpand
            className="w-5 h-5 text-[#878787] cursor-pointer hover:text-[#007EEF] hover:bg-white"
            onClick={onClose}
          />
        </div>

        <div className="mt-2">
          <p className=" flex gap-1 text-sm text-[#878787] font-medium mb-2">
            Reporting Period: <select className="bg-white rounded-md focus:outline-none sm:text-sm mb-2 cursor-pointer hover:underline hover:decoration-blue-500"
                      //  onChange={(e) => setAssessmentId(e.target.value)}
                       >
                       <option  value="" disabled selected>Select Date Range</option>
                       <option class="text-black text-sm hover:bg-blue-100">June 2023 - June 2024</option>
                       <option class="text-black text-sm hover:bg-blue-100">June 2023 - June 2024</option>
                       <option class="text-black text-sm hover:bg-blue-100">June 2023 - June 2024</option>
                     </select>
          </p>
          <p className="text-sm text-[#878787] font-medium mb-4 mt-4">
            To report in accordance with the GRI Standards, the below steps are
            required to be completed.
          </p>
          <ul className="list-none pl-0 space-y-3">
            {framework.steps.map((step) => (
              <li
                key={step.stepNumber}
                className="flex items-center space-x-2 text-sm"
              >
                {step.completed ? (
                  <FaCheckCircle className="text-green-500 w-4 h-4 mb-3" />
                ) : (
                  <FaRegCircle className="text-gray-500 w-4 h-4 mb-3" />
                )}
                <span className="font-semibold text-[14px] mb-3">
                  Step {step.stepNumber}: <span className="text-[#71717A] ml-4 font-normal" >{step.title}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FrameworkModal;
