'use client'
import { useState, useRef, useEffect } from "react";
import Table1 from '../tables/table1'

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
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
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