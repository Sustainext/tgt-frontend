'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section4=({section7_3Ref})=>{
    const [content,setContent] = useState(
        `This ESG report, prepared in accordance with the Global Reporting Initiative (GRI) standards, provides a comprehensive overview of [Company Name]'s environmental, social, and governance (ESG) performance for the reporting period [Year]. It reflects our commitment to transparency, accountability, and continuous improvement in our sustainability practices. `
    )
    const [content2,setContent2]=useState(
        `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
    )
    return (
        <>
        <div>
        <div id="setion7_3" ref={section7_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                7.3 External Assurance
        </h3>
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}/>
          <p className="text-[15px] text-[#344054] mb-4 font-semibold">
          The scope of the assurance includes 
            </p>
            <p className="mb-2 text-sm">{content}</p>
        </div>
        </div>
        </>
    )
}

export default Section4