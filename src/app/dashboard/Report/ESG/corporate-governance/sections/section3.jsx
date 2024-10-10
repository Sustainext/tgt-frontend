"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import HighestGovernanceTable from "../tables/highestGovernanceTable";
import NominationTable from "../tables/nominationTable";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section3 = ({ section9_2Ref, section9_2_1Ref, data }) => {
  const rowLabels = [
    "Views of stakeholders (including shareholders)",
    "Diversity",
    "Independence",
    "Competencies relevant to the impacts of the Organization",
  ];
  const tableData = data["2_10_b"]
    ? data["2_10_b"].governance_body_nomination_criteria
      ? data["2_10_b"].governance_body_nomination_criteria.map(
          (item, index) => {
            return {
              ...item,
              Label: rowLabels[index],
            };
          }
        )
      : []
    : [];

  return (
    <>
      <div id="section9_2" ref={section9_2Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          9.2 General Governance
        </h3>
      </div>
      <div id="section9_2_1" ref={section9_2_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          9.2.1 Nomination, Selection of the Highest Governance Body
        </h3>
        <p className="text-sm mb-2">
          {data["2_10_a"] ? data["2_10_a"] : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["2_10_b"] ? data["2_10_b"].criteria : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Criteria considered for nomination and selection of the highest
          governance body 
        </p>
        <div className="mb-4 shadow-md rounded-md">
          <NominationTable tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default Section3;
