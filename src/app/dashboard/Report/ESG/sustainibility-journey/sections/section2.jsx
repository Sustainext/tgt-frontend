'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section2=({section10_1Ref})=>{
    const [content,setContent] = useState(
        `We integrate sustainability into our core business operations by setting ambitious goals, implementing robust management systems, and continuously monitoring our performance. Our approach is guided by global frameworks such as the Global Reporting Initiative (GRI) and the United Nations Sustainable Development Goals (SDGs).`
    )
    return (
        <>
        <div ref={section10_1Ref} id="section10_1">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        10.1 Management approach for sustainability/ESG topics  
        </h3>   
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

export default Section2