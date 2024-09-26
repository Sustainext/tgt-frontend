'use client'
import { useState, useRef, useEffect } from "react";


const Section19=({section13_6_2Ref})=>{
    const [content,setContent] = useState(
        `Our Occupational Health and Safety (OHS) management system is designed to prevent workplace injuries and illnesses. It includes policies, procedures, and practices that ensure a safe working environment. `
    )
    
    return (
        <>
        
        <div id="section13_6_2" ref={section13_6_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.6.2 OHS Management System
</h3>

<p className="text-sm mb-4">{content}</p>


</div>
        </>
    )
}

export default Section19