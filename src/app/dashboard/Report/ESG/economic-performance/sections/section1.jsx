'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section1=()=>{
    const [content,setContent] = useState(
        `Our economic performance is a testament to [Company Name]'s resilience, innovation, and commitment to creating value for our stakeholders. Through strategic investments, prudent financial management, and robust risk mitigation, we aim to sustain long-term economic growth while addressing social and environmental challenges. `
    )
    return (
        <>
        <div>
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        </div>
        </>
    )
}

export default Section1