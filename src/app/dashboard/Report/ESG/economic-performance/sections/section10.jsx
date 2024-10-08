'use client'
import { useState, useRef, useEffect } from "react";
import Table2 from "../tables/table2";

const Section10=({section11_3_3Ref})=>{
    const col=[
        "Risk Category",
        "Type of Risk",
        "Potential Impact",
        "Likelihood of impact",
        "Magnitude of Impact",
        "Financial Effect",
        "Financial Implications",
        "Management Methods",
        "Time Frame",
        "Direct or Indirect Impacts",
        "Implemented Mitigation Strategies",
        "Mitigation Strategies"
    ]
  const values1=[
    "Physical Risk",
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
  const values2=[
    "Transition Risk",
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
  const values3=[
    "Other Risk",
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
        <div id="section11_3_3" ref={section11_3_3Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.3.3. Climate-related Risks
</h3>

<div className="rounded-md shadow-md mb-4">
<Table2 col={col} values={values1} />
</div>
<div className="rounded-md shadow-md mb-4">
<Table2 col={col} values={values2} />
</div>
<div className="rounded-md shadow-md mb-4">
<Table2 col={col} values={values3} />
</div>
       
        </div>
        </>
    )
}

export default Section10