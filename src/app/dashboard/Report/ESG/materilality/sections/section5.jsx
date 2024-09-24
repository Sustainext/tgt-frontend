'use client'
import { useState, useRef, useEffect } from "react";




const Section5=({section8_1_4Ref})=>{
    const [content,setContent] = useState(
        `Understanding the issues that matter most to our stakeholders and our business is fundamental to [Company Name]'s approach to sustainability. Our materiality assessment identifies and prioritizes the environmental, social, and governance (ESG) issues that are most significant to our stakeholders and our ability to create long-term value. `
    )
    return (
        <>
        <div id="section8_1_4" ref={section8_1_4Ref}>
        <p className="text-[17px] text-[#344054] mb-4 font-semibold">
        8.1.4 Management of material topic
            </p>

            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ab odit, delectus quis id nesciunt. Repellendus earum quasi illo modi maxime at molestias voluptas quia esse, neque inventore sint deserunt.</p>
            
        </div>
        </>
    )
}

export default Section5