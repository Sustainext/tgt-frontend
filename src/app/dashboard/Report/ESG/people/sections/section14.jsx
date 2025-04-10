"use client";
import { useState, useRef, useEffect } from "react";
import DiversityTable from "../tables/diversityTable";
import LeaveTable from "../tables/leaveTable";
import EmployeeCategoryTable from "../tables/employeeCategoryTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeDiversityPosition } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section14 = ({ section13_4_2Ref, data }) => {
  const content = useSelector(
    (state) => state.screen13Slice.employee_diversity_position
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setEmployeeDiversityPosition(
        `We believe in the power of diversity and strive to create an inclusive workplace. Our commitment to diversity is reflected in the composition of our governance bodies and workforce.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setEmployeeDiversityPosition(e.target.value));
  };

  const [Categorycolumns2] = useState([
    { header: "Gender", subHeaders: ["Male", "Female", "Non-Binary"] },
    {
      header: "Age Group",
      subHeaders: ["<30 years", "30-50 years", ">50 years"],
    },
    {
      header: "Diversity groups",
      subHeaders: ["Minority group", "Vulnerable Communities"],
    },
  ]);

  const Categorydata2 = data["405_1a_analyse"]
    ? data["405_1a_analyse"]["percentage_of_employees_within_government_bodies"]
        ?.length > 0
      ? data["405_1a_analyse"][
          "percentage_of_employees_within_government_bodies"
        ].map((val, index) => {
          return {
            Male: val.male,
            Female: val.female,
            "Non-Binary": val.nonBinary,
            "<30 years": val.lessThan30,
            "30-50 years": val.between30and50,
            ">50 years": val.moreThan50,
            "Minority group": val.minorityGroup,
            "Vulnerable Communities": val.vulnerableCommunities,
          };
        })
      : [
          {
            Male: "No data available",
            Female: "No data available",
            "Non-Binary": "No data available",
            "<30 years": "No data available",
            "30-50 years": "No data available",
            ">50 years": "No data available",
            "Minority group": "No data available",
            "Vulnerable Communities": "No data available",
          },
        ]
    : [
        {
          Male: "No data available",
          Female: "No data available",
          "Non-Binary": "No data available",
          "<30 years": "No data available",
          "30-50 years": "No data available",
          ">50 years": "No data available",
          "Minority group": "No data available",
          "Vulnerable Communities": "No data available",
        },
      ];

  const [Categorycolumns] = useState([
    { header: "Number of employees per employee category", subHeaders: [] }, // No sub-headers for this column
    { header: "Gender", subHeaders: ["Male", "Female", "Non-Binary"] },
    {
      header: "Age Group",
      subHeaders: ["<30 years", "30-50 years", ">50 years"],
    },
    {
      header: "Diversity groups",
      subHeaders: ["Minority group", "Vulnerable Communities"],
    },
  ]);

  const Categorydata = data["401_social_analyse"]
    ? data["401_social_analyse"]["data"]
      ? data["401_social_analyse"]["data"][
          "number_of_employee_per_employee_category"
        ]?.length > 0
        ? data["401_social_analyse"]["data"][
            "number_of_employee_per_employee_category"
          ].map((val, index) => {
            return {
              "Number of employees per employee category": val.Category,
              Male: val.percentage_of_male_with_org_governance,
              Female: val.percentage_of_female_with_org_governance,
              "Non-Binary": val.percentage_of_non_binary_with_org_governance,
              "<30 years": val.percentage_of_employees_within_30_age_group,
              "30-50 years":
                val.percentage_of_employees_within_30_to_50_age_group,
              ">50 years": val.percentage_of_employees_more_than_50_age_group,
              "Minority group": val.percentage_of_employees_in_minority_group,
              "Vulnerable Communities":
                val.percentage_of_employees_in_vulnerable_communities,
            };
          })
        : [
            {
              "Number of employees per employee category": "No data available",
              Male: "No data available",
              Female: "No data available",
              "Non-Binary": "No data available",
              "<30 years": "No data available",
              "30-50 years": "No data available",
              ">50 years": "No data available",
              "Minority group": "No data available",
              "Vulnerable Communities": "No data available",
            },
          ]
      : [
          {
            "Number of employees per employee category": "No data available",
            Male: "No data available",
            Female: "No data available",
            "Non-Binary": "No data available",
            "<30 years": "No data available",
            "30-50 years": "No data available",
            ">50 years": "No data available",
            "Minority group": "No data available",
            "Vulnerable Communities": "No data available",
          },
        ]
    : [
        {
          "Number of employees per employee category": "No data available",
          Male: "No data available",
          Female: "No data available",
          "Non-Binary": "No data available",
          "<30 years": "No data available",
          "30-50 years": "No data available",
          ">50 years": "No data available",
          "Minority group": "No data available",
          "Vulnerable Communities": "No data available",
        },
      ];

  return (
    <>
      <div id="section13_4_2" ref={section13_4_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          13.4.2 Diversity of Governance Bodies and Employees
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s position on diversity of employees
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

        <p className="text-[15px]  mb-2 font-semibold">Governance Bodies</p>
        <p className="text-[15px]  mb-2 font-semibold">
          Percentage of individuals within the organization’s governance bodies
          by diversity categories.
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EmployeeCategoryTable
            columns={Categorycolumns2}
            data={Categorydata2}
          />
        </div>
        <p className="text-[15px]  mb-2 font-semibold">
          Percentage of Employees per employee category 
        </p>

        <div className="shadow-md rounded-md mb-4">
          <EmployeeCategoryTable
            columns={Categorycolumns}
            data={Categorydata}
          />
        </div>
      </div>
    </>
  );
};

export default Section14;
