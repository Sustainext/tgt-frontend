'use client'
import { useState, useRef, useEffect } from "react";




const Section3=({section8_1_2Ref})=>{
    const [content,setContent] = useState(
        `Understanding the issues that matter most to our stakeholders and our business is fundamental to [Company Name]'s approach to sustainability. Our materiality assessment identifies and prioritizes the environmental, social, and governance (ESG) issues that are most significant to our stakeholders and our ability to create long-term value. `
    )
    return (
        <>
        <div id="section8_1_2" ref={section8_1_2Ref}>
        <p className="text-[17px] text-[#344054] mb-4 font-semibold">
        8.1.2 Changes in the list of material topics
            </p>

            <p className="text-sm mb-4">{content}</p>
            
        </div>
        </>
    )
}

export default Section3