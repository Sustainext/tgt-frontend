'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section1=()=>{
    const [content,setContent] = useState(
        `At [Company Name], sustainability is more than just a strategic priority; it is a fundamental component of our corporate identity. Our sustainability journey reflects our commitment to integrating environmental, social, and governance (ESG) principles into every aspect of our business, ensuring that we create long-term value for our stakeholders while positively impacting society and the environment. `
    )
    return (
        <>
        <div>
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

export default Section1