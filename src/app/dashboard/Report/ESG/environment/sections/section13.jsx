'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";

const Section13=({section12_2_3Ref})=>{
    const [content,setContent] = useState(
        `We actively promote the reclamation and recycling of our products and packaging materials. Our take-back programs and recycling initiatives help to ensure that materials are reused and diverted from landfills. `
    )

    const col=[
        "Type of Product",
        "Product Code",
        "Product Name",
        "Percentage of reclaimed products and their packaging materials (%)"
    ]
    const data=[
        {
            "Type of Product":"data",
            "Product Code":"data",
            "Product Name":"data",
            "Percentage of reclaimed products and their packaging materials (%)":"data"
        }
    ]
    
    return (
        <>
       
        <div id="section12_2_3" ref={section12_2_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.2.3 Reclaimed Products and Their Packaging Materials
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

export default Section13