"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSafetyTraining } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section26 = ({ section13_6_9Ref, data,reportType }) => {
  const content = useSelector((state) => state.screen13Slice.safety_training);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setSafetyTraining(
        `Safety training is a cornerstone of our OHS program. We provide regular training sessions to ensure that all employees are aware of safety protocols and procedures.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setSafetyTraining(e.target.value));
  };
  const col1 = [
    "Occupational health and safety training provided to workers",
    "Generic Training",
    "Specific work-related hazards",
    "Hazardous Activities",
    "Hazardous Situations",
  ];

  const Tabledata = data["403-5a"]
    ? data["403-5a"]["data"].length > 0
      ? data["403-5a"]["data"].map((val, index) => {
          return {
            "Occupational health and safety training provided to workers":
              val.occupational,
            "Generic Training": val.generictraining,
            "Specific work-related hazards": val.specificworkre,
            "Hazardous Activities": val.hazardousactivities,
            "Hazardous Situations": val.hazardoussituations,
          };
        })
      : [
          {
            "Occupational health and safety training provided to workers":
              "No data available",
            "Generic Training": "No data available",
            "Specific work-related hazards": "No data available",
            "Hazardous Activities": "No data available",
            "Hazardous Situations": "No data available",
          },
        ]
    : [
        {
          "Occupational health and safety training provided to workers":
            "No data available",
          "Generic Training": "No data available",
          "Specific work-related hazards": "No data available",
          "Hazardous Activities": "No data available",
          "Hazardous Situations": "No data available",
        },
      ];

  return (
    <>
      <div id="section13_6_9" ref={section13_6_9Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {reportType=='GRI Report: In accordance With'?'13.6.9':'13.6.8'} Safety Training
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s safety training
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

        <p className="text-[15px]  mb-2 font-semibold">
          Occupational health and safety training
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col1} data={Tabledata} />
        </div>
      </div>
    </>
  );
};

export default Section26;
