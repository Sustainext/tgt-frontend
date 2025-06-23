'use client'
import { useState, useRef, useEffect } from "react";

const Section18=({section9_5_2Ref,data,
    sectionNumber = "9.5.2",
    sectionTitle = 'Mechanism for Seeking Advice and Raising Concerns',
    sectionOrder = 9,
})=>{
    const [content,setContent] = useState(
        `Employees and stakeholders can seek advice and raise concerns through multiple channels`
    )
    return (
        <>
        <div id="section9_5_2" ref={section9_5_2Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
           {sectionNumber} {sectionTitle}
            </h3>
            <p className="text-sm mb-2">{data["2_26_a"]?data["2_26_a"].responsible_business_conduct_advice:"No data available"}</p>
            <p className="text-sm mb-4">{data["2_26_a"]?data["2_26_a"].business_conduct_concerns:"No data available"}</p>
        </div>
        </>
    )
}

export default Section18