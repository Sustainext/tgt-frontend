'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";

const Section12=({section12_2_2Ref})=>{
    const [content,setContent] = useState(
        `We prioritize the use of recycled materials in our products and processes. This not only reduces the demand for virgin materials but also helps to close the loop in our production cycle.`
    )

    const col=[
        "Types of recycled material used",
        "Percentage of recycled input materials used",
    ]
    const data=[
        {
            "Types of recycled material used":"data",
            "Percentage of recycled input materials used":"data",
        }
    ]
    
    return (
        <>
       
        <div id="section12_2_2" ref={section12_2_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.2.2 Recycled Input Materials Used
</h3>

<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        
<p className="text-[15px]  mb-2 font-semibold">
            Non-Renewable materials used
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col} data={data}/>
</div>
</div>
        </>
    )
}

export default Section12