'use client'
import { useState, useRef, useEffect } from "react";
import EmissionTable from '../tables/emissionTable'
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

const Section7=({section12_1_5Ref})=>{
    const [content,setContent] = useState(
        `We track GHG emission intensity to understand our emissions in relation to our business growth and efficiency improvements`
    )

    const columns = [
        { header: "Organisation Metric" },
        { header: "Quantity" },
        { header: "Unit" },
        { header: "Type of GHGs", subHeaders: ["Direct (Scope 1)", "Energy indirect (Scope 2)", "Other indirect (Scope 3)"] },
        { header: "GHG Emission Intensity" },
        { header: "Units" },
        { header: "Gases included in the calculation", subHeaders: ["CO2", "N2O", "CH4", "HFCs", "PFCs", "SF6","NF3"] },
      ];
      
      const data = [
        {
          "Organisation Metric": "Production volume (metric tons)",
          "Quantity": "Metric tons",
          "Unit": "tCO2e/organisation metric unit",
          "Direct (Scope 1)": "data",
          "Energy indirect (Scope 2)": "data",
          "Other indirect (Scope 3)": "data",
          "GHG Emission Intensity": "tCO2e",
          "Units": "tCO2e",
          "CO2": "data",
          "N2O": "data",
          "CH4": "data",
          "HFCs": "data",
          "PFCs": "data",
          "SF6": "data",
          "NF3":"data"
        },
        {
          "Organisation Metric": "Number of full-time employees",
          "Quantity": "data",
          "Unit": "tCO2e",
          "Direct (Scope 1)": "data",
          "Energy indirect (Scope 2)": "data",
          "Other indirect (Scope 3)": "data",
          "GHG Emission Intensity": "tCO2e",
          "Units": "tCO2e",
          "CO2": "data",
          "N2O": "data",
          "CH4": "data",
          "HFCs": "data",
          "PFCs": "data",
          "SF6": "data",
          "NF3":"data"
        }
      ];
    
    
    return (
        <>
       
        <div id="section12_1_5" ref={section12_1_5Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.5 GHG Emission Intensity
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about tracking of GHG emission intensity</p>
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
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        GHG Emission Intensity
            </p>
<div className="shadow-md rounded-md mb-4">
<EmissionTable columns={columns} data={data}/>
</div>

</div>
        </>
    )
}

export default Section7
