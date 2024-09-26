'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";

const Section7=({section12_1_5Ref})=>{
    const [content,setContent] = useState(
        `We track GHG emission intensity to understand our emissions in relation to our business growth and efficiency improvements`
    )

    const col1=[
        "Organization Metric",
       "Quantity",
        "Unit",
        "Type of GHGs",
        "Unit"
    ]
    const data1=[
        {
            "Organization Metric":"data",
        "Quantity":"data",
        "Unit":"data",
        "Type of GHGs":"data",
        "Unit":"data"
        }
    ]
    
    
    return (
        <>
       
        <div id="section12_1_5" ref={section12_1_5Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.5 GHG Emission Intensity
</h3>

<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
<div className="shadow-md rounded-md mb-4">
{/* <LeaveTable columns={col1} data={data1}/> */}
</div>

</div>
        </>
    )
}

export default Section7