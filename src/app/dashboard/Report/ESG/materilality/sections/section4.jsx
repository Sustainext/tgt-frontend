'use client'
import { useState, useRef, useEffect } from "react";




const Section4=({section8_1_3Ref})=>{
    const [content,setContent] = useState(
        `Understanding the issues that matter most to our stakeholders and our business is fundamental to [Company Name]'s approach to sustainability. Our materiality assessment identifies and prioritizes the environmental, social, and governance (ESG) issues that are most significant to our stakeholders and our ability to create long-term value. `
    )
    return (
        <>
        <div id="section8_1_3" ref={section8_1_3Ref}>
        <p className="text-[17px] text-[#344054] mb-4 font-semibold">
        8.1.3 Materiality assessment
            </p>

            <p className="text-sm mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos saepe cum nesciunt eum harum, asperiores, architecto repudiandae voluptatum fugiat dignissimos ipsum quo ducimus iusto nulla, excepturi tenetur blanditiis nisi corporis.</p>
            
        </div>
        </>
    )
}

export default Section4