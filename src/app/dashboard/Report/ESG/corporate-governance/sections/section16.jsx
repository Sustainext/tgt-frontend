'use client'
import { useState, useRef, useEffect } from "react";

const Section16=({section9_4_2Ref})=>{
    const [content,setContent] = useState(
        `We actively participate in various industry associations and sustainability networks to stay informed of best practices, collaborate on common challenges, and advocate for sustainable development.`
    )
    return (
        <>
        <div id="section9_4_2" ref={section9_4_2Ref}>
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.4.2 Membership Association
            </h3>
            <p className="text-sm mb-4">{content}</p>
        
        </div>
        </>
    )
}

export default Section16