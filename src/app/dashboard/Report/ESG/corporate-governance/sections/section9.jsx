'use client'
import { useState, useRef, useEffect } from "react";

const Section9=({section9_3_3Ref})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_3_3" ref={section9_3_3Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.3. Role of the highest governance body in sustainability reporting
            </h3>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia iusto debitis possimus fuga. Dolore esse autem accusantium ab est quaerat eos expedita hic perferendis rerum? Mollitia maiores animi necessitatibus distinctio.</p>
        
        </div>
        </>
    )
}

export default Section9