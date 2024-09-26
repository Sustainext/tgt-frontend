'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



const Section8=({section12_1_6Ref})=>{
    const [content,setContent] = useState(
        `
        <p>
        Our efforts to reduce GHG emissions include investing in energy-efficient equipment, optimizing production processes, and sourcing renewable energy. We set ambitious reduction targets and report our progress annually. (Initiatives taken by an organisation to reduce emissions can be represented with graphics) 
        </p>
        `
    )

    const col1=[
        "Initiatve taken to reduce GHG emissions ",
       "Method to account for reductions ",
        "Base Year or Baseline ",
        "Year",
        "Rationale for choosing base year or baseline",
        "GHG Emission reduced (tCO2e)",
        "Scopes in which reduction took place",
        "Gases included in the calculations",
        "Standard, Methodology, Assumptions and/or Calculation tools used"
    ]
    const data1=[
        {
            "Initiatve taken to reduce GHG emissions ":"data",
        "Method to account for reductions ":"data",
        "Base Year or Baseline ":"data",
        "Year":"data",
        "Rationale for choosing base year or baseline":"data",
        "GHG Emission reduced (tCO2e)":"data",
        "Scopes in which reduction took place":"data",
        "Gases included in the calculations":"data",
        "Standard, Methodology, Assumptions and/or Calculation tools used":"data"
        }
    ]
    
    const config = {
        style: {
          fontSize: '14px',
        },
        allowResizeY: false,
      };
    
    return (
        <>
       
        <div id="section12_1_6" ref={section12_1_6Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.6 Reduction in GHG Emissions 
</h3>

<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              // tabIndex={1}
              // onBlur={handleEditorChange}
              />
            </div>
           
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={data1}/>
</div>

</div>
        </>
    )
}

export default Section8