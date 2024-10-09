'use client'
import { useState, useRef, useEffect } from "react";
import CustomerTable from '../table'
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

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
        <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s product and service information and labelling</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            // onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
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