'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section6=({section10_3_2Ref})=>{
    const [content,setContent] = useState(
        `Our approach to supply chain sustainability focuses on ensuring that our suppliers adhere to high environmental and social standards. We engage with our suppliers through regular assessments, audits, and capacity-building programs to help them improve their sustainability performance.`
    )
    return (
        <>
        <div ref={section10_3_2Ref} id="section10_3_2">
        <h3 className="text-[16px] text-[#344054] mb-4 text-left font-semibold">
        10.3.2. Local Suppliers 
        </h3>   
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Percentage of new suppliers that were screened using environmental criteria: 
            </p>
            <p className="text-sm mb-4">{content}</p>
        </div>
        </>
    )
}

export default Section6