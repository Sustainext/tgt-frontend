'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

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

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s process for recycling</p>
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