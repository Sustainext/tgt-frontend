'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";

const Section10=({section12_2Ref})=>{
    const [content,setContent] = useState(
        `Our materials management strategy focuses on responsible sourcing, reducing material consumption, and increasing the use of recycled materials. We aim to minimize our environmental footprint by adopting sustainable practices throughout our supply chain. `
    )

    const col=[
        "Material Type",
        "Material Category",
        "Source",
        "Total Quantity",
        "Unit"
    ]
    const data=[
        {
            "Material Type":"data",
            "Material Category":"data",
            "Source":"data",
            "Total Quantity":"data",
            "Unit":"data"
        }
    ]
    
    return (
        <>
       
        <div id="section12_2" ref={section12_2Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
12.2 Materials
</h3>

<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        
            <p className="text-[15px]  mb-2 font-semibold">
            Renewable materials used
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col} data={data}/>
</div>
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

export default Section10