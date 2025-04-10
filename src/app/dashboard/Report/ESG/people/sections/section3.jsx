"use client";
import { useState, useRef, useEffect } from "react";
import EmployeeInfoTable from "../tables/employeeTable";
import EmployeeTable2 from "../tables/employeeTable2";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setWorkforceHireRetentionStatement } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section3 = ({ section13_1_2Ref, data }) => {
  const content = useSelector(
    (state) => state.screen13Slice.workforce_hire_retention_statement
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setWorkforceHireRetentionStatement(
        `We strive to maintain a dynamic and engaged workforce by attracting and retaining talented individuals. Our hiring practices emphasize diversity and equal opportunity, while our retention strategies focus on employee satisfaction and career development.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setWorkforceHireRetentionStatement(e.target.value));
  };

  const columns = [
    "Type of Employees",
    "Total no of employees",
    "Percentage of Male Employees",
    "Percentage of Female Employees",
    "Percentage of Non-Binary Employees",
    "Percentage of Employees < 30 years old",
    "Percentage of Employees 30-50 years old",
    "Percentage of Employees > 50 years old",
  ];

  const Tabledata = data["401_social_analyse"]
    ? data["401_social_analyse"]["data"]
      ? data["401_social_analyse"]["data"]["new_employee_hires"].length > 0
        ? data["401_social_analyse"]["data"]["new_employee_hires"].map(
            (val, index) => {
              return {
                "Type of Employees": val.type_of_employee,
                "Total no of employees": val.total,
                "Percentage of Male Employees": val.percentage_of_male_employee
                  ? val.percentage_of_male_employee + "%"
                  : "",
                "Percentage of Female Employees":
                  val.percentage_of_female_employee
                    ? val.percentage_of_female_employee + "%"
                    : "",
                "Percentage of Non-Binary Employees":
                  val.percentage_of_non_binary_employee
                    ? val.percentage_of_non_binary_employee + "%"
                    : "",
                "Percentage of Employees < 30 years old": val.yearsold30
                  ? val.yearsold30 + "%"
                  : "",
                "Percentage of Employees 30-50 years old": val.yearsold30to50
                  ? val.yearsold30to50 + "%"
                  : "",
                "Percentage of Employees > 50 years old": val.yearsold50
                  ? val.yearsold50 + "%"
                  : "",
              };
            }
          )
        : [
            {
              "Type of Employees": "No data available",
              "Total no of employees": "No data available",
              "Percentage of Male Employees": "No data available",
              "Percentage of Female Employees": "No data available",
              "Percentage of Non-Binary Employees": "No data available",
              "Percentage of Employees < 30 years old": "No data available",
              "Percentage of Employees 30-50 years old": "No data available",
              "Percentage of Employees > 50 years old": "No data available",
            },
          ]
      : [
          {
            "Type of Employees": "No data available",
            "Total no of employees": "No data available",
            "Percentage of Male Employees": "No data available",
            "Percentage of Female Employees": "No data available",
            "Percentage of Non-Binary Employees": "No data available",
            "Percentage of Employees < 30 years old": "No data available",
            "Percentage of Employees 30-50 years old": "No data available",
            "Percentage of Employees > 50 years old": "No data available",
          },
        ]
    : [
        {
          "Type of Employees": "No data available",
          "Total no of employees": "No data available",
          "Percentage of Male Employees": "No data available",
          "Percentage of Female Employees": "No data available",
          "Percentage of Non-Binary Employees": "No data available",
          "Percentage of Employees < 30 years old": "No data available",
          "Percentage of Employees 30-50 years old": "No data available",
          "Percentage of Employees > 50 years old": "No data available",
        },
      ];

  const Tabledata2 = data["401_social_analyse"]
    ? data["401_social_analyse"]["data"]
      ? data["401_social_analyse"]["data"]["employee_turnover"].length > 0
        ? data["401_social_analyse"]["data"]["employee_turnover"].map(
            (val, index) => {
              return {
                "Type of Employees": val.type_of_employee,
                "Total no of employees": val.total,
                "Percentage of Male Employees": val.percentage_of_male_employee
                  ? val.percentage_of_male_employee + "%"
                  : "",
                "Percentage of Female Employees":
                  val.percentage_of_female_employee
                    ? val.percentage_of_female_employee + "%"
                    : "",
                "Percentage of Non-Binary Employees":
                  val.percentage_of_non_binary_employee
                    ? val.percentage_of_non_binary_employee + "%"
                    : "",
                "Percentage of Employees < 30 years old": val.yearsold30
                  ? val.yearsold30 + "%"
                  : "",
                "Percentage of Employees 30-50 years old": val.yearsold30to50
                  ? val.yearsold30to50 + "%"
                  : "",
                "Percentage of Employees > 50 years old": val.yearsold50
                  ? val.yearsold50 + "%"
                  : "",
              };
            }
          )
        : [
            {
              "Type of Employees": "No data available",
              "Total no of employees": "No data available",
              "Percentage of Male Employees": "No data available",
              "Percentage of Female Employees": "No data available",
              "Percentage of Non-Binary Employees": "No data available",
              "Percentage of Employees < 30 years old": "No data available",
              "Percentage of Employees 30-50 years old": "No data available",
              "Percentage of Employees > 50 years old": "No data available",
            },
          ]
      : [
          {
            "Type of Employees": "No data available",
            "Total no of employees": "No data available",
            "Percentage of Male Employees": "No data available",
            "Percentage of Female Employees": "No data available",
            "Percentage of Non-Binary Employees": "No data available",
            "Percentage of Employees < 30 years old": "No data available",
            "Percentage of Employees 30-50 years old": "No data available",
            "Percentage of Employees > 50 years old": "No data available",
          },
        ]
    : [
        {
          "Type of Employees": "No data available",
          "Total no of employees": "No data available",
          "Percentage of Male Employees": "No data available",
          "Percentage of Female Employees": "No data available",
          "Percentage of Non-Binary Employees": "No data available",
          "Percentage of Employees < 30 years old": "No data available",
          "Percentage of Employees 30-50 years old": "No data available",
          "Percentage of Employees > 50 years old": "No data available",
        },
      ];

  const columns1 = [
    { header: "Type of Employees", rowspan: 2, border: "border-r" },
    { header: "Number of male employees", rowspan: 2 },
    { header: "Number of female employees", rowspan: 2 },
    {
      header: "Number of Non-Binary employees",
      rowspan: 2,
      border: "border-r",
    },
    {
      header: "Number of employees by age group",
      colSpan: 3,
      border: "border-r",
    },
    { header: "Total", rowspan: 2 },
  ];

  const TableData3 = data["2_7a_2_7b_analyse"]
    ? data["2_7a_2_7b_analyse"]["total_number_of_employees"]
      ? data["2_7a_2_7b_analyse"]["total_number_of_employees"].length > 0
        ? data["2_7a_2_7b_analyse"]["total_number_of_employees"].map((item) => {
            return {
              type: item.type_of_employee.replace("_", " "), // Formatting the type to be more readable
              male: item.male.total,
              female: item.female.total,
              nonBinary: item.others.total,
              ageBelow30:
                item.male.yearsold30 +
                item.female.yearsold30 +
                item.others.yearsold30,
              age30To50:
                item.male.yearsold30to50 +
                item.female.yearsold30to50 +
                item.others.yearsold30to50,
              ageAbove50:
                item.male.yearsold50 +
                item.female.yearsold50 +
                item.others.yearsold50,
              total: item.male.total + item.female.total + item.others.total,
            };
          })
        : []
      : []
    : [];
  return (
    <>
      <div id="section13_1_2" ref={section13_1_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          13.1.2 Employee Hire, Turnover
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s workforce hire and retention
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
          Methodologies and Assumptions used
        </p>
        <p className="text-sm mb-4">
          {data["2_7_c_methodologies"]
            ? data["2_7_c_methodologies"].length > 0
              ? data["2_7_c_methodologies"][0].Q1
                ? data["2_7_c_methodologies"][0].Q1
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Data Compilation Timeframe
        </p>
        <p className="text-sm mb-4">
          {data["2_7_c_data"]
            ? data["2_7_c_data"].length > 0
              ? data["2_7_c_data"][0].Q1
                ? data["2_7_c_data"][0].Q1
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Contextual information
        </p>
        <p className="text-sm mb-4">
          {data["2_7_d_contextual"]
            ? data["2_7_d_contextual"].length > 0
              ? data["2_7_d_contextual"][0].Q1
                ? data["2_7_d_contextual"][0].Q1
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Employee Fluctuations
        </p>
        <p className="text-sm mb-4">
          {data["2_7_e_fluctuations"]
            ? data["2_7_e_fluctuations"].length > 0
              ? data["2_7_e_fluctuations"][0].Q1
                ? data["2_7_e_fluctuations"][0].Q1
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Total number of employees
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EmployeeTable2 columns={columns1} data={TableData3} />
        </div>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          New Employee Hires
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EmployeeInfoTable columns={columns} data={Tabledata} />
        </div>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          New Employee Turnover
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EmployeeInfoTable columns={columns} data={Tabledata2} />
        </div>
      </div>
    </>
  );
};

export default Section3;
