'use client'
import { useState, useRef, useEffect } from "react";
import CustomerTable from '../table'

const Section5=({section15_2Ref})=>{
    const [content,setContent] = useState(
        `Providing accurate and comprehensive information about our products is essential for informed customer decision-making. We adhere to stringent standards for product labelling and information disclosure. `
    )
    const [content2,setContent2]=useState(
        `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
    )
    return (
        <>
        <div id="setion15_2" ref={section15_2Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        15.2 Product and Service Information and Labelling
        </h3>
        <p className="text-[15px] text-[#344054] mb-2">
        Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        <div className="mb-4 rounded-md shadow-md">
            <CustomerTable/>
        </div>
        </div>
        </>
    )
}

export default Section5