'use client'
import { useState, useRef, useEffect } from "react";
import WasteTable from "../tables/waterTable";


const Section26=({section12_5_3Ref,data})=>{
    const [content,setContent] = useState(
        `We set targets for reducing energy consumption and implement various initiatives, such as upgrading equipment, improving insulation, and optimizing processes to achieve these goals.`
    )


     

     
      
    
    return (
        <>
       
        <div id="section12_5_3" ref={section12_5_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.5.3  Management of Waste-Related Impacts
</h3>

        
<p className="text-sm mb-4">We implement measures to manage the environmental impacts of our waste, including proper disposal methods, recycling programs, and waste treatment technologies. Our waste management plan takes a comprehensive 360-degree approach to ensure circularity and environmental sustainability. To minimise vehicle emissions associated with waste transportation, we are establishing a waste management plant facility right within our premises. </p>
<p className="text-sm mb-4">
{data["306_2"]?data["306_2"].data?data["306_2"].data[0].Q1?data["306_2"].data[0].Q1:"No data available":"No data available":"No data available"}
</p>
<p className="text-sm mb-4">
{data["306_2"]?data["306_2"].data?data["306_2"].data[0].Q2?data["306_2"].data[0].Q2:"No data available":"No data available":"No data available"}
</p>
<p className="text-sm mb-4">
{data["306_2"]?data["306_2"].data?data["306_2"].data[0].Q3?data["306_2"].data[0].Q3:"No data available":"No data available":"No data available"}
</p>
</div>
        </>
    )
}

export default Section26