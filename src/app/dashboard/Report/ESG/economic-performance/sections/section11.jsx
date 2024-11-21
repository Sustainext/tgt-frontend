"use client";
import { useState, useRef, useEffect } from "react";
import Risktable from "../tables/risktable";
import { useDispatch, useSelector } from "react-redux";

const Section11 = ({ section11_3_4Ref }) => {
  // Fetch data from Redux store
  const data = useSelector((state) => state.screen11Slice.getdata);
  // Map the specific part of the API response
  const economicData4 = (data && data['202_2a']) ? data['202_2a']: [];

  // Define column headers for the table
  const col = [
    "Type of Opportunities",
    "Potential Impact",
    "Magnitude of Impact",
    "Likelihood of Impact",
    "Financial Effect",
    "Financial Implications",
    "Management Methods",
    "Time Frame",
    "Direct or Indirect Impacts",
    "Implemented Mitigation Strategies",
    "Mitigation Strategies",
  ];

  // Function to map each row's values from the API data
  const getRowValues4 = (item) => {
    return [
      item.TypeofOpportunities || "N/A", // Adjusted to use the correct field from your data
      item.PotentialImpact?.join(", ") + (item.PotentialImpact_others ? `, ${item.PotentialImpact_others}` : ""),
      item.MagnitudeofImpact || "N/A",
      item.Likelihoodofimpact || "N/A",
      item.FinancialEffect || "N/A",
      // Join the array of Financial Implications or display as a string
      item.FinancialImplications?.join(", ") + (item.FinancialImplications_others ? `, ${item.FinancialImplications_others}` : ""),
      item.ManagementMethods?.join(", ") + (item.ManagementMethods_others ? `, ${item.ManagementMethods_others}` : ""),
      item.TimeFrame || "N/A",
      item.DirectorIndirectImpacts || "N/A",
      item.ImplementedMitigationStrategies === "Yes" ? "Yes" : "No",
      item.MitigationStrategies || "N/A", // Use MitigationStrategiesoth
    ];
  };


  // Map each row of data if available
  const rows4 = economicData4.length > 0 ? economicData4.map(item => getRowValues4(item)) : [];

  return (
    <>
      <div id="section11_3_4" ref={section11_3_4Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.3.2.2 Climate-related Opportunities
        </h3>

        <div className="rounded-md shadow-md mb-4">
            <Risktable col={col} rows={rows4} />
            </div>
          {/* {rows3.length > 0 ? (
           
          ) : (
            <p className="mb-4 text-sm">No data available</p>
            
          )} */}
        
      </div>
    </>
  );
};

export default Section11;
