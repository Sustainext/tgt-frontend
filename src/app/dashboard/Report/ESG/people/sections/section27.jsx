'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setOHSManagementSystem} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice"

const Section27=({section13_6_10Ref,data})=>{
    
    const content = useSelector(state => state.screen13Slice.ohs_management_system);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setOHSManagementSystem(
       `We ensure that all workers, including contractors and temporary workers, are covered by our OHS management system.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setOHSManagementSystem(e.target.value))
    }

    const col1=[
        "Rate of fatalities as a result of work-related injury ",
        "Percentage of all Employees ",
        "Percentage of workers who are not employees but whose work and/or workplace is controlled by the organization ",
       
       
    ]

    const data1=[
        {
            "Rate of fatalities as a result of work-related injury ":"Covered by the system",
            "Percentage of all Employees ":"",
            "Percentage of workers who are not employees but whose work and/or workplace is controlled by the organization ":"",
        },
        {
            "Rate of fatalities as a result of work-related injury ":"Internally audited ",
            "Percentage of all Employees ":"",
            "Percentage of workers who are not employees but whose work and/or workplace is controlled by the organization ":"",
        },
        {
            "Rate of fatalities as a result of work-related injury ":"Audited or certified by an external party. ",
            "Percentage of all Employees ":"",
            "Percentage of workers who are not employees but whose work and/or workplace is controlled by the organization ":"",
        }
    ]
    
    return (
        <>
        <div id="section13_6_10" ref={section13_6_10Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.6.10 Workers Covered by OHS Management System
</h3>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s OHS management system</p>
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
Workers excluded & type of workers excluded
        </p>
        <p className="text-sm mb-2">
          {data["403-8b"]
            ? data["403-8b"].data
              ? data["403-8b"].data.length > 0
                ? data["403-8b"].data[0].Q1
                  ? data["403-8b"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["403-8b"]
            ? data["403-8b"].data
              ? data["403-8b"].data.length > 0
                ? data["403-8b"].data[0].Q2
                  ? data["403-8b"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403-8b"]
            ? data["403-8b"].data
              ? data["403-8b"].data.length > 0
                ? data["403-8b"].data[0].Q3
                  ? data["403-8b"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>



        <p className="text-[15px]  mb-2 font-semibold">
        Standards, methodologies, and assumptions used
        </p>
        <p className="text-sm mb-2">
          {data["403-8c"]
            ? data["403-8c"].data
              ? data["403-8c"].data.length > 0
                ? data["403-8c"].data[0].Q1
                  ? data["403-8c"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["403-8c"]
            ? data["403-8c"].data
              ? data["403-8c"].data.length > 0
                ? data["403-8c"].data[0].Q2
                  ? data["403-8c"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["403-8c"]
            ? data["403-8c"].data
              ? data["403-8c"].data.length > 0
                ? data["403-8c"].data[0].Q3
                  ? data["403-8c"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
      
            <p className="text-[15px]  mb-2 font-semibold">
            Percentage of emplyoees/workers who are not employees 
            </p>

            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col1} data={data1}/>
            </div>
            

</div>
        </>
    )
}

export default Section27