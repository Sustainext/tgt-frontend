"use client";
import { useState, useRef, useEffect } from "react";

const Section22 = ({ section13_6_5Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.6.5':'13.6.4',
  sectionTitle = "Promotion of Worker Health", 
  sectionOrder = 13
 }) => {
  const [content, setContent] = useState(``);

  return (
    <>
      <div id="section13_6_5" ref={section13_6_5Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
        </h3>

        <p className="text-[15px]  mb-2 font-semibold">
          Access to non-occupational medical and healthcare services
        </p>
        <p className="text-sm mb-4">
          {data["403-6a-access_non_occupational"]
            ? data["403-6a-access_non_occupational"].data
              ? data["403-6a-access_non_occupational"].data.length > 0
                ? data["403-6a-access_non_occupational"].data[0].Q1
                  ? data["403-6a-access_non_occupational"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px]  mb-2 font-semibold">Scope of access</p>
        <p className="text-sm mb-4">
          {data["403-6a-scope_of_access"]
            ? data["403-6a-scope_of_access"].data
              ? data["403-6a-scope_of_access"].data.length > 0
                ? data["403-6a-scope_of_access"].data[0].Q1
                  ? data["403-6a-scope_of_access"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
          Voluntary health promotion and programs offered
        </p>
        <p className="text-sm mb-4">
          {data["403-6a-voluntary_health"]
            ? data["403-6a-voluntary_health"].data
              ? data["403-6a-voluntary_health"].data.length > 0
                ? data["403-6a-voluntary_health"].data[0].Q1
                  ? data["403-6a-voluntary_health"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">Health risk addressed</p>
        <p className="text-sm mb-4">
          {data["403-6a-health_risk"]
            ? data["403-6a-health_risk"].data
              ? data["403-6a-health_risk"].data.length > 0
                ? data["403-6a-health_risk"].data[0].Q1
                  ? data["403-6a-health_risk"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Workers' access to the services and programs
        </p>
        <p className="text-sm mb-4">
          {data["403-6b-workers_access"]
            ? data["403-6b-workers_access"].data
              ? data["403-6b-workers_access"].data.length > 0
                ? data["403-6b-workers_access"].data[0].Q1
                  ? data["403-6b-workers_access"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
      </div>
    </>
  );
};

export default Section22;
