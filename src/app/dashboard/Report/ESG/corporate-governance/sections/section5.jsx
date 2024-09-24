'use client'
import { useState, useRef, useEffect } from "react";



const Section5=({section9_2_3Ref})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_2_3" ref={section9_2_3Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        9.2.3 Senior Management Hired from Local Community
            </h3>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam facilis repellendus amet quia beatae, autem nobis veniam iste accusantium eligendi earum facere dolor sed vero soluta adipisci quibusdam officiis deleniti.</p>
        </div>
        </>
    )
}

export default Section5