'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

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
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s safety training</p>
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