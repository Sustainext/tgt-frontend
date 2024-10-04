'use client'
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";

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

<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
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