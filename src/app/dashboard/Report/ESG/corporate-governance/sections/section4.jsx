'use client'
import { useState, useRef, useEffect } from "react";


const Section4=({section9_2_2Ref})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_2_2" ref={section9_2_2Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        9.2.2 Chair of the Highest Governance Body
            </h3>
            <p className="text-sm mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis quia autem perspiciatis, consectetur soluta harum earum nisi laboriosam iste odio doloremque, nobis ratione ab tempora mollitia fugit, at dignissimos labore!</p>
        </div>
        </>
    )
}

export default Section4