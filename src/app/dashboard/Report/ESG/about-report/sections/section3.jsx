'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section3=({section7_2Ref})=>{
    const [content,setContent] = useState(
        `This report has been prepared in accordance with the GRI Standards, the leading global framework for sustainability reporting. We also align our reporting with other relevant frameworks and guidelines, including: 
United Nations Sustainable Development Goals (SDGs): Our initiatives and performance metrics are mapped to specific SDGs to demonstrate our contribution to global sustainability targets. `
    )
    const [content2,setContent2]=useState(
        `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
    )
    return (
        <>
        <div>
        <div id="setion7_2" ref={section7_2Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                7.2 Frameworks
        </h3>
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}/>
        </div>
        </div>
        </>
    )
}

export default Section3