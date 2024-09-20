'use client'
import { useState, useRef, useEffect } from "react";

const Section8=()=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div>
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.2. Collective knowledge of the highest governance body
            </h3>
            <p className="text-sm mb-4">{content}</p>
        
        </div>
        </>
    )
}

export default Section8