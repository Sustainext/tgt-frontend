'use client'
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";

const Section22=({section12_4_4Ref})=>{
    const [content,setContent] = useState(
        `Energy intensity measures our energy consumption relative to our production output. By tracking this metric, we can assess our energy efficiency and identify opportunities for improvement.`
    )


      const column1 = [
        'Energy Quantity', 
        'Organisation Metric', 
        "Energy Intensity",
        'Unit', 
        "Energy Intensity",
        'Unit', 
      ];
      const data1 = [
        {
            "Energy Quantity": 'data',
          'Organisation Metric': 'data',
          "Energy Intensity":"data",
          "Unit": 'data',
           "Energy Intensity":"data",
          "Unit": 'data'
        },
      ];


     
      
    
    return (
        <>
       
        <div id="section12_4_4" ref={section12_4_4Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.4.4 Energy Intensity
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
Energy Intensity
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column1} data={data1}/>
</div>


</div>
        </>
    )
}

export default Section22