"use client";
import { useState, useRef, useEffect } from "react";

const Section19 = ({ section13_6_2Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.6.2':'13.6.1',
  sectionTitle = "OHS Management System", 
  sectionOrder = 13
 }) => {
  const [content, setContent] = useState(
    `Our Occupational Health and Safety (OHS) management system is designed to prevent workplace injuries and illnesses. It includes policies, procedures, and practices that ensure a safe working environment. `
  );

  return (
    <>
      <div id="section13_6_2" ref={section13_6_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle} 
        </h3>

       
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Reasons for implementing Occupational Health & Safety Management
          System
        </p>
        <p className="text-sm mb-2">
          {data["403-1a-ohs_management_system"]
            ? data["403-1a-ohs_management_system"].data
              ? data["403-1a-ohs_management_system"].data.length > 0
                ? data["403-1a-ohs_management_system"].data[0].Q1
                  ? data["403-1a-ohs_management_system"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {Array.isArray(
            data["403-1a-ohs_management_system"]?.data?.[0]?.Q2?.selected
          )
            ? data["403-1a-ohs_management_system"].data[0].Q2.selected.join(
                ", "
              )
            : typeof data["403-1a-ohs_management_system"]?.data?.[0]?.Q2
                ?.selected === "string"
            ? data["403-1a-ohs_management_system"].data[0].Q2.selected
            : data["403-1a-ohs_management_system"]?.data?.[0]?.Q2?.otherValue ||
              "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          List of legal requirements
        </p>
        <p className="text-sm mb-2">
          {data["403-1a-ohs_management_system"]
            ? data["403-1a-ohs_management_system"].data
              ? data["403-1a-ohs_management_system"].data.length > 0
                ? data["403-1a-ohs_management_system"].data[0].Q3
                  ? data["403-1a-ohs_management_system"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          List of Standards/Guidelines
        </p>
        <p className="text-sm mb-2">
          {data["403-1a-ohs_management_system"]
            ? data["403-1a-ohs_management_system"].data
              ? data["403-1a-ohs_management_system"].data.length > 0
                ? data["403-1a-ohs_management_system"].data[0].Q4
                  ? data["403-1a-ohs_management_system"].data[0].Q4 == "No"
                    ? "No"
                    : ""
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403-1a-ohs_management_system"]
            ? data["403-1a-ohs_management_system"].data
              ? data["403-1a-ohs_management_system"].data.length > 0
                ? data["403-1a-ohs_management_system"].data[0].Q4
                  ? data["403-1a-ohs_management_system"].data[0].Q4 == "Yes"
                    ? data["403-1a-ohs_management_system"].data[0].Q5
                      ? data["403-1a-ohs_management_system"].data[0].Q5
                      : ""
                    : ""
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Workers covered
        </p>
        <p className="text-sm mb-2">
          {data["403-1b-scope_of_workers"]
            ? data["403-1b-scope_of_workers"].data
              ? data["403-1b-scope_of_workers"].data.length > 0
                ? data["403-1b-scope_of_workers"].data[0].Q1
                  ? data["403-1b-scope_of_workers"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Activities covered
        </p>
        <p className="text-sm mb-2">
          {data["403-1b-scope_of_workers"]
            ? data["403-1b-scope_of_workers"].data
              ? data["403-1b-scope_of_workers"].data.length > 0
                ? data["403-1b-scope_of_workers"].data[0].Q2
                  ? data["403-1b-scope_of_workers"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Workplaces Covered
        </p>
        <p className="text-sm mb-2">
          {data["403-1b-scope_of_workers"]
            ? data["403-1b-scope_of_workers"].data
              ? data["403-1b-scope_of_workers"].data.length > 0
                ? data["403-1b-scope_of_workers"].data[0].Q3
                  ? data["403-1b-scope_of_workers"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Exclusions
        </p>
        <p className="text-sm mb-2">
          {data["403-1b-scope_of_workers"]
            ? data["403-1b-scope_of_workers"].data
              ? data["403-1b-scope_of_workers"].data.length > 0
                ? data["403-1b-scope_of_workers"].data[0].Q4
                  ? data["403-1b-scope_of_workers"].data[0].Q4
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Reason for exclusion
        </p>
        <p className="text-sm mb-4">
          {data["403-1b-scope_of_workers"]
            ? data["403-1b-scope_of_workers"].data
              ? data["403-1b-scope_of_workers"].data.length > 0
                ? data["403-1b-scope_of_workers"].data[0].Q5
                  ? data["403-1b-scope_of_workers"].data[0].Q5
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
      </div>
    </>
  );
};

export default Section19;
