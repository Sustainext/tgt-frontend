"use client";
import { useState, useRef, useEffect } from "react";

const Section14 = ({ section12_3Ref,data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.3':'12.3',
  sectionTitle = 'Water',
  sectionOrder = 12,
 }) => {
  const [content, setContent] = useState(
    `Our materials management strategy focuses on responsible sourcing, reducing material consumption, and increasing the use of recycled materials. We aim to minimize our environmental footprint by adopting sustainable practices throughout our supply chain. `
  );

  return (
    <>
      <div id="section12_3" ref={section12_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
         {sectionNumber} {sectionTitle}
        </h3>
        <p className="text-[15px]  mb-2 font-semibold">
          Interaction with water as shared resource:
        </p>
        <p className="text-sm mb-4">
          {data["303-1b-1c-1d"]?data["303-1b-1c-1d"].data?data["303-1b-1c-1d"].data[0]?data["303-1b-1c-1d"].data[0].Q1:"No data available":"No data available":"No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">Water related impacts</p>
        <p className="text-sm mb-2">
        {data["303-1b-1c-1d"]?data["303-1b-1c-1d"].data?data["303-1b-1c-1d"].data[0]?data["303-1b-1c-1d"].data[0].Q2:"No data available":"No data available":"No data available"}
        </p>
        <p className="text-sm mb-4">
        {data["303-1b-1c-1d"]?data["303-1b-1c-1d"].data?data["303-1b-1c-1d"].data[0]?data["303-1b-1c-1d"].data[0].Q3:"No data available":"No data available":"No data available"}
        </p>


        <p className="text-[15px]  mb-2 font-semibold">
          Water related goals and targets
        </p>
        <p className="text-sm mb-4">
        {data["303-1b-1c-1d"]?data["303-1b-1c-1d"].data?data["303-1b-1c-1d"].data[0]?data["303-1b-1c-1d"].data[0].Q4:"No data available":"No data available":"No data available"}
        </p>
      </div>
    </>
  );
};

export default Section14;
