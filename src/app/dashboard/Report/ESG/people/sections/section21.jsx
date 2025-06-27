"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setOHSPolicies } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section21 = ({ section13_6_4Ref, data, reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.6.4':'13.6.3',
  sectionTitle = "Worker Participation, Consultation, and Communication on OHS", 
  sectionOrder = 13
 }) => {
  const content = useSelector((state) => state.screen13Slice.ohs_policies);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setOHSPolicies(
        `We engage our workers in OHS through participation, consultation, and communication. This ensures that their insights and concerns are considered in our safety practices.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setOHSPolicies(e.target.value));
  };
  const col = [
    "Formal joint management-worker health and safety committees",
    "Responsibilities",
    "Meeting Frequency",
    "Decision-making authority",
    "Exclusions (if any) & Reason for Exclusions",
  ];

  const Tabledata = data["get_403_analyse"]
    ? data["get_403_analyse"]["formal_joint_management"].length > 0
      ? data["get_403_analyse"]["formal_joint_management"].map((val, index) => {
          return {
            "Formal joint management-worker health and safety committees":
              val.committeeName,
            Responsibilities: val.responsibilities,
            "Meeting Frequency": val.meetingFrequency,
            "Decision-making authority": val.decisionMaking,
            "Exclusions (if any) & Reason for Exclusions": val.exclusions,
          };
        })
      : [
          {
            "Formal joint management-worker health and safety committees":
              "No data available",
            Responsibilities: "No data available",
            "Meeting Frequency": "No data available",
            "Decision-making authority": "No data available",
            "Exclusions (if any) & Reason for Exclusions": "No data available",
          },
        ]
    : [
        {
          "Formal joint management-worker health and safety committees":
            "No data available",
          Responsibilities: "No data available",
          "Meeting Frequency": "No data available",
          "Decision-making authority": "No data available",
          "Exclusions (if any) & Reason for Exclusions": "No data available",
        },
      ];

  return (
    <>
      <div id="section13_6_4" ref={section13_6_4Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s OHS policies
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

        {/* <p className="text-sm mb-2">
          {data["403-4a-ohs_system_1"]
            ? data["403-4a-ohs_system_1"].data
              ? data["403-4a-ohs_system_1"].data.length > 0
                ? data["403-4a-ohs_system_1"].data[0].Q1
                  ? data["403-4a-ohs_system_1"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p> */}
        <p className="text-sm mb-2">
          {data["403-4a-ohs_system_2"]
            ? data["403-4a-ohs_system_2"].data
              ? data["403-4a-ohs_system_2"].data.length > 0
                ? data["403-4a-ohs_system_2"].data[0].Q1
                  ? data["403-4a-ohs_system_2"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403-4a-ohs_system_2"]
            ? data["403-4a-ohs_system_2"].data
              ? data["403-4a-ohs_system_2"].data.length > 0
                ? data["403-4a-ohs_system_2"].data[0].Q2
                  ? data["403-4a-ohs_system_2"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
          Formal joint management-worker health and safety committees 
        </p>
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={col} data={Tabledata} />
        </div>
      </div>
    </>
  );
};

export default Section21;
