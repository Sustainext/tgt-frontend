'use client'
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

const Section21=({section12_4_3Ref})=>{
    const [content,setContent] = useState(
        `We also consider energy consumption outside our direct operations, such as in our supply chain and product use. We work with suppliers and customers to promote energy efficiency throughout our value chain.`
    )


      const column1 = [
        'Energy type', 
        'Purpose', 
        "Energy Consumption",
        'Unit', 
      ];
      const data1 = [
        {
            "Energy type": 'data',
          'Purpose': 'data',
          "Energy Consumption":"data",
          "Unit": 'data'
        },
      ];


     
      
    
    return (
        <>
       
        <div id="section12_4_3" ref={section12_4_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.4.3 Energy Consumption Outside of the Organization
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s energy consumption outside of the organisation</p>
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
Energy Consumption outside of the organization
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column1} data={data1} consumption="Total Energy Consumption outside of the organization" unit={"GJ"} total={'212123545'}/>
</div>


</div>
        </>
    )
}

export default Section21