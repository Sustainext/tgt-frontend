"use client";
import { useState, useRef, useEffect } from "react";
import RatioTable from "../tables/ratioTable";

const Section4 = ({ section9_2_2Ref, data }) => {
  const col = [
    "Their function within the organization",
    "Reasons for this arrangement",
    "How conflicts of interest are prevented and mitigated",
  ];
  const values = data["2_11_b"]
    ? data["2_11_b"].table
      ? Object.values(data["2_11_b"].table)
      : ""
    : "";
  return (
    <>
      <div id="section9_2_2" ref={section9_2_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          9.2.2 Chair of the Highest Governance Body
        </h3>
        <p className="text-sm mb-4">
          {data["2_11_b"]
            ? data["2_11_b"].is_chair_of_highest_governance
              ? data["2_11_b"].is_chair_of_highest_governance == "No"
                ? "No"
                : ""
              : "No data available"
            : "No data available"}
        </p>

        {data["2_11_b"] ? (
          data["2_11_b"].table ? (
            <div className="rounded-md shadow-md mb-4">
              <RatioTable col={col} values={values} />
            </div>
          ) : (
            <div></div>
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Section4;
