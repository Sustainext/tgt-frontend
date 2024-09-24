'use client'
import { useState, useRef, useEffect } from "react";
import Table2 from "../tables/table2";

const Section11=({section11_3_4Ref})=>{
    const col=[
        "Type of Opportunities",
        "Potential Impact",
        "Magnitude of Impact",
        "Likelihood of impact",
        "Financial Effect",
        "Financial Implications",
        "Management Methods",
        "Time Frame",
        "Direct or Indirect Impacts",
        "Implemented Mitigation Strategies",
        "Mitigation Strategies"
    ]
  const values=[
    
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
        
  ]
    return (
        <>
        <div id="section11_3_4" ref={section11_3_4Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.3.4. Climate-related Opportunities
</h3>

<div className="rounded-md shadow-md mb-4">
<Table2 col={col} values={values} />
</div>
       
        </div>
        </>
    )
}

export default Section11