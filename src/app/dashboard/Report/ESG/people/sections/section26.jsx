'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section26=({section13_6_9Ref})=>{
    const [content,setContent] = useState(
        `Safety training is a cornerstone of our OHS program. We provide regular training sessions to ensure that all employees are aware of safety protocols and procedures.`
    )
    const col1=[
        "Occupational health and safety training provided to workers",
        "Generic Training",
        "Specific work-related hazards",
        "Hazardous Activities",
        "Hazardous Situations"
       
    ]

    const data1=[
        {
            "Occupational health and safety training provided to workers":"Training 1",
            "Generic Training":"",
            "Specific work-related hazards":"Data",
            "Hazardous Activities":"Data",
            "Hazardous Situations":"Data"
        }
    ]

    
    return (
        <>
        <div id="section13_6_9" ref={section13_6_9Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.6.9 Safety Training
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
            Occupational health and safety training
            </p>
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col1} data={data1}/>
            </div>

            

</div>
        </>
    )
}

export default Section26