"use client";
import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";

const tabs = [
  {
    title: "Full time Employee",
    tooltip:
      "Individuals with fixed-term contracts, typically offering benefits like health insurance and job security.",
  },
  {
    title: "Part time Employee",
    tooltip:
      "Individuals hired for specific projects or timeframes, often with limited benefits and shorter contracts.",
  },
  {
    title: "Temporary Employee",
    tooltip:
      "Individuals whose working hours vary and are not guaranteed, often with part-time or contract-based arrangements.",
  },
  { title: "", tooltip: "Tooltip for an empty tab." },
  { title: "", tooltip: "Tooltip for another empty tab." },
  { title: "", tooltip: "Tooltip for an empty tab." },
  { title: "", tooltip: "Tooltip for another empty tab." },
  { title: "", tooltip: "Tooltip for an empty tab." },

  // Additional empty tabs as needed
];

const Benefitstab = ({ selectedOrg, selectedCorp, year }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex mx-2">
          <div className="w-[80%] relative">
            <h2 className="flex ml-1 text-[15px] font-bold mb-2">Benefits</h2>
            <p className="text-[#667085] text-[13px] mb-4">
              Definition: Direct benefit provided in the form of financial
              contributions, care paid for by the organization, or the
              reimbursement of expenses borne by the employee. Example: Life
              Insurance, Health Care, Coverage, Parental Leave, Retirement
              Provision, Stock Ownership etc.
            </p>
            <h2 className="text-[#667085] text-[16px]">
              Select the type of employee from the tabs and add the benefits.
            </h2>
          </div>
        </div>
        {/* Tabs */}
        <ul className="flex cursor-pointer">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`flex justify-center items-center w-[172px] py-2 text-[12px] border-b-2 ${
                activeTabIndex === index && tab.title
                  ? "border-blue-500 text-blue-600"
                  : " text-gray-400 cursor-pointer border-gray-300"
              } ${tab.title ? " hover:text-blue-600 " : ""}`}
              onClick={() => tab.title && setActiveTabIndex(index)}
              style={{ pointerEvents: tab.title ? "auto" : "none" }}
            >
              <span className="text-[14px]">{tab.title || ""}</span>
            </li>
          ))}
        </ul>
        {/* Content */}
        <div className="mt-2">
          {activeTabIndex === 0 && (
            <div>
              <Tab1
                selectedOrg={selectedOrg}
                selectedCorp={selectedCorp}
                year={year}
              />
            </div>
          )}
          {activeTabIndex === 1 && (
            <div>
              <Tab2
                selectedOrg={selectedOrg}
                selectedCorp={selectedCorp}
                year={year}
              />
            </div>
          )}
          {activeTabIndex === 2 && (
            <div>
              <Tab3
                selectedOrg={selectedOrg}
                selectedCorp={selectedCorp}
                year={year}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Benefitstab;
