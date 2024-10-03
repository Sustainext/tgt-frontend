'use client'
import { useState, useRef, useEffect } from "react";
import WasteTable from "../tables/waterTable";
import WasteTable2 from '../tables/wasteTable'

const Section27=({section12_5_4Ref})=>{
    const [content,setContent] = useState(
        `We set targets for reducing energy consumption and implement various initiatives, such as upgrading equipment, improving insulation, and optimizing processes to achieve these goals.`
    )


      const column1 = [
        'Disposal Method', 
        'Material Type', 
        "Qty of total waste",
        '% of total waste',
        'Unit'
      ];
      const data1 = [
        {
            "Disposal Method": 'data',
          'Material Type': 'data',
          "Qty of total waste":"data",
          "% of total waste":"data",
        'Unit':"data"
        },
      ];


      const column2 = [
        'Waste Type', 
        'Quantity', 
        'Unit',
        'Incineration (with energy) %', 
        'Incineration (without energy) %',
        "Landfill %",
        "Other disposal method  %",
        "External Vendor",
        "Site"
      ];
      const data2 = [
        {
            "Waste Type": 'data',
          'Quantity': 'data',
        'Unit':"data",
         'Incineration (with energy) %': 'data',
        'Incineration (without energy) %':"data",
        "Landfill %":"data",
        "Other disposal method  %":"data",
        "External Vendor":"data",
        "Site":"data"
        },
      ];


      const column3 = [
        'Total Waste by Category', 
        'Contribution %',
        'Total in Qty', 
        'Unit'
      ];
      const data3 = [
        {
            "Total Waste by Category": 'data',
        'Contribution %':"data",
         'Total in Qty': 'data',
        'Unit':"data"
        },
      ];


     
      
    
    return (
        <>
       
        <div id="section12_5_4" ref={section12_5_4Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.5.4  Waste Disposed
</h3>

        
        <p className="text-sm mb-4">We report on the quantity of waste disposed of through landfilling, incineration, or other methods. Our aim is to reduce the amount of waste sent to disposal by increasing recycling and reuse.</p>

        <p className="text-[15px]  mb-2 font-semibold">
        Waste  directed to disposal by material type

        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable columns={column1} data={data1} consumption="Total" unit={"Metric tons (t)"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Hazardous waste directed to disposal
        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable2 columns={column2} data={data2} consumption="Total" unit={"Metric tons (t)"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Non-hazardous waste directed to disposal
        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable2 columns={column2} data={data2} consumption="Total" total={'212123545'}/>
</div>


</div>
        </>
    )
}

export default Section27