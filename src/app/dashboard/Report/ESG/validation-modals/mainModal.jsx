"use client";
import React, { useState } from "react";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axiosInstance from "../../../../../utils/axiosMiddleware";

const MainValidationPopup = ({reportid, statement,setStatement,handleChange,isModalOpen, setIsModalOpen,setActiveStep,orgName,fromDate,toDate }) => {
 
    
  
  return (
    <>
    {isModalOpen && (
  <div className="modal-overlay z-50 fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-4">
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <h2 className="text-black text-lg font-bold">Add Missing Data</h2>
          <p className="text-gray-600 text-sm mt-1">
            The data that are not filled in the report section are shown here
            below. Click on the fill now button if you wish to add any data
            before proceeding to Content Index section.
          </p>
          <div className="mt-2">
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Report Name:</span> Acme Corp. GRI
              Report 2023
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Created By:</span> Henry Cavill
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Reporting Period:</span>{" "}
              27/01/2023 to 27/01/2024
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Created On:</span> 8 Aug 2023
              09:58:06 am
            </p>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-semibold text-black mb-3">12. Environment</h3>
          {/* Example list items for missing fields */}
          <div className="mb-2">
            <p className="text-gray-800 text-sm">Add statement about company's responsibility to minimize the environmental impact</p>
            <button
              className="text-blue-600 text-sm font-medium underline hover:no-underline"
            //   onClick={() => handleFillNow('field_key')}
            >
              Fill now
            </button>
          </div>
          <div className="mb-2">
            <p className="text-gray-800 text-sm">Add statement about company's strategy to reduce emission</p>
            <button
              className="text-blue-600 text-sm font-medium underline hover:no-underline"
            //   onClick={() => handleFillNow('field_key')}
            >
              Fill now
            </button>
          </div>
          {/* Add other list items as needed */}
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="py-2 px-4 bg-transparent text-gray-700 rounded-lg shadow border border-gray-300 hover:bg-gray-100"
            // onClick={handleLeaveBlank}
          >
            Leave Blank and Proceed
          </button>
          <button
            className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            // onClick={handleSaveAndContinue}
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default MainValidationPopup;
