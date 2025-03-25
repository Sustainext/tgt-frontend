"use client";
import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";
import Tab4 from "./tab4";
import Tab5 from "./tab5";

function convertShortNameToFullName(shortName) {
  const shortMonthNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const fullMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert shortName to string in case it's not
  const index = shortMonthNames.indexOf(shortName);
  return index !== -1 ? fullMonthNames[index] : "Unknown";
}
const tabs = [
  {
    title: "Permanent Employees",
    tooltip:
      "Individuals with fixed-term contracts, typically offering benefits like health insurance and job security.",
  },
  {
    title: "Temporary employee",
    tooltip:
      "Individuals hired for specific projects or timeframes, often with limited benefits and shorter contracts.",
  },
  {
    title: "Nonguaranteed Hours Employees",
    tooltip:
      "Individuals whose working hours vary and are not guaranteed, often with part-time or contract-based arrangements.",
  },
  {
    title: "Full-Time Employee",
    tooltip: "Individuals working a regular, fixed schedule.",
  },
  {
    title: "Part-Time Employee",
    tooltip: "Individuals working less than a regular, full-time schedule.",
  },
];

const Employeeturnover = ({ selectedOrg, selectedCorp, year, month,togglestatus }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const fullName = convertShortNameToFullName(month);
  const [tooltipIds] = useState(
    tabs.map(() => `tooltip-${Math.random().toString(36).substr(2, 9)}`)
  );
  return (
    <>
      <div className="mb-4 flex mx-2">
        <div className="w-[80%] relative">
          <h2 className="flex ml-1 text-[15px] font-bold">
            Employee turnover
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e1`}
              data-tooltip-content="This section documents data corresponding
                        to the total number and rate of employee
                       turnover during the reporting period,
                       categorized by age group, gender, and region.
                       Employee turnover: employees who leave the organization
                       voluntarily or due to dismissal, retirement, or death in service."
              className="mt-1.5 ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-$e1`}
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
              }}
            ></ReactTooltip>
          </h2>
        </div>
      </div>

      <div className="shadow-md rounded-md mx-2">
        {/* Tabs */}
        <ul className="hidden md:flex xl:flex lg:flex 2xl:flex 4k:flex 2k:flex 3xl:flex justify-evenly cursor-pointer">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`flex-1 text-center relative border-b-2 py-2 text-[12px] ${
                  activeTabIndex === index
                    ? "border-blue-500 text-blue-600"
                    : "border-gray-300 text-gray-600"
                } `}
                onClick={() => setActiveTabIndex(index)}
              >
                <div className="flex justify-center items-center space-x-1 ">
                  <span className="text-[14px]">{tab.title}</span>
                  <MdInfoOutline
                    data-tooltip-id={`tooltip-${tab.title.replace(
                      /\s+/g,
                      "-"
                    )}`}
                    data-tooltip-content={tab.tooltip}
                    className="text-[14px]"
                  />
                </div>
                <ReactTooltip
                  id={`tooltip-${tab.title.replace(/\s+/g, "-")}`}
                  place="top"
                  effect="solid"
                  style={{
                    width: "290px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                    textAlign: "left",
                  }}
                ></ReactTooltip>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-2 md:hidden xl:hidden lg:hidden 2xl:hidden 4k:hidden 2k:hidden 3xl:hidden p-2">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`p-3 text-center border rounded-lg cursor-pointer relative ${
                  activeTabIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTabIndex(index)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm">{tab.title}</span>
                  <MdInfoOutline
                    data-tooltip-id={tooltipIds[index]}
                    data-tooltip-content={tab.tooltip}
                    className="text-[14px]"
                  />
                </div>
                <ReactTooltip
                  id={tooltipIds[index]}
                  place="top"
                  effect="solid"
                  style={{
                    width: "290px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                    textAlign: "left",
                    zIndex: "1000",
                  }}
                ></ReactTooltip>
              </div>
            ))}
          </div>
        {/* Content */}
        <div className="mt-2">
          {activeTabIndex === 0 && (
            <div>
              <Tab1
                fullName={fullName}
                year={year}
                month={month}
                selectedCorp={selectedCorp}
                selectedOrg={selectedOrg}
                togglestatus={togglestatus}
              />
            </div>
          )}
          {activeTabIndex === 1 && (
            <div>
              <Tab2
                fullName={fullName}
                year={year}
                month={month}
                selectedCorp={selectedCorp}
                selectedOrg={selectedOrg}
                togglestatus={togglestatus}
              />{" "}
            </div>
          )}
          {activeTabIndex === 2 && (
            <div>
              {" "}
              <Tab3
                fullName={fullName}
                year={year}
                month={month}
                selectedCorp={selectedCorp}
                selectedOrg={selectedOrg}
                togglestatus={togglestatus}
              />{" "}
            </div>
          )}
          {activeTabIndex === 3 && (
            <div>
              {" "}
              <Tab4
                fullName={fullName}
                year={year}
                month={month}
                selectedCorp={selectedCorp}
                selectedOrg={selectedOrg}
                togglestatus={togglestatus}
              />{" "}
            </div>
          )}
          {activeTabIndex === 4 && (
            <div>
              {" "}
              <Tab5
                fullName={fullName}
                year={year}
                month={month}
                selectedCorp={selectedCorp}
                selectedOrg={selectedOrg}
                togglestatus={togglestatus}
              />{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Employeeturnover;
