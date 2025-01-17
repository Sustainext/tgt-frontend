"use client";
import React, { useState } from "react";
import FrameworkModal from "./modal";
import { BsArrowsAngleExpand } from "react-icons/bs";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdInfoOutline,
} from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const frameworks = [
  {
    name: "GRI: In Accordance With",
    stepsCompleted: 5,
    totalSteps: 9,
    date: "June 2023 - June 2024",
    steps: [
      {
        stepNumber: 1,
        title: "Create and complete the materiality assessment",
        tooltip: "Complete Materiality assessment",
        completed: true,
      },
      {
        stepNumber: 2,
        title: "Fill all details under GRI Reporting Info",
        tooltip: "Fill GRI Reporting Info",
        completed: true,
      },
      {
        stepNumber: 3,
        title: "Fill the GRI Disclosures",
        tooltip: "Fill GRI Disclosures",
        completed: true,
      },
      {
        stepNumber: 4,
        title: "Create a new report",
        tooltip: "Create a new report",
        completed: true,
      },
      {
        stepNumber: 5,
        title: "Add the required details for each section",
        tooltip: "Fill Report",
        completed: true,
      },
      {
        stepNumber: 6,
        title: "Confirm or Edit the GRI statement of use",
        tooltip: "Confirm GRI statement of use",
        completed: true,
      },
      {
        stepNumber: 7,
        title: "Fill reasons for omissions",
        tooltip: "Add reasons for omissions",
        completed: false,
      },
      {
        stepNumber: 8,
        title: "Save the report and publish the content index",
        tooltip: "Save and publish the content index.",
        completed: false,
      },
      {
        stepNumber: 9,
        title: "Notify GRI",
        tooltip: "Notify GRI",
        completed: false,
      },
    ],
  },
  {
    name: "GRI: With Reference To",
    stepsCompleted: 5,
    totalSteps: 9,
    date: "June 2023 - June 2024",
    steps: [
      {
        stepNumber: 1,
        title: "Create and complete the materiality assessment",
        tooltip: "Complete Materiality assessment",
        completed: true,
      },
      {
        stepNumber: 2,
        title: "Fill all details under GRI Reporting Info",
        tooltip: "Fill GRI Reporting Info",
        completed: true,
      },
      {
        stepNumber: 3,
        title: "Fill the GRI Disclosures",
        tooltip: "Fill GRI Disclosures",
        completed: true,
      },
      {
        stepNumber: 4,
        title: "Create a new report",
        tooltip: "Create a new report",
        completed: true,
      },
      {
        stepNumber: 5,
        title: "Add the required details for each section",
        tooltip: "Fill Report",
        completed: true,
      },
      {
        stepNumber: 6,
        title: "Confirm or Edit the GRI statement of use",
        tooltip: "Confirm GRI statement of use",
        completed: true,
      },
      {
        stepNumber: 7,
        title: "Fill reasons for omissions",
        tooltip: "Add reasons for omissions",
        completed: false,
      },
      {
        stepNumber: 8,
        title: "Save the report and publish the content index",
        tooltip: "Save and publish the content index.",
        completed: false,
      },
      {
        stepNumber: 9,
        title: "Notify GRI",
        tooltip: "Notify GRI",
        completed: false,
      },
    ],
  },
];

const FrameworkProgress = () => {
  const [selectedFramework, setSelectedFramework] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const framework = frameworks[selectedFramework];

  const handlePrevious = () => {
    setSelectedFramework((prev) =>
      prev === 0 ? frameworks.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedFramework((prev) =>
      prev === frameworks.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md border border-gray-100">
      <div className="flex justify-between items-center">
        <div className="flex relative">
          <h2 className="text-[16px] font-semibold text-[#080808]">
            Framework Progress
          </h2>
          <MdInfoOutline
            data-tooltip-id={`tooltip-framework`}
            data-tooltip-html={`<p>The environmental component of ESG 
        focuses on an organization’s 
        interactions with the natural environment,
         including its use of resources, emissions, 
        and ecological footprint.</p>`}
            className="mt-[4px] ml-3 w-[16px] flex-shrink-0 text-[#878787]"
          />
          {/* Tooltip */}
          <ReactTooltip
            id={`tooltip-framework`}
            place="top"
            effect="solid"
            style={{
              width: "300px",
              backgroundColor: "#000",
              color: "white",
              fontSize: "12px",
              boxShadow: 3,
              borderRadius: "8px",
            }}
          ></ReactTooltip>
        </div>

        <BsArrowsAngleExpand
          className="w-4 h-4 text-[#878787] cursor-pointer hover:text-[#007EEF]  hover:bg-white hover:w-5 hover:h-5"
          onClick={() => setModalOpen(true)}
        />
      </div>

      <div className="mt-2">
        <p className="text-[12px] text-[#878787]">
          Reporting Period {framework.date}
        </p>

        {/* Framework Name with Navigation */}
        {frameworks.length > 1 && (
          <div className="flex items-center justify-center gap-10 my-6">
            <button
              onClick={handlePrevious}
              className="text-[#878787] text-md hover:text-[#007EEF] hover:bg-blue-100 rounded-sm"
            >
              <MdKeyboardArrowLeft />
            </button>
            <p className="text-[13.5px] text-[#080808]">{framework.name}</p>
            <button
              onClick={handleNext}
              className="text-[#878787] hover:text-[#007EEF] hover:bg-blue-100 text-md rounded-sm"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        )}

        <p className="my-2 text-[#080808] text-[12px]">
          Steps completed in GRI Framework
        </p>

        {/* Progress Bar */}
        <div className="flex items-center gap-1 mt-2 mb-2 cursor-pointer">
          {framework.steps.map((step, idx) => (
            <div
              key={idx}
              data-tooltip-id={`tooltip-${idx}`}
              className="relative"
              data-tooltip-html={`<p>${step.tooltip}</p>`}
            >
              <div
                className={`h-3 w-6 rounded ${
                  step.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <p className="text-center text-[#878787] text-[10px]">
                {step.stepNumber}
              </p>
              <ReactTooltip
                id={`tooltip-${idx}`}
                place="top"
                effect="solid"
                style={{
                  width: "150px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 6,
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {frameworks.length > 1 && (
          <div className="flex justify-center mt-5 gap-2">
            {frameworks.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full ${
                  selectedFramework === idx ? "bg-[#007EEF]" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <FrameworkModal
          framework={framework}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FrameworkProgress;
