"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";
const Aside = ({ activeTab, handleTabClick, setMobileopen ,brsrFrameworkId }) => {
  const toggleSidebar = () => {
    setMobileopen(false);
  };
  return (
    <div className="m-3 ml-2  border border-r-2 border-b-2 shadow-lg rounded-lg h-full">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
        <div className="flex flex-col w-full font-medium">
          <div className="flex items-center px-2 py-2 -mt-4 mb-2 rounded-none focus:outline-none text-[#727272] font-bold">
            <div className="w-full">
              <span className="text-[16px] font-[600] p-2">
                Materiality Assessment
              </span>
            </div>
            <div className=" float-end block xl:hidden md:hidden lg:hidden 2xl:hidden 4k:hidden">
              <MdClose onClick={toggleSidebar} className="text-3xl" />
            </div>
          </div>
          <div>
            {/* <p className="text-[13px] text-[#727272] my-2 px-5">
           GRI
          </p> */}
            <p
              className={`text-[13px] text-[#727272]  my-2 cursor-pointer ${
                activeTab == "selectMaterialityTopic"
                  ? "bg-[#007eef0d] p-2 px-5"
                  : "bg-transparent p-2 px-5"
              }`}
              onClick={() => {
                handleTabClick("selectMaterialityTopic");
              }}
            >
              Select Materiality Topics
            </p>
            <p
              className={`text-[13px] text-[#727272]  my-2 cursor-pointer ${
                activeTab == "materialAssessmentProcess"
                  ? "bg-[#007eef0d] p-2 px-5"
                  : "bg-transparent  p-2 px-5"
              }`}
              onClick={() => {
                handleTabClick("materialAssessmentProcess");
              }}
            >
              Materiality Assessment Process
            </p>
            <p
              className={`text-[13px] text-[#727272]  my-2 cursor-pointer ${
                activeTab == "managementApproach"
                  ? "bg-[#007eef0d] p-2 px-5"
                  : "bg-transparent p-2 px-5"
              }`}
              onClick={() => {
                handleTabClick("managementApproach");
              }}
            >
              Management Approach
            </p>
            {
              brsrFrameworkId ==4 && (
                <p
              className={`text-[13px] text-[#727272]  my-2 cursor-pointer ${
                activeTab == "materialResponsibe"
                  ? "bg-[#007eef0d] p-2 px-5"
                  : "bg-transparent p-2 px-5"
              }`}
              onClick={() => {
                handleTabClick("materialResponsibe");
              }}
            >
              Material Responsible Business 
Conduct and Sustainability 
Issues
            </p>
              )
            }
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
