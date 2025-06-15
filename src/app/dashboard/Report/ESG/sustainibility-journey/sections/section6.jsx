"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section6 = ({ section10_3_2Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With'?'10.3.2':'10.3.1',
  sectionTitle = 'Local Suppliers',
 }) => {
  const [content, setContent] = useState(
    `Our approach to supply chain sustainability focuses on ensuring that our suppliers adhere to high environmental and social standards. We engage with our suppliers through regular assessments, audits, and capacity-building programs to help them improve their sustainability performance.`
  );
  return (
    <>
      <div ref={section10_3_2Ref} id="section10_3_2">
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
         {sectionNumber} {sectionTitle}
        </h3>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Percentage of the procurement budget used for significant locations of
          operation that is spent on suppliers local to that operation
        </p>
        <p className="text-sm mb-4">
          {data["204-1a"] ? data["204-1a"] + " %" : "No data available"}
        </p>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          The organization's geographical definition of "local"
        </p>
        <p className="text-sm mb-4">
          {data["204-1b"] ? data["204-1b"] : "No data available"}
        </p>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          The definition used for "significant locations of operation"
        </p>
        <p className="text-sm mb-4">
          {data["204-1c"] ? data["204-1c"] : "No data available"}
        </p>
      </div>
    </>
  );
};

export default Section6;
