"use client";
import { useState, useRef, useEffect } from "react";
import Risktable from "../tables/risktable";
import { useDispatch, useSelector } from 'react-redux';

const Section10 = ({ section11_3_3Ref }) => {
  // Safely access the data from the Redux state
  const data = useSelector(state => state.screen11Slice.getdata);

  // Safely check if `data`, `data['201_2a']`, and `data['201_2a1']` exist
  const economicData = (data && data['201_2a'] && data['201_2a']['201_2a1']) ? data['201_2a']['201_2a1'] : [];
  const economicData2 = (data && data['201_2a'] && data['201_2a']['201_2a2']) ? data['201_2a']['201_2a2'] : [];
  const economicData3 = (data && data['201_2a'] && data['201_2a']['201_2a3']) ? data['201_2a']['201_2a3'] : [];
  const col = [
    "Risk Category",
    "Type of Risk",
    "Potential Impact",
    "Likelihood of impact",
    "Magnitude of Impact",
    "Financial Effect",
    "Financial Implications",
    "Management Methods",
    "Time Frame",
    "Direct or Indirect Impacts",
    "Implemented Mitigation Strategies",
    "Mitigation Strategies"
  ];

  // Function to extract the necessary data fields for each row
  const getRowValues = (item) => {
    return [
      "Physical Risk",  // Assuming this is a static value
      item.TypeofRisk || "N/A",
      item.PotentialImpact?.join(", ") + (item.PotentialImpact_others ? `, ${item.PotentialImpact_others}` : ""),
      item.Likelihoodofimpact || "N/A",
      item.MagnitudeofImpact || "N/A",
      item.FinancialEffect || "N/A",
      item.FinancialImplications?.join(", ") + (item.FinancialImplications_others ? `, ${item.FinancialImplications_others}` : ""),
      item.ManagementMethods?.join(", ") + (item.ManagementMethods_others ? `, ${item.ManagementMethods_others}` : ""),
      item.TimeFrame || "N/A",
      item.DirectImpacts || "N/A",
      item.ImplementedMitigationStrategies === "Yes" ? "Yes" : "No",
      item.MitigationStrategies + (item.MitigationStrategies_others ? `, ${item.MitigationStrategies_others}` : "")
    ];
  };
  const getRowValues2 = (item) => {
    return [
      "Transition Risk",  // Assuming this is a static value
      item.TypeofRisk || "N/A",
      item.PotentialImpact?.join(", ") + (item.PotentialImpact_others ? `, ${item.PotentialImpact_others}` : ""),
      item.Likelihoodofimpact || "N/A",
      item.MagnitudeofImpact || "N/A",
      item.FinancialEffect || "N/A",
      item.FinancialImplications?.join(", ") + (item.FinancialImplications_others ? `, ${item.FinancialImplications_others}` : ""),
      item.ManagementMethods?.join(", ") + (item.ManagementMethods_others ? `, ${item.ManagementMethods_others}` : ""),
      item.TimeFrame || "N/A",
      item.DirectImpacts || "N/A",
      item.ImplementedMitigationStrategies === "Yes" ? "Yes" : "No",
      item.MitigationStrategies + (item.MitigationStrategies_others ? `, ${item.MitigationStrategies_others}` : "")
    ];
  };
  const getRowValues3 = (item) => {
    return [
      "Other Risk"|| "N/A", // Adjusted to use the correct field from your data
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
  // Safely create rows for the table, ensure rows are always an array
  const rows = economicData.length > 0 ? economicData.map(item => getRowValues(item)) : [];
  const rows2 = economicData2.length > 0 ? economicData2.map(item => getRowValues2(item)) : [];
  const rows3 = economicData3.length > 0 ? economicData3.map(item => getRowValues3(item)) : [];
  return (
    <>
      <div id="section11_3_3" ref={section11_3_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.3.2.1 Climate-related Risks
        </h3>

        <div className="rounded-md shadow-md mb-4">
            <Risktable col={col} rows={rows} />
            </div>
          {/* {rows.length > 0 ? (
            
          ) : (
            <p className="mb-2 text-sm">No data available</p>
          )} */}
 <div className="rounded-md shadow-md mb-4">
          <Risktable col={col} rows={rows2} />
  </div>

  <div className="rounded-md shadow-md mb-4">
          <Risktable col={col} rows={rows3} />
  </div>
{/* {rows2.length > 0 ? (
 
            
          ) : (
            <p className="mb-4 text-sm">No data available</p>
          )} */}
        
      </div>
    </>
  );
};

export default Section10;
