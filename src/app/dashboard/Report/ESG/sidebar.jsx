"use client";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdMenu } from "react-icons/md";

// Sidebar content
const ESGSidebarContent = ({ activeStep, setActiveStep, closeMobile,reportType,handleNextStep }) => {
  const sections = [
    "Message from Our Leadership",
    "About the Company & Operations",
    "Mission, Vision, Value",
    "Sustainability Roadmap",
    "Awards & Alliances",
    "Stakeholder Engagement",
    "About the Report",
    "Materiality",
    "Corporate Governance",
    "Sustainability Journey",
    "Economic Performance",
    "Environment",
    "People",
    "Community",
    "Customers, products & services",
    reportType==='GRI Report: With Reference to'?'Management of Material Topic':''
  ];

  return (
    <div className="font-medium">
      <div className="flex items-center justify-between mb-4 xl:hidden lg:hidden">
        <span className="text-[16px] font-[600] text-[#727272] ml-2">
          Report Module
        </span>
        <button
        onClick={closeMobile}
          className="text-gray-700"
        >
          <MdKeyboardArrowLeft className="h-6 w-6" />
        </button>
      </div>
      <div className="hidden xl:block ">
        <div className="flex items-center px-2 py-2 -mt-4 text-[#727272] font-bold ">
          <span className="text-[16px] font-[600] p-2">Report Module</span>
        </div>
      </div>
      <div className="mb-3">
        {sections.map((text, index) => {
          const step = index + 1;
          return (
            <p
              key={step}
              className={`text-[13px] text-[#727272] cursor-pointer my-1 ${
                activeStep === step
                  ? "bg-[#007eef0d] p-2 px-5"
                  : "bg-transparent p-2 px-5"
              }`}
              onClick={() => {
                handleNextStep('toggle')//put call previous screen ki no changes to
                setActiveStep(step);// get call current screen ki
                if (closeMobile) closeMobile(); // Close on mobile tap
              }}
            >
              {text}
            </p>
          );
        })}
      </div>
    </div>
  );
};

// Main Sidebar Component
const ESGSidebar = ({ activeStep, setActiveStep,setIsOpenMobile,isOpenMobile,reportType,handleNextStep }) => {


  return (
    <>
      {/* Desktop Sidebar */}
      <div className="m-3 ml-2 border border-r-2 border-b-2 shadow-lg rounded-lg h-full hidden xl:block lg:block">
        <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
          <ESGSidebarContent
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            reportType={reportType}
            handleNextStep={handleNextStep}
          />
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button */}
   

      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Mobile Sidebar Sliding from Left */}
      <div
        className={`fixed top-[7rem] left-0 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        } w-72`}
      >
        <div className="p-4">
          {/* Close Button */}
          {/* <button
            onClick={() => setIsOpenMobile(false)}
            className="text-gray-700 w-full mb-4"
          >
            <MdKeyboardArrowLeft className="h-6 w-6 float-end" />
          </button> */}

          {/* Sidebar Content */}
          <ESGSidebarContent
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            closeMobile={() => setIsOpenMobile(false)}
            reportType={reportType}
            handleNextStep={handleNextStep}
          />
        </div>
      </div>
    </>
  );
};

export default ESGSidebar;
