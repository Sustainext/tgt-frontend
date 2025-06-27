"use client";
import { useState, useRef, useEffect } from "react";
import EmployeeCategoryTable from "../tables/employeeCategoryTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setRemunerationPractices } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section15 = ({ section13_4_3Ref, data, reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.4.3':'13.4.2',
  sectionTitle = "Remuneration", 
  sectionOrder = 13
 }) => {
  const content = useSelector(
    (state) => state.screen13Slice.remuneration_practices
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setRemunerationPractices(
        `We ensure equitable remuneration practices across our organization. Our compensation policies are designed to eliminate pay disparities and promote fairness.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setRemunerationPractices(e.target.value));
  };
  const columns = [
    { header: "Basic Salary per Employee Category", subHeaders: [] }, // No sub-headers for this column
    { header: "Significant Location of Operations", subHeaders: [] },
    {
      header: "Ratio of basic salary by Gender ",
      subHeaders: ["Women to men", "Non-Binary to Women", "Non-binary to Men"],
    },
    // No sub-headers
  ];
  const columns2 = [
    { header: "Remuneration per Employee Category", subHeaders: [] }, // No sub-headers for this column
    { header: "Significant Location of Operations", subHeaders: [] },
    {
      header: "Ratio of remuneration by Gender ",
      subHeaders: ["Women to men", "Non-binary to Women", "Non-binary to Men"],
    },
    // No sub-headers
  ];

  const basicSalaryData = data["405-2a_analyse"]
    ? data["405-2a_analyse"]["ratio_of_basic_salary_of_women_to_men"] &&
      data["405-2a_analyse"]["ratio_of_basic_salary_of_women_to_men"].length > 0
      ? data["405-2a_analyse"]["ratio_of_basic_salary_of_women_to_men"].flatMap(
          (entry) => {
            return entry["Q2"].map((val) => {
              return {
                "Basic Salary per Employee Category": val.category,
                "Women to men": val.women_to_men,
                "Non-Binary to Women": val.non_binary_to_women,
                "Non-binary to Men": val.non_binary_to_men,
                "Significant Location of Operations": Array.isArray(
                  val.locationandoperation
                )
                  ? val.locationandoperation.join(", ")
                  : val.locationandoperation,
                Currency: entry["Q1"], // This will use the associated currency for each Q2 entry
              };
            });
          }
        )
      : [
          {
            "Basic Salary per Employee Category": "No data available",
            "Women to men": "No data available",
            "Non-Binary to Women": "No data available",
            "Non-binary to Men": "No data available",
            "Significant Location of Operations": "No data available",
            Currency: "No data available",
          },
        ]
    : [
        {
          "Basic Salary per Employee Category": "No data available",
          "Women to men": "No data available",
          "Non-Binary to Women": "No data available",
          "Non-binary to Men": "No data available",
          "Significant Location of Operations": "No data available",
          Currency: "No data available",
        },
      ];

  const remunerationData = data["405-2a_analyse"]
    ? data["405-2a_analyse"]["ratio_of_remuneration_of_women_to_men"] &&
      data["405-2a_analyse"]["ratio_of_remuneration_of_women_to_men"].length > 0
      ? data["405-2a_analyse"]["ratio_of_remuneration_of_women_to_men"].flatMap(
          (entry) => {
            return entry["Q2"].map((val) => {
              return {
                "Remuneration per Employee Category": val.category,
                "Women to men": val.women_to_men,
                "Non-binary to Women": val.non_binary_to_women,
                "Non-binary to Men": val.non_binary_to_men,
                "Significant Location of Operations": Array.isArray(
                  val.locationandoperation
                )
                  ? val.locationandoperation.join(", ")
                  : val.locationandoperation,
                Currency: entry["Q1"], // This will use the associated currency for each Q2 entry
              };
            });
          }
        )
      : [
          {
            "Remuneration per Employee Category": "No data available",
            "Women to men": "No data available",
            "Non-Binary to Women": "No data available",
            "Non-binary to Men": "No data available",
            "Significant Location of Operations": "No data available",
            Currency: "No data available",
          },
        ]
    : [
        {
          "Remuneration per Employee Category": "No data available",
          "Women to men": "No data available",
          "Non-Binary to Women": "No data available",
          "Non-binary to Men": "No data available",
          "Significant Location of Operations": "No data available",
          Currency: "No data available",
        },
      ];

  return (
    <>
      <div id="section13_4_3" ref={section13_4_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
       {sectionNumber} {sectionTitle} 
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s remuneration practices & policies.
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
          Ratio of basic salary by Gender
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EmployeeCategoryTable columns={columns} data={basicSalaryData} />
        </div>
        <p className="text-[15px]  mb-2 font-semibold">
          Ratio of remuneration by Gender
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EmployeeCategoryTable columns={columns2} data={remunerationData} />
        </div>
      </div>
    </>
  );
};

export default Section15;
