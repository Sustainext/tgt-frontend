"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setWorkRelatedHealthInjuries } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section25 = ({ section13_6_8Ref, data, reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.6.8':'13.6.7',
  sectionTitle = "Work-Related Ill-Health & Injuries", 
  sectionOrder = 13
 }) => {
  const content = useSelector(
    (state) => state.screen13Slice.work_related_health_injuries
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setWorkRelatedHealthInjuries(
        `We track and report work-related ill-health and injuries, using this data to improve our OHS practices continuously.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setWorkRelatedHealthInjuries(e.target.value));
  };
  const col1 = [
    "Rate of fatalities as a result of work-related injury ",
    "Rate of high-consequence work-related injuries (excluding fatalities)",
    "Rate of recordable work-related injuries ",
  ];

  const Tabledata1 = data["illness_analysis"]
    ? data["illness_analysis"]['data']?data["illness_analysis"]['data'][
        "rate_of_injuries_for_all_employees_100_injury_rate"
      ]?.length > 0
      ? data["illness_analysis"]['data'][
          "rate_of_injuries_for_all_employees_100_injury_rate"
        ].map((val, index) => {
          return {
            "Rate of fatalities as a result of work-related injury ":
              val.rate_of_fatalities_as_a_result_of_work_related_injury,
            "Rate of high-consequence work-related injuries (excluding fatalities)":
              val.rate_of_high_consequence_work_related_injuries_excluding_fatalities,
            "Rate of recordable work-related injuries ":
              val.rate_of_recordable_work_related_injuries,
          };
        })
      : [
          {
            "Rate of fatalities as a result of work-related injury ":
              "No data available",
            "Rate of high-consequence work-related injuries (excluding fatalities)":
              "No data available",
            "Rate of recordable work-related injuries ": "No data available",
          },
        ]
    : [
        {
          "Rate of fatalities as a result of work-related injury ":
            "No data available",
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            "No data available",
          "Rate of recordable work-related injuries ": "No data available",
        },
      ]:[
        {
          "Rate of fatalities as a result of work-related injury ":
            "No data available",
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            "No data available",
          "Rate of recordable work-related injuries ": "No data available",
        },
      ];

  const Tabledata2 = data["illness_analysis"]
    ? data["illness_analysis"]['data']?data["illness_analysis"]['data'][
        "rate_of_injuries_for_not_included_in_company_employees_100_injury_rate"
      ]?.length > 0
      ? data["illness_analysis"]['data'][
          "rate_of_injuries_for_not_included_in_company_employees_100_injury_rate"
        ].map((val, index) => {
          return {
            "Rate of fatalities as a result of work-related injury ":
              val.rate_of_fatalities_as_a_result_of_work_related_injury,
            "Rate of high-consequence work-related injuries (excluding fatalities)":
              val.rate_of_high_consequence_work_related_injuries_excluding_fatalities,
            "Rate of recordable work-related injuries ":
              val.rate_of_recordable_work_related_injuries,
          };
        })
      : [
          {
            "Rate of fatalities as a result of work-related injury ":
              "No data available",
            "Rate of high-consequence work-related injuries (excluding fatalities)":
              "No data available",
            "Rate of recordable work-related injuries ": "No data available",
          },
        ]
    : [
        {
          "Rate of fatalities as a result of work-related injury ":
            "No data available",
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            "No data available",
          "Rate of recordable work-related injuries ": "No data available",
        },
      ]: [
        {
          "Rate of fatalities as a result of work-related injury ":
            "No data available",
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            "No data available",
          "Rate of recordable work-related injuries ": "No data available",
        },
      ];

  const Tabledata5 = data["illness_analysis"]
    ? data["illness_analysis"]['data']?data["illness_analysis"]['data'][
        "rate_of_injuries_for_all_employees_500_injury_rate"
      ]?.length > 0
      ? data["illness_analysis"]['data'][
          "rate_of_injuries_for_all_employees_500_injury_rate"
        ].map((val, index) => {
          return {
            "Rate of fatalities as a result of work-related injury ":
              val.rate_of_fatalities_as_a_result_of_work_related_injury,
            "Rate of high-consequence work-related injuries (excluding fatalities)":
              val.rate_of_high_consequence_work_related_injuries_excluding_fatalities,
            "Rate of recordable work-related injuries ":
              val.rate_of_recordable_work_related_injuries,
          };
        })
      : [
          {
            "Rate of fatalities as a result of work-related injury ":
              "No data available",
            "Rate of high-consequence work-related injuries (excluding fatalities)":
              "No data available",
            "Rate of recordable work-related injuries ": "No data available",
          },
        ]
    : [
        {
          "Rate of fatalities as a result of work-related injury ":
            "No data available",
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            "No data available",
          "Rate of recordable work-related injuries ": "No data available",
        },
      ]:[
        {
          "Rate of fatalities as a result of work-related injury ":
            "No data available",
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            "No data available",
          "Rate of recordable work-related injuries ": "No data available",
        },
      ];

  const Tabledata6 = data["illness_analysis"]
    ? data["illness_analysis"]['data']?data["illness_analysis"]['data'][
        "rate_of_injuries_for_not_included_in_company_employees_500_injury_rate"
      ]?.length > 0
      ? data["illness_analysis"]['data'][
          "rate_of_injuries_for_not_included_in_company_employees_500_injury_rate"
        ].map((val, index) => {
          return {
            "Rate of fatalities as a result of work-related injury ":
              val.rate_of_fatalities_as_a_result_of_work_related_injury,
            "Rate of high-consequence work-related injuries (excluding fatalities)":
              val.rate_of_high_consequence_work_related_injuries_excluding_fatalities,
            "Rate of recordable work-related injuries ":
              val.rate_of_recordable_work_related_injuries,
          };
        })
      : [
          {
            "Rate of fatalities as a result of work-related injury ":
              "No data available",
            "Rate of high-consequence work-related injuries (excluding fatalities)":
              "No data available",
            "Rate of recordable work-related injuries ": "No data available",
          },
        ]
    : [
        {
          "Rate of fatalities as a result of work-related injury ":
            "No data available",
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            "No data available",
          "Rate of recordable work-related injuries ": "No data available",
        },
      ]:[
        {
          "Rate of fatalities as a result of work-related injury ":
            "No data available",
          "Rate of high-consequence work-related injuries (excluding fatalities)":
            "No data available",
          "Rate of recordable work-related injuries ": "No data available",
        },
      ];

  const col3 = [
    "Employee Category ",
    "Number of fatalities as a result of work-related ill health",
    "Number of cases of recordable work-related ill health",
    "Main types of work-related ill health",
  ];

  const Tabledata3 = data["get_403_analyse"]
    ? data["get_403_analyse"]["ill_health_for_all_employees_analysis"]?.length >
      0
      ? data["get_403_analyse"]["ill_health_for_all_employees_analysis"].map(
          (val, index) => {
            return {
              "Employee Category ": val.employeeCategory,
              "Number of fatalities as a result of work-related ill health":
                val.fatalities,
              "Number of cases of recordable work-related ill health":
                val.recordable,
              "Main types of work-related ill health": val.highconsequence,
            };
          }
        )
      : [
          {
            "Employee Category ": "No data available",
            "Number of fatalities as a result of work-related ill health":
              "No data available",
            "Number of cases of recordable work-related ill health":
              "No data available",
            "Main types of work-related ill health": "No data available",
          },
        ]
    : [
        {
          "Employee Category ": "No data available",
          "Number of fatalities as a result of work-related ill health":
            "No data available",
          "Number of cases of recordable work-related ill health":
            "No data available",
          "Main types of work-related ill health": "No data available",
        },
      ];

  const col4 = [
    "Workers who are not employees but whose work and/or workplace is controlled  by the organization ",
    "Number of fatalities as a result of work-related ill health",
    "Number of cases of recordable work-related ill health",
    "Main types of work-related ill health",
  ];

  const Tabledata4 = data["get_403_analyse"]
    ? data["get_403_analyse"][
        "ill_health_for_all_workers_who_are_not_employees_analysis"
      ]?.length > 0
      ? data["get_403_analyse"][
          "ill_health_for_all_workers_who_are_not_employees_analysis"
        ].map((val, index) => {
          return {
            "Workers who are not employees but whose work and/or workplace is controlled  by the organization ":
              val.employeeCategory,
            "Number of fatalities as a result of work-related ill health":
              val.fatalities,
            "Number of cases of recordable work-related ill health":
              val.recordable,
            "Main types of work-related ill health": val.highconsequence,
          };
        })
      : [
          {
            "Workers who are not employees but whose work and/or workplace is controlled  by the organization ":
              "No data available",
            "Number of fatalities as a result of work-related ill health":
              "No data available",
            "Number of cases of recordable work-related ill health":
              "No data available",
            "Main types of work-related ill health": "No data available",
          },
        ]
    : [
        {
          "Workers who are not employees but whose work and/or workplace is controlled  by the organization ":
            "No data available",
          "Number of fatalities as a result of work-related ill health":
            "No data available",
          "Number of cases of recordable work-related ill health":
            "No data available",
          "Main types of work-related ill health": "No data available",
        },
      ];

  return (
    <>
      <div id="section13_6_8" ref={section13_6_8Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
       {sectionNumber} {sectionTitle}
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about work related ill health and injuries in company
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
          Work-related hazards that pose a risk of high-consequence injury
        </p>
        <p className="text-sm mb-2">
          {data["403_9c_9d"]
            ? data["403_9c_9d"].data
              ? data["403_9c_9d"].data.length > 0
                ? data["403_9c_9d"].data[0].Q1
                  ? data["403_9c_9d"].data[0].Q1 == "No"
                    ? data["403_9c_9d"].data[0].Q1
                    : ""
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["403_9c_9d"]
            ? data["403_9c_9d"].data
              ? data["403_9c_9d"].data.length > 0
                ? data["403_9c_9d"].data[0].Q2
                  ? data["403_9c_9d"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403_9c_9d"]
            ? data["403_9c_9d"].data
              ? data["403_9c_9d"].data.length > 0
                ? data["403_9c_9d"].data[0].Q3
                  ? data["403_9c_9d"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Number of Hours Worked
        </p>
        <p className="text-sm mb-4">
          {data["403_9e"]
            ? data["403_9e"].data
              ? data["403_9e"].data.length > 0
                ? data["403_9e"].data[0].Q1
                  ? data["403_9e"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
          Workers excluded from the ‘Work-related injuries’ disclosure
        </p>
        <p className="text-sm mb-2">
          {data["403_9f"]
            ? data["403_9f"].data
              ? data["403_9f"].data.length > 0
                ? data["403_9f"].data[0].Q1
                  ? data["403_9f"].data[0].Q1 == "No"
                    ? data["403_9f"].data[0].Q1
                    : ""
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["403_9f"]
            ? data["403_9f"].data
              ? data["403_9f"].data.length > 0
                ? data["403_9f"].data[0].Q2
                  ? data["403_9f"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403_9f"]
            ? data["403_9f"].data
              ? data["403_9f"].data.length > 0
                ? data["403_9f"].data[0].Q3
                  ? data["403_9f"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Standards, methodologies, and assumptions used to compile data for
          work-related injuries
        </p>
        <p className="text-sm mb-2">
          {data["403_9g"]
            ? data["403_9g"].data
              ? data["403_9g"].data.length > 0
                ? data["403_9g"].data[0].Q1
                  ? data["403_9g"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["403_9g"]
            ? data["403_9g"].data
              ? data["403_9g"].data.length > 0
                ? data["403_9g"].data[0].Q2
                  ? data["403_9g"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403_9g"]
            ? data["403_9g"].data
              ? data["403_9g"].data.length > 0
                ? data["403_9g"].data[0].Q3
                  ? data["403_9g"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

       

        <p className="text-[15px]  mb-2 font-semibold">
          Rate of injuries: Per 100 employees
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col1} data={Tabledata1} />
        </div>
        <p className="text-[15px]  mb-2 font-semibold">
          Rate of injuries: Per 100 workers 
        </p>
        <p className="text-[15px]  mb-2">
          For all workers who are not employees but whose work and/or workplace
          is controlled by the organization
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col1} data={Tabledata2} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Rate of injuries: Per 500 employees
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col1} data={Tabledata5} />
        </div>
        <p className="text-[15px]  mb-2 font-semibold">
          Rate of injuries: Per 500 workers
        </p>
        <p className="text-[15px]  mb-2">
          For all workers who are not employees but whose work and/or workplace
          is controlled by the organization
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col1} data={Tabledata6} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Health for all employees
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col3} data={Tabledata3} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Health for workers who are not employees but whose work and workplace
          is controlled by the organization 
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col4} data={Tabledata4} />
        </div>
        <p className="text-[15px]  mb-2 font-semibold">
          Ill Health
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
          Work-related hazards that pose a risk of ill health
        </p>
        <p className="text-sm mb-2">
          {data["403-10c"]
            ? data["403-10c"].data
              ? data["403-10c"].data.length > 0
                ? data["403-10c"].data[0].Q1
                  ? data["403-10c"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["403-10c"]
            ? data["403-10c"].data
              ? data["403-10c"].data.length > 0
                ? data["403-10c"].data[0].Q2
                  ? data["403-10c"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403-10c"]
            ? data["403-10c"].data
              ? data["403-10c"].data.length > 0
                ? data["403-10c"].data[0].Q3
                  ? data["403-10c"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Workers excluded from the ‘Work-related ill-health’ disclosure
        </p>
        <p className="text-sm mb-2">
          {data["403-10d"]
            ? data["403-10d"].data
              ? data["403-10d"].data.length > 0
                ? data["403-10d"].data[0].Q1
                  ? data["403-10d"].data[0].Q1 == "No"
                    ? data["403-10d"].data[0].Q1
                    : ""
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["403-10d"]
            ? data["403-10d"].data
              ? data["403-10d"].data.length > 0
                ? data["403-10d"].data[0].Q2
                  ? data["403-10d"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403-10d"]
            ? data["403-10d"].data
              ? data["403-10d"].data.length > 0
                ? data["403-10d"].data[0].Q3
                  ? data["403-10d"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Standards, methodologies, and assumptions used to compile data for
          work-related ill-health
        </p>
        <p className="text-sm mb-2">
          {data["403-10e"]
            ? data["403-10e"].data
              ? data["403-10e"].data.length > 0
                ? data["403-10e"].data[0].Q1
                  ? data["403-10e"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["403-10e"]
            ? data["403-10e"].data
              ? data["403-10e"].data.length > 0
                ? data["403-10e"].data[0].Q2
                  ? data["403-10e"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403-10e"]
            ? data["403-10e"].data
              ? data["403-10e"].data.length > 0
                ? data["403-10e"].data[0].Q3
                  ? data["403-10e"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
      </div>
    </>
  );
};

export default Section25;
