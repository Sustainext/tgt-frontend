'use client'
import { useState, useRef, useEffect } from "react";
import WasteTable from "../tables/waterTable";
import WasteTable2 from '../tables/wasteTable'


const Section28=({section12_5_5Ref})=>{
    const [content,setContent] = useState(
        `We set targets for reducing energy consumption and implement various initiatives, such as upgrading equipment, improving insulation, and optimizing processes to achieve these goals.`
    )


      const column1 = [
        'Recovery operation', 
        'Material Type', 
        "Qty of total waste",
        '% of total waste',
        'Unit'
      ];
      const data1 = [
        {
            "Recovery operation": 'data',
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
        'Recycled %', 
        'Preparation of reuse %',
        "Other recovery options  %",
        "Site"
      ];
      const data2 = [
        {
            "Waste Type": 'data',
          'Quantity': 'data',
        'Unit':"data",
         'Recycled %': 'data',
        'Preparation of reuse %':"data",
        "Other recovery options  %":"data",
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
       
        <div id="section12_5_5" ref={section12_5_5Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.5.5  Waste Diverted from Disposal
</h3>

        
        <p className="text-sm mb-4">We focus on diverting waste from disposal through recycling, composting, and other sustainable practices. Our initiatives aim to increase the proportion of waste diverted from landfills. </p>

        <p className="text-[15px]  mb-2 font-semibold">
        Waste diverted from disposal by material type

        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable columns={column1} data={data1} consumption="Total" unit={"Metric tons (t)"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Hazardous waste diverted form disposal
        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable2 columns={column2} data={data2} consumption="Total" unit={"Metric tons (t)"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Non-hazardous waste diverted form disposal
        </p>
<div className="shadow-md rounded-md mb-4">
<WasteTable2 columns={column2} data={data2} consumption="Total" total={'212123545'} unit={"Metric tons (t)"}/>
</div>


</div>
        </>
    )
}

export default Section28