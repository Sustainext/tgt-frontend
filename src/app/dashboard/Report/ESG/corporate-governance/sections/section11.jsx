'use client'
import { useState, useRef, useEffect } from "react";

const Section11=({section9_3_5Ref})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_3_5" ref={section9_3_5Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.5 Communication of Critical Concerns
            </h3>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptas, quibusdam assumenda delectus aliquid aperiam tempora, sint ab error distinctio laborum exercitationem fugiat veritatis dolor, cum fuga iste excepturi ratione?</p>
        
        </div>
        </>
    )
}

export default Section11