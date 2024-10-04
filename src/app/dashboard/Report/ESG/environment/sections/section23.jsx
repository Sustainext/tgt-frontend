'use client'
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";

const Section23=({section12_4_5Ref})=>{
    const [content,setContent] = useState(
        `We set targets for reducing energy consumption and implement various initiatives, such as upgrading equipment, improving insulation, and optimizing processes to achieve these goals.`
    )


      const column1 = [
        'Type of Intervention', 
        'Energy Type', 
        "Energy reduction",
        'Base year', 
        'Methodology',
        'Quantity',
        'Unit',
         'Quantity',
        'Unit'
      ];
      const data1 = [
        {
            "Type of Intervention": 'data',
          'Energy Type': 'data',
          "Energy reduction":"data",
          "Base year": 'data',
          'Methodology':"data",
        'Quantity':"data",
        'Unit':"data",
         'Quantity':"data",
        'Unit':"data"
        },
      ];


      const column2 = [
        'Name of Product/ Service', 
        'Reduction in Energy Consumption', 
        'Unit',
        'Reduction in Energy Consumption', 
        'Unit'
      ];
      const data2 = [
        {
            "Name of Product/ Service": 'data',
          'Reduction in Energy Consumption': 'data',
        'Unit':"data",
         'Reduction in Energy Consumption': 'data',
        'Unit':"data"
        },
      ];


     
      
    
    return (
        <>
       
        <div id="section12_4_5" ref={section12_4_5Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.4.5  Reduction in Energy consumption 
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
Reduction of energy consumption
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column1} data={data1} consumption="Reduction in energy consumption total" unit={"GJ"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Reductions in energy requirements of products and services
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column2} data={data2} consumption="Total reduction in energy requirements of products and services" unit={"GJ"} total={'212123545'}/>
</div>


</div>
        </>
    )
}

export default Section23