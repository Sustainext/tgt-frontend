"use client";
import { useState, useRef, useEffect } from "react";
import PerformanceReviewTable from "../tables/performanceTable";
import LeaveTable from "../tables/leaveTable";
import TrainingTable from "../tables/trainingTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setPerformanceReviewProcess } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section7 = ({ section13_1_6Ref, data,reportType }) => {
  const content = useSelector(
    (state) => state.screen13Slice.performance_review_process
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setPerformanceReviewProcess(
        `Regular performance reviews and career development planning are integral to our employee management approach. We provide ongoing feedback, set clear goals, and offer opportunities for professional growth and advancement.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setPerformanceReviewProcess(e.target.value));
  };
  const col = [
    "Employee Category",
    "Percentage of employees who received regular performance review",
    "Percentage of employees who received regular career development review",
  ];
  const Tabledata = data["404_social_analyse"]
    ? data["404_social_analyse"][
        "percentage_of_employees_receiving_regular_performance_and_career_development_reviews"
      ]
      ? data["404_social_analyse"][
          "percentage_of_employees_receiving_regular_performance_and_career_development_reviews"
        ]
      : []
    : [];

  return (
    <>
      <div id="section13_1_6" ref={section13_1_6Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {reportType=='GRI Report: In accordance With'?'13.1.6':'13.1.5'}  Performance and Career Development Reviews of Employees
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s process for performance review of
            employees
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
          Percentage of employees receiving regular performance and career
          development reviews 
        </p>
        <div className="shadow-md rounded-md mb-4">
          <TrainingTable data={Tabledata} />
        </div>
      </div>
    </>
  );
};

export default Section7;
