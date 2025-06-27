"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import LeaveTable from "../tables/leaveTable";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeSkillUpgradePrograms } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section17 = ({ section13_5_2Ref, data, reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.5.2':'13.5.1',
  sectionTitle = "Programs for Upgrading Employee Skills and Transition", 
  sectionOrder = 13
 }) => {
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

  const col = [
    "Categories",
    "Average training hours per employee category",
    "Average training hours of male employee in category",
    "Average training hours of female employee in category",
    "Average training hours of non-binary employee in category",
  ];

  const Tabledata = data["404_social_analyse"]
    ? data["404_social_analyse"][
        "average_hours_of_training_provided_to_employees_per_category"
      ].length > 0
      ? data["404_social_analyse"][
          "average_hours_of_training_provided_to_employees_per_category"
        ].map((val, index) => {
          return {
            Categories: val.category,
            "Average training hours per employee category":
              val.avg_training_hrs_per_employee,
            "Average training hours of male employee in category":
              val.avg_training_hrs_male_employee,
            "Average training hours of female employee in category":
              val.avg_training_hrs_female_employee,
            "Average training hours of non-binary employee in category":
              val.avg_training_hrs_other_employee,
          };
        })
      : [
          {
            Categories: "No data available",
            "Average training hours per employee category": "No data available",
            "Average training hours of male employee in category":
              "No data available",
            "Average training hours of female employee in category":
              "No data available",
            "Average training hours of non-binary employee in category":
              "No data available",
          },
        ]
    : [
        {
          Categories: "No data available",
          "Average training hours per employee category": "No data available",
          "Average training hours of male employee in category":
            "No data available",
          "Average training hours of female employee in category":
            "No data available",
          "Average training hours of non-binary employee in category":
            "No data available",
        },
      ];

  const col2 = [
    "Security Personnel (in organisation)",
    "Security Personnel (from third-party organisation)",
  ];

  const Tabledata2 = data["analysis_security_personnel"]
    ? data["analysis_security_personnel"]["security_personnel"]
      ? data["analysis_security_personnel"]["security_personnel"].length > 0
        ? data["analysis_security_personnel"]["security_personnel"]?.map(
            (val, index) => {
              return {
                "Security Personnel (in organisation)": val.sp_in_org + "%",
                "Security Personnel (from third-party organisation)":
                  val.sp_3rd_org + "%",
              };
            }
          )
        : [
            {
              "Security Personnel (in organisation)": "No data available",
              "Security Personnel (from third-party organisation)":
                "No data available",
            },
          ]
      : [
          {
            "Security Personnel (in organisation)": "No data available",
            "Security Personnel (from third-party organisation)":
              "No data available",
          },
        ]
    : [
        {
          "Security Personnel (in organisation)": "No data available",
          "Security Personnel (from third-party organisation)":
            "No data available",
        },
      ];

  return (
    <>
      <div id="section13_5_2" ref={section13_5_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
       {sectionNumber} {sectionTitle}
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
                  {/* <p className="text-[15px]  mb-2 font-semibold">
                    Type of program and its scope
                  </p> */}
                  <p className="text-sm mb-4">
                    {data["404_2a_2b_collect"][0].Q2
                      ? data["404_2a_2b_collect"][0].Q2
                      : "No data available"}
                  </p>
                  {/* <p className="text-[15px]  mb-2 font-semibold">
                    Describe the programs provided to facilitate continued
                    employability
                  </p> */}
                  <p className="text-sm mb-4">
                    {data["404_2a_2b_collect"][0].Q3
                      ? data["404_2a_2b_collect"][0].Q3
                      : "No data available"}
                  </p>

                  {/* <p className="text-[15px]  mb-2 font-semibold">
                    Describe assistance programs to manage career endings
                    resulting from retirement or termination
                  </p> */}
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


{/* <p className="text-[15px]  mb-2 font-semibold">
          Training requirements apply to third party organisations
        </p>
        <p className="text-sm mb-4">
          {data["410-1b-training_requirements"]
            ? data["410-1b-training_requirements"].data
              ? data["410-1b-training_requirements"].data.length > 0
                ? data["410-1b-training_requirements"].data[0].Q1
                  ? data["410-1b-training_requirements"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p> */}
        <p className="text-[15px]  mb-2 font-semibold">
          Average training hours per employee:
        </p>
        <p className="text-sm mb-4">
          {data["404_social_analyse"]
            ? data["404_social_analyse"][
                "average_hours_of_training_provided_to_employees"
              ]
              ? data["404_social_analyse"][
                  "average_hours_of_training_provided_to_employees"
                ].length > 0
                ? data["404_social_analyse"][
                    "average_hours_of_training_provided_to_employees"
                  ].map((val) => val.average_training_hours_per_employee)
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
          Average training hours per female employee:
        </p>
        <p className="text-sm mb-4">
          {data["404_social_analyse"]
            ? data["404_social_analyse"][
                "average_hours_of_training_provided_to_employees"
              ]
              ? data["404_social_analyse"][
                  "average_hours_of_training_provided_to_employees"
                ].length > 0
                ? data["404_social_analyse"][
                    "average_hours_of_training_provided_to_employees"
                  ].map((val) => val.average_training_hours_per_female_employee)
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
          Average training hours per male employee:
        </p>
        <p className="text-sm mb-4">
          {data["404_social_analyse"]
            ? data["404_social_analyse"][
                "average_hours_of_training_provided_to_employees"
              ]
              ? data["404_social_analyse"][
                  "average_hours_of_training_provided_to_employees"
                ].length > 0
                ? data["404_social_analyse"][
                    "average_hours_of_training_provided_to_employees"
                  ].map((val) => val.average_training_hours_per_male_employee)
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Average hours of training provided to employees by category
        </p>
        <div className="shadow-md mb-4 rounded-md">
          <LeaveTable columns={col} data={Tabledata} />
        </div>

        <p className="text-[15px]  mb-1 font-semibold">
          Security personnel trained in human rights policies or procedures
        </p>
        <p className="text-[14px]  mb-2">
          Percentage of security personnel who have received formal training
        </p>
        <div className="shadow-md mb-4 rounded-md">
          <LeaveTable columns={col2} data={Tabledata2} />
        </div>
      </div>
    </>
  );
};

export default Section17;
