"use client";
import { useState, useRef, useEffect } from "react";
import RatioTable from "../tables/ratioTable";

const Section7 = ({ section9_3Ref, section9_3_1Ref, data }) => {
  const col = [
    "The organization's purpose",
    "Value or mission statements",
    "Strategies",
    "Policies",
    "Goals related to sustainable development",
  ];
  const tableData = data["2_12_a"] ? Object.values(data["2_12_a"]) : "";
  return (
    <>
      <div id="section9_3" ref={section9_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          9.3 Responsibility, Evaluation, and Remuneration of the Board 
        </h3>
      </div>
      <div id="section9_3_1" ref={section9_3_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          9.3.1 Role of the Highest Governance Body
        </h3>
        {data["2_12_a"] ? (
          <div className="rounded-md shadow-md mb-4">
            <RatioTable col={col} tableData={tableData} />
          </div>
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}

        <p className="text-[15px] text-[#344054] mb-2 text-left font-semibold">
          Role of the highest governance body and of senior executives in
          overseeing the organization's due diligence and other processes to
          identify and manage the organization's impact on the economy,
          environment and people:
        </p>
        <p className="text-sm mb-4">
          {data["2_12_b"] ? data["2_12_b"].Q1 : "No data available"}
        </p>

        {/* <p className="text-[15px] text-[#344054] mb-2 text-left font-semibold">
          How the highest governance body engage with stakeholders to support
          these processes:{" "}
        </p> */}
        <p className="text-sm mb-4">
          {data["2_12_b"]
            ? data["2_12_b"].Q3
              ? data["2_12_b"].Q3
              : ""
            : ""}
        </p>

        {/* <p className="text-[15px] text-[#344054] mb-2 text-left font-semibold">
          How the highest governance body considers the outcomes of these
          processes:
        </p> */}
        <p className="text-sm mb-4">
          {data["2_12_b"] ? data["2_12_b"].Q4 : ""}
        </p>
      </div>
    </>
  );
};

export default Section7;
