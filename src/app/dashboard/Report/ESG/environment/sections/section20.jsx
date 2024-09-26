'use client'
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";

const Section20=({section12_4_2Ref})=>{
    const [content,setContent] = useState(
        `We monitor and report our energy consumption within our operations, implementing energy-saving measures and optimizing our processes to reduce usage.`
    )

    const column2 = [
        'Types of energy consumption', 
        'Consumption', 
        'Unit', 
      ];
      const data2 = [
        {
            "Types of energy consumption": 'data',
          'Consumption': 'x%',
          "Unit": 'data'
        },
       
      ];

      const column1 = [
        'Energy type', 
        'Source', 
        "Energy Consumption",
        'Unit', 
      ];
      const data1 = [
        {
            "Energy type": 'data',
          'Source': 'data',
          "Energy Consumption":"data",
          "Unit": 'data'
        },
      ];

      const column3 = [
        'Energy Type', 
        'Source', 
        'Purpose', 
        "Energy Consumption",
        'Unit', 
      ];
      const data3 = [
        {
            "Energy Type": 'Location 1',
          'Source': 'x%',
          'Purpose': 'data',
          "Energy Consumption":"data",
          "Unit": 'data'
        },
       
      ];

      const column4 = [
        'Types of self generated Energy', 
        'Source', 
        'Consumption', 
        'Unit'
      ];
      
      const data4 = [
        {
          'Types of self generated Energy': 'data',
          'Source': 'data',
          'Consumption': 'data',
          Unit: 'GJ'
        },
        
      ];

      const column5 = [
        'Energy Type', 
        'Source', 
        'Type of entity', 
        'Name of Entity', 
        'Consumption',
        'Unit'
      ];
      const data5 = [
        {
            "Energy Type": 'Sold Electricity',
          "Source":"Surface water",
          'Type of entity': 'data',
          "Name of Entity": 'data',
          "Consumption":"data",
            'Unit':'GJ'
        },
        {
            "Energy Type": 'Sold Electricity',
          "Source":"Surface water",
          'Type of entity': 'data',
          "Name of Entity": 'data',
           "Consumption":"data",
            'Unit':'GJ'
        },
      ];

     
      
    
    return (
        <>
       
        <div id="section12_4_2" ref={section12_4_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.4.2 Energy Consumption within the Organization
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
Fuel Consumption within the organisation from Renewable sources
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column1} data={data1} consumption="Total Energy Consumption" unit={"GJ"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Fuel Consumption within the organisation from Non-renewable sources
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column1} data={data1} consumption="Total Non-renewable Energy consumption" unit={"GJ"} total={'212123545'}/>
</div>

<p className="text-[15px]  mb-2 font-semibold">
Energy Consumption Within the organisation
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column2} data={data2} consumption="Total Energy Consumption Within the organization" unit={"GJ"} total={'212123545'}/>
</div>


<p className="text-[15px]  mb-2 font-semibold">
Direct Purchased Heating, Cooling, Electricity and Steam from renewable sources
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column3} data={data3} consumption="Total Energy Consumption Within the organization" unit={"GJ"} total={'212123545'}/>
</div>



<p className="text-[15px]  mb-2 font-semibold">
Direct Purchased Heating, Cooling, Electricity and Steam from non-renewable sources
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column3} data={data3} consumption="Total Energy Consumption Within the organization" unit={"GJ"} total={'212123545'}/>

</div>


<p className="text-[15px]  mb-2 font-semibold">
Self Generated Energy  - not consumed or sold (Renewable Energy)        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column4} data={data4} consumption="Total Self Generated Electricity (not consumed or sold)" unit={"GJ"} total={'212123545'}/>

</div>


<p className="text-[15px]  mb-2 font-semibold">
Self Generated Energy  - not consumed or sold (non-renewable Energy)
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column4} data={data4} consumption="Total Self Generated Electricity (not consumed or sold)" unit={"GJ"} total={'212123545'}/>

</div>


<p className="text-[15px]  mb-2 font-semibold">
Energy Sold (Renewable energy)
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column5} data={data5} consumption="Total Energy Sold" unit={"GJ"} total={'212123545'}/>

</div>


<p className="text-[15px]  mb-2 font-semibold">
Energy Sold (non-renewable energy)
        </p>
<div className="shadow-md rounded-md mb-4">
<EnergyTable columns={column5} data={data5} consumption="Total Energy Sold" unit={"GJ"} total={'212123545'}/>

</div>
</div>
        </>
    )
}

export default Section20