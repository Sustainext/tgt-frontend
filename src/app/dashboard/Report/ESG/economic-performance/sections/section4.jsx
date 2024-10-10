'use client'
import { useState, useRef, useEffect } from "react";
import Table1 from '../tables/table1'
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";


const Section4=({section11_1_3Ref})=>{
    const [content,setContent] = useState(
        `In [Year], [Company Name] total monetary value of financial assistance received by the organization from any government during the reporting period, including:`
    )
    const rowLabels = [
        "Tax relief and tax credits ",
        "Subsidies",
        "Provide details of investment grants, research and development grants, and other relevant types of grant",
        "Awards",
        "Royalty holidays ",
        "Financial assistance from Export Credit Agencies (ECAs) ",
        "Financial incentives",
        "Other financial benefits received or receivable from any government for any operation",
    ];

    const values = [
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
    ];

    return (
        <>
        <div id="section11_1_3" ref={section11_1_3Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.1.3 Financial Assistance Received from Government
</h3>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add introduction about financial assistance received from government</p>
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
        <div className="shadow-md rounded-md mb-4">
            <Table1 rowLabels={rowLabels} values={values} />
        </div>
        </div>
        </>
    )
}

export default Section4