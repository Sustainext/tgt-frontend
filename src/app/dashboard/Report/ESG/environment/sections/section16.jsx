'use client'
import { useState, useRef, useEffect } from "react";
import WaterTable from "../tables/waterTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

const Section16=({section12_3_2Ref})=>{
    const [content,setContent] = useState(
        `We track and report our water withdrawal to ensure sustainable use of water resources. Our initiatives aim to reduce water withdrawal through process improvements and water-saving technologies.`
    )

    const column2 = [
        'Source', 
        'Name of Water Stress Area', 
        'Water Type', 
        'Contribution %', 
        'Total Water Consumption', 
        'Unit'
      ];
      
      const data2 = [
        {
          Source: 'Surface Water',
          'Name of Water Stress Area': 'x%',
          'Water Type': 'Freshwater (≤1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
        {
          Source: 'Ground Water',
          'Name of Water Stress Area': 'x%',
          'Water Type': 'Other water (>1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
        {
          Source: 'Sea Water',
          'Name of Water Stress Area': 'x%',
          'Water Type': 'Other water (>1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
        {
          Source: 'Municipal Water',
          'Name of Water Stress Area': 'x%',
          'Water Type': 'Other water (>1000 mg/L Total Dissolved Solids)',
          'Contribution %': 'x%',
          'Total Water Consumption': '212123545',
          Unit: 'Megalitre'
        },
        {
          Source: 'Other (Please specify)',
          'Name of Water Stress Area': 'x%',
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
        'Water type', 
        "Source",
        'Contribution %', 
        'Total water withdrawal', 
        'Unit', 
      ];
      const data4 = [
        {
            "Water type": 'Freshwater (≤1000 mg/L Total Dissol',
          'Source': 'x%',
          "Contribution %":"Surface water",
          'Total water withdrawal': 'data',
          "Unit": 'data'
        },
        {
            "Water type": 'Freshwater (≤1000 mg/L Total Dissol',
          'Source': 'x%',
          "Contribution %":"Surface water",
          'Total water withdrawal': 'data',
          "Unit": 'data'
        },
        {
            "Water type": 'Freshwater (≤1000 mg/L Total Dissol',
          'Source': 'x%',
          "Contribution %":"Surface water",
          'Total water withdrawal': 'data',
          "Unit": 'data'
        },
      ];

      const column5 = [
        'Source of Water withdrawal from third party', 
        'Contribution %', 
        'Water Withdrawal', 
        'Unit', 
      ];
      const data5 = [
        {
            "Source of Water withdrawal from third party": 'Ground Water',
          "Contribution %":"Surface water",
          'Water Withdrawal': 'data',
          "Unit": 'data'
        },
        {
            "Source of Water withdrawal from third party": 'Ground Water',
          "Contribution %":"Surface water",
          'Water Withdrawal': 'data',
          "Unit": 'data'
        },
        {
            "Source of Water withdrawal from third party": 'Ground Water',
          "Contribution %":"Surface water",
          'Water Withdrawal': 'data',
          "Unit": 'data'
        },
      ];
      
    
    return (
        <>
       
        <div id="section12_3_2" ref={section12_3_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.3.2 Water Withdrawal  
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s tracking of water withdrawal</p>
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
Total Fresh Water withdrawal by business operation
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column1} data={data1} consumption="Total Water Withdrawal" unit={"Megalitre"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total Fresh Water withdrawal by source (from water stress area)
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column2} data={data2} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Total Fresh Water withdrawal by Location/Country
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column3} data={data3} consumption="Total Water Withdrawal" unit={"Megalitre"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Water withdrawal by water type 

        </p>
<p className="text-[15px]  mb-2 font-semibold">
Total Water withdrawal by Water type
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column4} data={data4} consumption="Total Water Consumption" unit={"Megalitre"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Water withdrawal from third-parties
        </p>
<div className="shadow-md rounded-md mb-4">
<WaterTable columns={column5} data={data5} consumption="Total Water Withdrawal" unit={"Megalitre"} total={'212123545'}/>
</div>
</div>
        </>
    )
}

export default Section16