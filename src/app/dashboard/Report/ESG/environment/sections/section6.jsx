'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

const Section6=({section12_1_4Ref})=>{
    const [content,setContent] = useState(
        `Scope 3 emissions include all other indirect emissions in our value chain, such as those from suppliers and product use. We collaborate with suppliers to reduce these emissions and support initiatives that encourage sustainable practices throughout our supply chain. `
    )

    const col1=[
        "S.no",
        "Source",
        "Percentage contribution",
        "Total Emission",
        "Unit"
    ]
    const data1=[
        {
            "S.no":"1",
        "Source":"data",
        "Percentage contribution":"data",
        "Total Emission":"data",
        "Unit":"data"
        }
    ]
    const col2=[
        "S.no",
        "Location",
        "Percentage contribution",
        "Total Emission",
        "Unit"
    ]
    const data2=[
        {
            "S.no":"1",
        "Location":"data",
        "Percentage contribution":"data",
        "Total Emission":"data",
        "Unit":"data"
        }
    ]

    const col3=[
        "Method",
        "Source",
        "Total Emission",
        "Unit"
    ]
    const data3=[
        {
        "Method":"data",
        "Source":"data",
        "Total Emission":"data",
        "Unit":"data"
        }
    ]
    
    return (
        <>
       
        <div id="section12_1_4" ref={section12_1_4Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.4 Scope 3 GHG Emissions
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s scope 3 emissions</p>
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
            Scope 3
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Top Emissions by Source
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={data1}/>
</div>
<p className="text-[15px]  mb-2 font-semibold">
Top Emissions by Location
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col2} data={data2}/>
</div>
<p className="text-[15px]  mb-2 font-semibold">
Emissions by Scope
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={data1}/>
</div>
<p className="text-[15px]  mb-2 font-semibold">
305-3-c. Biogenic CO2 emissions
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col3} data={data3}/>
</div>
</div>
        </>
    )
}

export default Section6