"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIntegrationIntoOverall,
  selectRiskManagement,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const Section3 = ({ section6_3Ref, data, tcfdCollectData, orgName }) => {
  const dispatch = useDispatch();
  const riskManagement = useSelector(selectRiskManagement);

  // Extract integration data from tcfdCollectData
  const integrationData = tcfdCollectData?.climate_risks_integration_into_organisations_risk_management_framework?.[0] || {};

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
        <div id="section6_3" ref={section6_3Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            6.3 Integration with Overall Risk Management
          </h3>

          {/* Only show if Q1 is Yes */}
          {integrationData?.Q1 === 'Yes' && (
            <div className="mb-6">
              <h4 className="text-[15px] text-[#344054] mb-2 font-semibold">
                Integration of Climate Risk Processes into Overall Risk Management Framework
              </h4>
              <div className="text-sm">
                {renderArrayValue(integrationData?.Q2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Section3;