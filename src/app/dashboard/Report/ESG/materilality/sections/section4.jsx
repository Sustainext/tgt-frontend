'use client'
import { useState, useRef, useEffect } from "react";




const Section4=({section8_1_3Ref,data,
    sectionNumber = "8.1.3",
    sectionTitle = 'Materiality Assessment Process',
    sectionOrder = 8,
})=>{
   
    return (
        <>
        <div id="section8_1_3" ref={section8_1_3Ref}>
        <p className="text-[17px] text-[#344054] mb-4 font-semibold">
       {sectionNumber}{sectionTitle}
            </p>

            <p className="text-sm mb-4">Our materiality assessment process involves several key steps:</p>
            <p className="mb-2 font-semibold text-[15px]">Identification of Relevant Issues:</p>
            <p className="mb-4 text-sm">{data["3-1-a"]?data["3-1-a"].impact_assessment_process:"No data available"}</p>
            <p className="mb-2 font-semibold text-[15px]">Stakeholder Engagement:</p>
            <p className="mb-4 text-sm">{data["3-1-a"]?data["3-1-a"].selected_stakeholders.map((val,i)=>(i+1==data["3-1-a"].selected_stakeholders.length?val:`${val}, `)):"No data available"}</p>
            <p className="mb-2 font-semibold text-[15px]">Prioritization:</p>
            <p className="mb-4 text-sm">{data["3-1-a"]?data["3-1-a"].process_description:"No data available"}</p>
            <p className="mb-2 font-semibold text-[15px]">Validation:</p>
            <p className="mb-4 text-sm">The results of the materiality assessment are reviewed and validated by our senior management and Board of Directors.</p>
        </div>
        </>
    )
}

export default Section4