"use client";
import { useState, useRef, useEffect } from "react";
import Risktable from "../tables/risktable";
import { useDispatch, useSelector } from "react-redux";

const Section11 = ({ section11_3_4Ref }) => {
  // Fetch data from Redux store
  const data = useSelector((state) => state.screen11Slice.getdata);
  // Map the specific part of the API response
  const economicData3 = (data && data['201_2a'] && data['201_2a']['201_2a3']) ? data['201_2a']['201_2a3'] : [];

  // Define column headers for the table
  const col = [
    "Risk Category",
    "Type of Risk",
    "Potential Impact",
    "Likelihood of Impact",
    "Magnitude of Impact",
    "Financial Effect",
    "Financial Implications",
    "Management Methods",
    "Time Frame",
    "Direct or Indirect Impacts",
    "Implemented Mitigation Strategies",
    "Mitigation Strategies",
  ];

  // Function to map each row's values from the API data
  const getRowValues3 = (item) => {
    return [
      item.RiskCategory || "N/A", // Adjusted to use the correct field from your data
      item.TypeofRiskoth || "N/A", // Corrected field names from your data structure
      item.PotentialImpactoth || "N/A",
      item.Likelihoodofimpact || "N/A",
      item.MagnitudeofImpact || "N/A",
      item.FinancialEffect || "N/A",
      // Join the array of Financial Implications or display as a string
      item.FinancialImplications ? item.FinancialImplications.join(", ") : "N/A",
      item.ManagementMethodsoth || "N/A", // Assuming ManagementMethodsoth is a string here
      item.TimeFrame || "N/A",
      item.DirectImpacts || "N/A",
      item.ImplementedMitigationStrategies === "Yes" ? "Yes" : "No",
      item.MitigationStrategiesoth || "N/A", // Use MitigationStrategiesoth
    ];
  };

  // Map each row of data if available
  const rows3 = economicData3.length > 0 ? economicData3.map(item => getRowValues3(item)) : [];

  return (
    <>
      <div id="section11_3_4" ref={section11_3_4Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.3.4. Climate-related Opportunities
        </h3>

        
          {rows3.length > 0 ? (
            <div className="rounded-md shadow-md mb-4">
            <Risktable col={col} rows={rows3} />
            </div>
          ) : (
            <p className="mb-4 text-sm">No data available</p>
            
          )}
        
      </div>
    </>
  );
};

export default Section11;
