// EmptyState.jsx
import React from "react";
import Image from "next/image";
import { FiPlus, FiTarget, FiTrendingUp, FiBarChart2 } from "react-icons/fi";
import empty from "../../../../../public/empty-illustration.svg";

const EmptyState = ({ setIsCreateModalOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 my-8 bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="mb-8 relative">
        <div className="relative">
          <Image 
            src={empty} 
            alt="No scenarios available" 
            width={256} 
            height={256}
            priority
            className="transition-opacity duration-500 ease-in-out opacity-90 hover:opacity-100"
          />
          <div className="absolute bottom-4 right-4 bg-blue-100 rounded-full p-3">
            <FiBarChart2 className="text-blue-600 h-8 w-8" />
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        No Scenarios Present
      </h2>
      
      <p className="text-center text-gray-600 mb-8 max-w-lg px-4">
        Define your goals, set metrics, and visualize your path to achieving
        net-zero emissions. Create your first scenario to start analyzing your sustainability journey.
      </p>
      
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl">
        <FeatureCard 
          icon={<FiTarget className="h-6 w-6 text-green-500" />}
          title="Set Goals"
          description="Define your sustainability targets and timeline for achieving net-zero emissions."
        />
        <FeatureCard 
          icon={<FiTrendingUp className="h-6 w-6 text-blue-500" />}
          title="Track Progress"
          description="Monitor your emissions reduction over time and adjust strategies as needed."
        />
        <FeatureCard 
          icon={<FiBarChart2 className="h-6 w-6 text-purple-500" />}
          title="Compare Scenarios"
          description="Evaluate different approaches to find the most effective pathway."
        />
      </div> */}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:border-gray-200 transition-all hover:shadow-sm">
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="font-medium text-gray-900 ml-2">{title}</h3>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default EmptyState;