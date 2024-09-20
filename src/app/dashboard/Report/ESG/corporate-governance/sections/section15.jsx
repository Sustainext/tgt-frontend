'use client'
import { useState, useRef, useEffect } from "react";

const Section15=()=>{
    const [content,setContent] = useState(
        `[Company Name] is committed to integrating sustainable development into our core business strategy. Our approach focuses on reducing environmental impact, enhancing social value, and maintaining strong governance. We aim to create long-term value for our stakeholders while contributing to a more sustainable future. `
    )
    return (
        <>
        <div>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        9.4 Strategy 
            </h3>
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.4.1 Statement on Sustainable Development Strategy
            </h3>
            <p className="text-sm mb-4">{content}</p>
        
        </div>
        </>
    )
}

export default Section15