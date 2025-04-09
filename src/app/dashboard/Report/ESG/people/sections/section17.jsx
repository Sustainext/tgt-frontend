"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeSkillUpgradePrograms } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section17 = ({ section13_5_2Ref, data }) => {
  const content = useSelector(
    (state) => state.screen13Slice.employee_skill_upgrade_programs
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setEmployeeSkillUpgradePrograms(
        `We invest in continuous learning and development opportunities for our employees. Our programs include skills training, leadership development, and transition assistance for those moving to new roles or retiring.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setEmployeeSkillUpgradePrograms(e.target.value));
  };

  return (
    <>
      <div id="section13_5_2" ref={section13_5_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          13.5.2 Programs for Upgrading Employee Skills and Transition
          Assistance Programs 
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s programs for upgrading employee’s
            skills
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
          Programs for upgrading employee skills:
        </p>
        {data["404_2a_2b_collect"] ? (
          data["404_2a_2b_collect"].length > 0 ? (
            data["404_2a_2b_collect"][0].Q1 ? (
              data["404_2a_2b_collect"][0].Q1 == "Yes" ? (
                <div>
                  <p className="text-[15px]  mb-2 font-semibold">
                    Type of program and its scope
                  </p>
                  <p className="text-sm mb-4">
                    {data["404_2a_2b_collect"][0].Q2
                      ? data["404_2a_2b_collect"][0].Q2
                      : "No data available"}
                  </p>
                  <p className="text-[15px]  mb-2 font-semibold">
                    Describe the programs provided to facilitate continued
                    employability
                  </p>
                  <p className="text-sm mb-4">
                    {data["404_2a_2b_collect"][0].Q3
                      ? data["404_2a_2b_collect"][0].Q3
                      : "No data available"}
                  </p>

                  <p className="text-[15px]  mb-2 font-semibold">
                    Describe assistance programs to manage career endings
                    resulting from retirement or termination
                  </p>
                  <p className="text-sm mb-4">
                    {data["404_2a_2b_collect"][0].Q4
                      ? data["404_2a_2b_collect"][0].Q4
                      : "No data available"}
                  </p>
                </div>
              ) : (
                <p className="text-sm mb-4">No</p>
              )
            ) : (
              <p className="text-sm mb-4">No data available</p>
            )
          ) : (
            <p className="text-sm mb-4">No data available</p>
          )
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}
      </div>
    </>
  );
};

export default Section17;
