'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section27=({section13_6_10Ref})=>{
    const [content,setContent] = useState(
        `We ensure that all workers, including contractors and temporary workers, are covered by our OHS management system. `
    )

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
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

      
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