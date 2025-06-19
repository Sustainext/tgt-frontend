"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIntegrationIntoOverall,
  selectRiskManagement,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const Section3 = ({ section6_3Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const riskManagement = useSelector(selectRiskManagement);

  return (
    <>
      <div>
        <div id="section6_3" ref={section6_3Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            6.3 Integration with Overall Risk Management
          </h3>

          {/* Integration Process */}
          <div className="mb-6 bg-blue-50 p-4 rounded border">
            <p className="text-blue-600 text-sm mb-2">
              (Note for devs: A tailored version of the 'Climate risks Integration into Organisation's Risk Management Framework' section's data is required here. i.e. skip yes/no response)
            </p>
            <p className="text-blue-600 text-sm mb-2">
              (If yes option is selected, fetch response from "If yes, describe how climate-related risk processes (identification, assessment, management) are integrated into your organization's overall risk management framework." question, without heading)
            </p>
            <div className="border-b border-blue-200 my-2"></div>
            <p className="text-blue-600 text-sm mb-4">
              (If 'No' option is selected skip entire section).
            </p>
            
            <div className="text-sm text-gray-700">
              {data.risk_integration || "Risk integration process details will be displayed here based on API response when 'Yes' option is selected."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;