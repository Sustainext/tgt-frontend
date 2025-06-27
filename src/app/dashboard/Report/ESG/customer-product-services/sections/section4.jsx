"use client";
import { useState, useRef, useEffect } from "react";

const Section4 = ({ section15_1_3Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'15.1.3':'15.1.2',
  sectionTitle = 'Incidents of Non-Compliance',
  sectionOrder = 15,
 }) => {
  return (
    <>
      <div id="setion15_1_3" ref={section15_1_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
       {sectionNumber} {sectionTitle}
        </h3>
        <p className="text-[15px] mb-4 font-semibold">
        Total number of incidents of non-compliance with regulations and/or voluntary codes
        </p>
        <div>
          <p className="text-[15px] mb-2 font-semibold">
          Number of Incidents of non-compliance with regulations resulting in a fine or penalty: 
          </p>
          <p className="text-sm mb-4">
            {data["416_2a"]?.length > 0
              ? data["416_2a"][0].Q1
                ? data["416_2a"][0].Q1
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] mb-2 font-semibold">
          Number of Incidents of non-compliance with regulations resulting in a warning: 
          </p>
          <p className="text-sm mb-4">
            {data["416_2a"]?.length > 0
              ? data["416_2a"][0].Q2
                ? data["416_2a"][0].Q2
                : "No data available"
              : "No data available"}
          </p>

          <p className="text-[15px] mb-2 font-semibold">
          Number of Incidents of non-compliance with voluntary codes: 
          </p>
          <p className="text-sm mb-4">
            {data["416_2a"]?.length > 0
              ? data["416_2a"][0].Q3
                ? data["416_2a"][0].Q3
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] mb-2 font-semibold">
          Statement of non-compliance with regulations and/or voluntary codes
          </p>
          <p className="text-sm mb-4">
            {data["416_2b"]
              ? data["416_2b"].length > 0
                ? data["416_2b"][0].Q1
                  ? data["416_2b"][0].Q1
                  : "No data available"
                : "No data avalable"
              : "No data available"}
          </p>
        </div>
        <p className="text-[15px] mb-4 font-semibold">
        Incidents of non-compliance: product and service information and labelling 
        </p>
        <div>
          <p className="text-[15px] mb-2 font-semibold">
          Number of Incidents of non-compliance with regulations resulting in a fine or penalty: 
          </p>
          <p className="text-sm mb-4">
            {data["417_2a"]?.data
              ? data["417_2a"].data.length > 0
                ? data["417_2a"].data[0].Q1
                  ? data["417_2a"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] mb-2 font-semibold">
          Number of Incidents of non-compliance with regulations resulting in a warning: 
          </p>
          <p className="text-sm mb-4">
            {data["417_2a"]?.data
              ? data["417_2a"].data.length > 0
                ? data["417_2a"].data[0].Q2
                  ? data["417_2a"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"}
          </p>

          <p className="text-[15px] mb-2 font-semibold">
          Number of Incidents of non-compliance with voluntary codes: 
          </p>
          <p className="text-sm mb-4">
            {data["417_2a"]?.data
              ? data["417_2a"].data.length > 0
                ? data["417_2a"].data[0].Q3
                  ? data["417_2a"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] mb-2 font-semibold">
          Statement of non-compliance with regulations and/or voluntary codes
          </p>
          <p className="text-sm mb-4">
            {data["417_2b"]
              ? data["417_2b"].length > 0
                ? data["417_2b"][0].Q1
                  ? data["417_2b"][0].Q1
                  : "No data available"
                : "No data avalable"
              : "No data available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Section4;
