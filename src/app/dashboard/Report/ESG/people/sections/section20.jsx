'use client'
import { useState, useRef, useEffect } from "react";


const Section20=({section13_6_3Ref})=>{
    const [content,setContent] = useState(
        `We provide access to occupational health services that support the physical and mental well-being of our employees. This includes medical check-ups, health screenings, and counseling services.`
    )
    
    return (
        <>
        
        <div id="section13_6_3" ref={section13_6_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.6.3 Occupational Health Services
</h3>

<p className="text-sm mb-4">{content}</p>


</div>
        </>
    )
}

export default Section20