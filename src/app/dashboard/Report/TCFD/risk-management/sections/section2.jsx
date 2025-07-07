"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAssessmentProcess,
  setManagementProcess,
  selectRiskManagement,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const Section2 = ({ section6_2Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const riskManagement = useSelector(selectRiskManagement);

  // Extract risk management data from tcfdCollectData
  const managementProcessData = tcfdCollectData?.climate_risk_management_process?.[0] || {};
  const materialityData = tcfdCollectData?.materiality_determination?.[0] || {};

  // Helper function to render array values
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <div key={index}>{item}</div>
      ));
    }
    return value || '';
  };

  return (
    <>
      <div>
        <div id="section6_2" ref={section6_2Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            6.2 Climate Risk Management
          </h3>

          <div className="mb-6">
            {/* <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Risk Prioritization Process
            </h4> */}
            <div className="text-sm">
              {renderArrayValue(materialityData?.Q1)}
            </div>
          </div>

          <div className="mb-6">
            {/* <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
              Climate Risk Management Process
            </h4> */}
            <div className="text-sm">
              {renderArrayValue(managementProcessData?.Q1)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;