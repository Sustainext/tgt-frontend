'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

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

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s material management strategy</p>
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