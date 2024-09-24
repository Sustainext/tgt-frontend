'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section5=({section10_3_1Ref})=>{
    const [content,setContent] = useState(
        `Our approach to supply chain sustainability focuses on ensuring that our suppliers adhere to high environmental and social standards. We engage with our suppliers through regular assessments, audits, and capacity-building programs to help them improve their sustainability performance.`
    )
    return (
        <>
        <div ref={section10_3_1Ref} id="section10_3_1">
        <h3 className="text-[16px] text-[#344054] mb-4 text-left font-semibold">
        10.3.1 Supply Chain Sustainability
        </h3>   
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        </div>
        </>
    )
}

export default Section5