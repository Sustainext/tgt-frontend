'use client'
import { useState, useRef, useEffect } from "react";
import RatioTable from "../tables/ratioTable";

const Section14=({section9_3_8Ref})=>{
    const col=[
        "Ratio of annual total compensation",
        "Ratio of percentage  increase in annual total compensation",
        
    ]
    const values=[
        "Data",
        "Data"
    ]
    return (
        <>
        <div id="section9_3_8" ref={section9_3_8Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.8 Annual Compensation Ratio
            </h3>
            <p className="text-[15px] text-[#344054] mb-2">
            Ratio of annual total compensation & ratio of percentage increase in annual total compensation 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <RatioTable col={col} values={values}/>
            </div>
            
        
        </div>
        </>
    )
}

export default Section14