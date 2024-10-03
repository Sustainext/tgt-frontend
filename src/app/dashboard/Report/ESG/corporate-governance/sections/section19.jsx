'use client'
import { useState, useRef, useEffect } from "react";
import ComplianceTable from "../tables/complianceTable";

const Section19=({section9_5_3Ref})=>{
    const [content,setContent] = useState(
        `We maintain strict compliance with all applicable laws and regulations, including environmental, labor, and corporate governance standards`
    )
    const rowLabels=[
        "Provide the total number of instances for which fines were incurred ",
        "Provide the total number of instances for which non-monetary sanctions were incurred ",
    ]
    const rowLabels2=[
        "Provide the total number of fines for instances of non-compliance with laws and regulations that occurred in the current reporting period ",
        "Provide the total number of fines for instances of non-compliance with laws and regulations that occurred in previous reporting periods ",
    ]
    return (
        <>
        <div id="section9_5_3" ref={section9_5_3Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.5.3 Compliance
            </h3>
            <p className="text-sm mb-4">{content}</p>
            <div className="shadow-md rounded-md mb-4">
                <ComplianceTable rowLabels={rowLabels} />
            </div>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Provide the total number and the monetary value of fines for instances of non-compliance with laws and regulations that were paid during the reporting period, and a breakdown of this total by:  
            </p>
            <div className="shadow-md rounded-md mb-4">
                <ComplianceTable rowLabels={rowLabels2} />
            </div>
        </div>
        </>
    )
}

export default Section19