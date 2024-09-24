'use client'
import { useState, useRef, useEffect } from "react";

const Section18=({section9_5_2Ref})=>{
    const [content,setContent] = useState(
        `Employees and stakeholders can seek advice and raise concerns through multiple channels`
    )
    return (
        <>
        <div id="section9_5_2" ref={section9_5_2Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.5.2 Mechanism for Seeking Advice and Raising Concerns
            </h3>
            <p className="text-sm mb-4">{content}</p>
        
        </div>
        </>
    )
}

export default Section18