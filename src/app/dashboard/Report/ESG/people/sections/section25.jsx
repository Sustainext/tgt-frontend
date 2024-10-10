'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

const Section25=({section13_6_8Ref})=>{
    const [content,setContent] = useState(
        `We track and report work-related ill-health and injuries, using this data to improve our OHS practices continuously. `
    )
    const col1=[
        "Rate of fatalities as a result of work-related injury ",
        "Rate of high-consequence work-related injuries (excluding fatalities)",
        "Rate of recordable work-related injuries ",
       
    ]

    const data1=[
        {
            "Rate of fatalities as a result of work-related injury ":"Committee 1",
            "Rate of high-consequence work-related injuries (excluding fatalities)":"",
            "Rate of recordable work-related injuries ":"Data",
        }
    ]

    const col3=[
        "Employee Category ",
       "Number of fatalities as a result of work-related ill health ",
        "Number of cases of recordable work-related ill health",
        "Main types of work-related ill health"
       
    ]

    const data3=[
        {
            "Employee Category ":"A",
            "Number of fatalities as a result of work-related ill health":"",
            "Number of cases of recordable work-related ill health":"",
            "Main types of work-related ill health":""
        },
        {
            "Employee Category ":"B",
            "Number of fatalities as a result of work-related ill health":"",
            "Number of cases of recordable work-related ill health":"",
            "Main types of work-related ill health":""
        }
    ]

    const col4=[
        "Workers who are not employees but whose work and/or workplace is controlled  by the organization ",
        "Number of fatalities as a result of work-related ill health ",
        "Number of cases of recordable work-related ill health",
        "Main types of work-related ill health "
       
    ]

    const data4=[
        {
            "Workers who are not employees but whose work and/or workplace is controlled  by the organization ":"A",
           "Number of fatalities as a result of work-related ill health":"",
            "Number of cases of recordable work-related ill health":"",
            "Main types of work-related ill health": "",
        },
        {
            "Workers who are not employees but whose work and/or workplace is controlled  by the organization ":"B",
            "Number of fatalities as a result of work-related ill health":"",
            "Number of cases of recordable work-related ill health":"",
            "Main types of work-related ill health":""
        }
    ]
    
    return (
        <>
        <div id="section13_6_8" ref={section13_6_8Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.6.8 Work-Related Ill-Health & Injuries
</h3>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about work related ill health and injuries in company</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            // onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
      
            <p className="text-[15px]  mb-2 font-semibold">
            Rate of injuries: For all employees  
            </p>
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col1} data={data1}/>
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            For all workers who are not employees but whose work and/or workplace is controlled by the organization 
            </p>
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col1} data={data1}/>
            </div>

            <p className="text-[15px]  mb-2 font-semibold">
            Health for all employees
            </p>
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col3} data={data3}/>
            </div>

            <p className="text-[15px]  mb-2 font-semibold">
            Health for workers who are not employees but whose work and workplace is controlled by the organization 
            </p>
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col4} data={data4}/>
            </div>

</div>
        </>
    )
}

export default Section25