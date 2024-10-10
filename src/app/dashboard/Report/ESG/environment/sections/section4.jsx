'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

const Section4=({section12_1_2Ref})=>{
    const [content,setContent] = useState(
        `Scope 1 emissions are direct greenhouse gas (GHG) emissions from our operations, such as fuel combustion on-site. We measure and report these emissions annually, striving to reduce them through process optimization and cleaner technologies. `
    )

    const col=[
        "Method",
        "Source",
        "Total Emission",
        "Unit"
    ]
    const data=[
        {
            "Method":"Combustion",
            "Source":"Grass/ Straw ",
            "Total Emission":"data",
            "Unit":"tCO2e"
        }
    ]
    
    return (
        <>
       
        <div id="section12_1_2" ref={section12_1_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.2 Scope 1 GHG Emissions
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s scope 1 emissions</p>
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
            Scope 1
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Biogenic CO2 emissions
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col} data={data}/>
</div>
</div>
        </>
    )
}

export default Section4