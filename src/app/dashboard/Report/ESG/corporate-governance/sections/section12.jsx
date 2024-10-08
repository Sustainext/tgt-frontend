'use client'
import { useState, useRef, useEffect } from "react";

const Section12=({section9_3_6Ref})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_3_6" ref={section9_3_6Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.6 Evaluation of the Performance of the Highest Governance Body
            </h3>
            <p className="text-sm mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint ducimus neque commodi ad, dolorum totam voluptatibus veritatis minus eius, ea at. Iste beatae amet earum unde iusto repellendus, dolores nemo!</p>
        
        </div>
        </>
    )
}

export default Section12