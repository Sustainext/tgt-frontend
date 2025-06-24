"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setViolationDiscriminationPolicy } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section31 = ({ section13_8Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.8':'13.8',
  sectionTitle = "Incidents of Violation/Discrimination", 
  sectionOrder = 13
 }) => {
  const content = useSelector(
    (state) => state.screen13Slice.violation_discrimination_policy
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setViolationDiscriminationPolicy(
        `We are committed to respecting the rights of indigenous people and addressing any incidents of violations promptly and effectively. Our policies and practices aim to foster a respectful and inclusive environment for all.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setViolationDiscriminationPolicy(e.target.value));
  };

  const col1 = [
    "Type of Incident  ",
    "Total number of Incidents of discrimination ",
    "Describe the incident ",
  ];

  const Tabledata = data["406_1a"]
    ? data["406_1a"]["data"].length > 0
      ? data["406_1a"]["data"].map((val, index) => {
          return {
            "Type of Incident  ": val.typeofincident,
            "Total number of Incidents of discrimination ":
              val.totalnumberofincidentsofdiscrimination,
            "Describe the incident ": val.describetheincident,
          };
        })
      : [
          {
            "Type of Incident  ": "No data available",
            "Total number of Incidents of discrimination ": "No data available",
            "Describe the incident ": "No data available",
          },
        ]
    : [
        {
          "Type of Incident  ": "No data available",
          "Total number of Incidents of discrimination ": "No data available",
          "Describe the incident ": "No data available",
        },
      ];

  return (
    <>
      <div id="section13_8" ref={section13_8Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s policy for addressing violation/
            discrimination
          </p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
        <textarea
          onChange={handleEditorChange}
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Status of the incidents and actions taken
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Details about the Incident being reviewed by the organization
        </p>
        <p className="text-sm mb-4">
          {data["406_1b"]
            ? data["406_1b"].data
              ? data["406_1b"].data.length > 0
                ? data["406_1b"].data[0].Q1
                  ? data["406_1b"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Remediation plans implemented
        </p>
        <p className="text-sm mb-4">
          {data["406_1b"]
            ? data["406_1b"].data
              ? data["406_1b"].data.length > 0
                ? data["406_1b"].data[0].Q2
                  ? data["406_1b"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Remediation plans that have been implemented, with results reviewed
          through routine internal management review process
        </p>
        <p className="text-sm mb-4">
          {data["406_1b"]
            ? data["406_1b"].data
              ? data["406_1b"].data.length > 0
                ? data["406_1b"].data[0].Q3
                  ? data["406_1b"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          List which Incidents are no longer subject to action
        </p>
        <p className="text-sm mb-4">
          {data["406_1b"]
            ? data["406_1b"].data
              ? data["406_1b"].data.length > 0
                ? data["406_1b"].data[0].Q4
                  ? data["406_1b"].data[0].Q4
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Incidents of discrimination
        </p>
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={col1} data={Tabledata} />
        </div>
      </div>
    </>
  );
};

export default Section31;
