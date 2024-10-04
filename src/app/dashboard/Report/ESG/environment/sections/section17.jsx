'use client'
import { useState, useRef, useEffect } from "react";
import WaterTable from "../tables/waterTable";

const Section17=({section12_3_3Ref})=>{
    const [content,setContent] = useState(
        `We manage water discharge to minimize its impact on local ecosystems. This includes treating wastewater to meet regulatory standards and monitoring the quality of discharged water. Following are the standards used`
    )

    const column2 = [
        'Source', 
        'Water Type', 
        'Contribution %', 
        'Total Water Consumption', 
        'Unit'
      ];
      
      const data2 = [
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

      const column1 = [
        'Business Operation', 
        'Contribution %', 
        'Total water withdrawal', 
        'Unit', 
      ];
      const data1 = [
        {
            "Business Operation": 'data',
          'Contribution %': 'x%',
          'Total water withdrawal': 'data',
          "Unit": 'data'
        },
        {
            "Business Operation": 'data',
          'Contribution %': 'x%',
          'Total water withdrawal': 'data',
          "Unit": 'data'
        },
        {
            "Business Operation": 'data',
          'Contribution %': 'x%',
          'Total water withdrawal': 'data',
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
        'Name of Water Stress Area', 
        "Business Operation",
        'Contribution %', 
        'Total water Discharge', 
        'Unit', 
      ];
      const data4 = [
        {
            "Name of Water Stress Area": 'Area 1',
            "Business Operation":"",
          "Contribution %":"Surface water",
          'Total water Discharge': 'data',
          "Unit": 'data'
        },
        {
            "Name of Water Stress Area": 'Area 1',
            "Business Operation":"",
          "Contribution %":"Surface water",
          'Total water Discharge': 'data',
          "Unit": 'data'
        },
      ];

      const column5 = [
        'Name of Water Stress Area', 
        "Type of water",
        'Contribution %', 
        'Total water Discharge', 
        'Unit', 
      ];
      const data5 = [
        {
            "Name of Water Stress Area": 'Area 1',
            "Type of water":"",
          "Contribution %":"Surface water",
          'Total water Discharge': 'data',
          "Unit": 'data'
        },
        {
            "Name of Water Stress Area": 'Area 1',
            "Type of water":"",
          "Contribution %":"Surface water",
          'Total water Discharge': 'data',
          "Unit": 'data'
        },
      ];

      const column6 = [
        'Volume of third-party water send  to use for other organizations', 
        'Contribution %', 
        'Unit', 
      ];
      const data6 = [
        {
            "Volume of third-party water send  to use for other organizations": '212123545',
          "Contribution %":"Surface water",
          "Unit": 'data'
        },
        {
            "Volume of third-party water send  to use for other organizations": '212123545',
          "Contribution %":"Surface water",
          "Unit": 'data'
        },
      ];
      
    
    return (
        <>
       
        <div id="section12_3_3" ref={section12_3_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.3.3 Water Discharge & Management of Associated Impacts
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
Total Water Discharge by Location
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column3} data={data3} consumption="Total Water Discharge" unit={"Megalitre"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge by source and type of water
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column2} data={data2} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>
<p className="text-[15px]  mb-2 font-semibold">
Water withdrawal by water type 

        </p>
<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge (from water stress area) by Business Operation
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column4} data={data4} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>


<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge by Business Operation
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column1} data={data1} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Water discharge (from water stress areas) by water type 


        </p>

<p className="text-[15px]  mb-2 font-semibold">
Total Water Discharge by Water type (from water stress area)
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column5} data={data5} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Third-party Water discharge sent to use for other organizations
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column6} data={data6}/>
</div>





<p className="text-[15px]  mb-2 font-semibold">
Discharge Standard used: 
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
        Process to determine discharge standards: 
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
        Internal water quality standards:
        </p>
</div>
        </>
    )
}

export default Section17