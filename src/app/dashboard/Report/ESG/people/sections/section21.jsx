'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from '../tables/leaveTable'

const Section21=({section13_6_4Ref})=>{
    const [content,setContent] = useState(
        `We engage our workers in OHS through participation, consultation, and communication. This ensures that their insights and concerns are considered in our safety practices. `
    )
   
    const col=[
        "Formal joint management-worker health and safety committees",
        "Responsibilities",
        "Meeting Frequency",
        "Decision-making authority",
        "Exclusions (if any) & Reason for Exclusions"
    ]

    const data=[
        {
            "Formal joint management-worker health and safety committees":"Committee 1",
            "Responsibilities":"",
            "Meeting Frequency":"Data",
            "Decision-making authority":"Data",
            "Exclusions (if any) & Reason for Exclusions":"Data"
        }
    ]
    
    return (
        <>
        <div id="section13_6_4" ref={section13_6_4Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.6.4 Worker Participation, Consultation, and Communication on OHS
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
        Formal joint management-worker health and safety committees   
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={col} data={data} />
            </div>
           
            

</div>
        </>
    )
}

export default Section21