'use client'
import { useState, useRef, useEffect } from "react";

const Section15=({section9_4Ref,section9_4_1Ref,data,
    sectionNumber = "9.4.1",
    sectionTitle = 'Statement on Sustainable Development Strategy',
    sectionOrder = 9,
})=>{
    const [content,setContent] = useState(
        `[Company Name] is committed to integrating sustainable development into our core business strategy. Our approach focuses on reducing environmental impact, enhancing social value, and maintaining strong governance. We aim to create long-term value for our stakeholders while contributing to a more sustainable future. `
    )
    return (
        <>
        
        <div id="section9_4_1" ref={section9_4_1Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            {sectionNumber} {sectionTitle}
            </h3>
            <p className="text-sm mb-4">{data["2_22_a"]?data["2_22_a"]:"No data available"}</p>
        </div>
        </>
    )
}

export default Section15