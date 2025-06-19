"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAssessmentProcess,
  setManagementProcess,
  selectRiskManagement,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const Section2 = ({ section6_2Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const riskManagement = useSelector(selectRiskManagement);

  return (
    <>
      <div>
        <div id="section6_2" ref={section6_2Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            6.2 Climate Risk Management
          </h3>

          {/* Risk Prioritization */}
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from "Describe the process your organization uses to prioritize climate-related risks, including how you assess their materiality to your business strategy, operations, and financial planning" question, without heading)
            </p>
            <div className="border-b border-blue-200 my-2"></div>
            <div className="text-sm text-gray-700">
              {data.risk_prioritization || "Risk prioritization process details will be displayed here based on API response."}
            </div>
          </div>

          {/* Risk Management Process */}
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Response from "Describe your organization's process for managing climate-related risks." question, without heading)
            </p>
            <div className="border-b border-blue-200 my-2"></div>
            <div className="text-sm text-gray-700">
              {data.risk_management_process || "Risk management process details will be displayed here based on API response."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;