'use client'
import { useState, useRef, useEffect } from "react";


const Section1=({section15_1Ref})=>{
    const [content,setContent] = useState(
        `Our commitment to providing high-quality products and services is central to our business strategy. We adhere to the Global Reporting Initiative (GRI) standards to ensure that our offerings meet the highest levels of safety, sustainability, and customer satisfaction. This section outlines our approach to managing the health and safety impacts of our products, addressing incidents of non-compliance, and ensuring accurate product information and labelling. `
    )
    const [content2,setContent2]=useState(
        `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
    )
    return (
        <>
        <div id="setion15_1" ref={section15_1Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        15.1 Products and Services
        </h3>
        <p className="text-[15px] text-[#344054] mb-2">
        Edit product and service statement
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