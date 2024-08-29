"use client";

import { useState } from "react";

const Aside = ({ activeTab, handleTabClick }) => {
  return (
    <div className="m-3 ml-2  border border-r-2 border-b-2 shadow-lg rounded-lg h-full">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
        <div className="w-full font-medium">
          <button className="flex items-center px-2 py-2 -mt-4 mb-2 rounded-none focus:outline-none text-[#727272] font-bold">
            <span className="text-[16px] font-[600] p-2">Materiality Module</span>
          </button>
          <div>
          <p className="text-[13px] text-[#727272] my-2 px-5">
           GRI
          </p>
          <p className={`text-[13px] text-[#727272]  my-2 ${activeTab=="selectMaterialityTopic"?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
          onClick={()=>{handleTabClick('selectMaterialityTopic')}}
          >
          Select Materiality Topics
          </p>
          <p className={`text-[13px] text-[#727272]  my-2 ${activeTab=="materialAssessmentProcess"?"bg-[#007eef0d] p-2 px-5":"bg-transparent  p-2 px-5"}`}
          onClick={()=>{handleTabClick('materialAssessmentProcess')}}
          >
          Materiality Assessment Process
          </p>
          <p className={`text-[13px] text-[#727272]  my-2 ${activeTab=="managementApproach"?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
          onClick={()=>{handleTabClick('managementApproach')}}
          >
          Management Approach
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
