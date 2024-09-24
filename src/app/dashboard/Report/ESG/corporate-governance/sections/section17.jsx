'use client'
import { useState, useRef, useEffect } from "react";

const Section17=({section9_5Ref,section9_5_1Ref})=>{
    const [content,setContent] = useState(
        `We are committed to identifying, mitigating, and remediating any negative impacts associated with our operations`
    )
    return (
        <>
        <div id="section9_5" ref={section9_5Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        9.5. Risk Management
            </h3>
            
        
        </div>
        <div id="section9_5_1" ref={section9_5_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.5.1 Remediation of Negative Impacts
            </h3>
            <p className="text-sm mb-4">{content}</p>
        </div>
        </>
    )
}

export default Section17