"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setParentalLeaves } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section5 = ({ section13_1_4Ref, data }) => {
  const content = useSelector((state) => state.screen13Slice.parental_leaves);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setParentalLeaves(
        `We provide parental leave policies that support our employees in balancing their professional and personal lives. This includes paid leave for new parents and flexible return-to-work options`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setParentalLeaves(e.target.value));
  };
  const columns1 = ["Employee category", "Male", "Female", "Total"];
  const data1 = [
    {
      "Employee category": "Parental Leave Entitlement",
      Male: "data",
      Female: "data",
      Total: "data",
    },
    {
      "Employee category": "Taking Parental Leave",
      Male: "data",
      Female: "data",
      Total: "data",
    },
    {
      "Employee category": "Returning to Work Post-Leave",
      Male: "data",
      Female: "data",
      Total: "data",
    },
    {
      "Employee category": "Retained 12 Months After Leave",
      Male: "data",
      Female: "data",
      Total: "data",
    },
  ];

  const Tabledata = data["401_social_analyse"]
    ? data["401_social_analyse"]["data"]
      ? data["401_social_analyse"]["data"]["parental_leave"].length > 0
        ? data["401_social_analyse"]["data"]["parental_leave"].map(
            (val, index) => {
              return {
                "Employee category": val.employee_category,
                Male: val.male,
                Female: val.female,
                Total: val.total,
              };
            }
          )
        : [
            {
              "Employee category": "No data available",
              Male: "No data available",
              Female: "No data available",
              Total: "No data available",
            },
          ]
      : [
          {
            "Employee category": "No data available",
            Male: "No data available",
            Female: "No data available",
            Total: "No data available",
          },
        ]
    : [
        {
          "Employee category": "No data available",
          Male: "No data available",
          Female: "No data available",
          Total: "No data available",
        },
      ];

  const columns2 = ["Employee category", "Male", "Female"];
  const data2 = [
    {
      "Employee category": "Return to work rate",
      Male: "data",
      Female: "data",
    },
    {
      "Employee category": "Retention rate",
      Male: "data",
      Female: "data",
    },
  ];

  const Tabledata2 = data["401_social_analyse"]
    ? data["401_social_analyse"]["data"]
      ? data["401_social_analyse"]["data"][
          "return_to_work_rate_and_retention_rate_of_employee"
        ].length > 0
        ? data["401_social_analyse"]["data"][
            "return_to_work_rate_and_retention_rate_of_employee"
          ].map((val, index) => {
            return {
              "Employee category": val.employee_category,
              Male: val.male,
              Female: val.female,
            };
          })
        : [
            {
              "Employee category": "No data available",
              Male: "No data available",
              Female: "No data available",
            },
          ]
      : [
          {
            "Employee category": "No data available",
            Male: "No data available",
            Female: "No data available",
          },
        ]
    : [
        {
          "Employee category": "No data available",
          Male: "No data available",
          Female: "No data available",
        },
      ];

  return (
    <>
      <div id="section13_1_4" ref={section13_1_4Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          13.1.4 Parental Leaves
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s policy on parental leave
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
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={columns1} data={Tabledata} />
        </div>
        <p className="text-[15px]  mb-2 font-semibold">
          Return to work & retention rate of employees. 
        </p>
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={columns2} data={Tabledata2} />
        </div>
      </div>
    </>
  );
};

export default Section5;
