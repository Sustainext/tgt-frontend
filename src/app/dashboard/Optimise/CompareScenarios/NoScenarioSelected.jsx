// NoScenarioSelected.jsx
import React from "react";
import Image from "next/image";
import { FiBarChart2, FiArrowUp } from "react-icons/fi";
import empty from "../../../../../public/empty-illustration.svg";

const NoScenarioSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 my-8 text-center">
      <div className="mb-8 relative">
        <Image 
          src={empty} 
          alt="No scenarios selected" 
          width={200} 
          height={200}
          className="opacity-90"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FiBarChart2 className="text-blue-500 h-16 w-16 opacity-70" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Select Scenario to Start Comparison
      </h2>
      
      <p className="text-center text-gray-600 mb-6 max-w-lg mx-auto">
        One or more scenarios are needed for analysis. Select scenarios from the list above to visualize and compare their emissions trajectories.
      </p>
      
    </div>
  );
};

export default NoScenarioSelected;