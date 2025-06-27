"use client";
import { useState, useRef, useEffect } from "react";

const Section23 = ({ section13_6_6Ref, data, reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.6.6':'13.6.5',
  sectionTitle = "Prevention and Mitigation of OHS Impacts", 
  sectionOrder = 13
 }) => {
  const [content, setContent] = useState(``);

  return (
    <>
      <div id="section13_6_6" ref={section13_6_6Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
        </h3>

        <p className="text-[15px]  mb-2 font-semibold">
          Negative occupational health and safety impacts
        </p>
        <p className="text-sm mb-4">
          {data["403-7a-negative_occupational"]
            ? data["403-7a-negative_occupational"].data
              ? data["403-7a-negative_occupational"].data.length > 0
                ? data["403-7a-negative_occupational"].data[0].Q2
                  ? data["403-7a-negative_occupational"].data[0].Q2 || "No data available"
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">Hazards and risks</p>
        <p className="text-sm mb-4">
          {data["403-7a-hazards_risks"]
            ? data["403-7a-hazards_risks"].data
              ? data["403-7a-hazards_risks"].data.length > 0
                ? data["403-7a-hazards_risks"].data[0].Q1
                  ? data["403-7a-hazards_risks"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
      </div>
    </>
  );
};

export default Section23;
