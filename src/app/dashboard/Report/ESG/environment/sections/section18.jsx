'use client'
import { useState, useRef, useEffect } from "react";
import WaterTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";

const Section18=({section12_3_4Ref})=>{
    const [content,setContent] = useState(
        `Our goal is to reduce water consumption through efficient water use and recycling practices. We implement water-saving measures and invest in technologies that support sustainable water management`
    )

    const column2 = [
        'Business Operation', 
        'Contribution %', 
        'Total water Consumption', 
        'Unit', 
      ];
      const data2 = [
        {
            "Business Operation": 'data',
          'Contribution %': 'x%',
          'Total water Consumption': 'data',
          "Unit": 'data'
        },
        {
            "Business Operation": 'data',
          'Contribution %': 'x%',
          'Total water Consumption': 'data',
          "Unit": 'data'
        },
        {
            "Business Operation": 'data',
          'Contribution %': 'x%',
          'Total water Consumption': 'data',
          "Unit": 'data'
        },
      ];

      const column1 = [
        'Total water Consumption', 
        'Contribution %', 
        'Unit', 
      ];
      const data1 = [
        {
            "Total water Consumption": 'data',
          'Water consumption from areas with water stress ': 'data',
          
          "Unit": 'data'
        },
        {
            "Total water Consumption": 'data',
          'Water consumption from areas with water stress ': 'data',
          
          "Unit": 'data'
        },
        {
            "Total water Consumption": 'data',
          'Water consumption from areas with water stress ': 'data',
          
          "Unit": 'data'
        },
      ];

      const column3 = [
        'Location/country', 
        'Contribution %', 
        'Total water withdrawal', 
        'Unit', 
      ];
      const data3 = [
        {
            "Location/country": 'Location 1',
          'Contribution %': 'x%',
          'Total water withdrawal': 'data',
          "Unit": 'data'
        },
        {
            "Location/country": 'Location 2',
          'Contribution %': 'x%',
          'Total water withdrawal': 'data',
          "Unit": 'data'
        },
        {
            "Location/country": 'Location 3',
          'Contribution %': 'x%',
          'Total water withdrawal': 'data',
          "Unit": 'data'
        },
      ];

      const column4 = [
        'Source', 
        'Water Type', 
        'Contribution %', 
        'Total Water Consumption', 
        'Unit'
      ];
      
      const data4 = [
        {
          Source: 'Surface Water',
          'Water Type': 'Freshwater (≤1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
        {
          Source: 'Ground Water',
          'Water Type': 'Other water (>1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
        {
          Source: 'Sea Water',
          'Water Type': 'Other water (>1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
        {
          Source: 'Municipal Water',
          'Water Type': 'Other water (>1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
        {
          Source: 'Other (Please specify)',
          'Water Type': 'Other water (>1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
      ];

      const column5 = [
        'Name of Water Stress Area', 
        'Contribution %', 
        'Water Consumption', 
        'Unit', 
      ];
      const data5 = [
        {
            "Name of Water Stress Area": 'Area 1',
          "Contribution %":"Surface water",
          'Water Consumption': 'data',
          "Unit": 'data'
        },
        {
            "Name of Water Stress Area": 'Area 1',
          "Contribution %":"Surface water",
          'Water Consumption': 'data',
          "Unit": 'data'
        },
      ];

     
      
    
    return (
        <>
       
        <div id="section12_3_4" ref={section12_3_4Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.3.4 Water Consumption 
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
Total Water Consumption
        </p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={column1} data={data1}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total Water Consumption in water stress areas
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column5} data={data5} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>
<p className="text-[15px]  mb-2 font-semibold">
Water consumption by business operations 

        </p>
<p className="text-[15px]  mb-2 font-semibold">
Total Water Consumption by business operation
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column2} data={data2} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>


<p className="text-[15px]  mb-2 font-semibold">
Total Water Consumption by Location
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column3} data={data3} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>



<p className="text-[15px]  mb-2 font-semibold">
Total Water Consumption by source
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column4} data={data4} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>
</div>
        </>
    )
}

export default Section18