'use client'
import { useState, useRef, useEffect } from "react";


const Section1=()=>{
    const [content,setContent] = useState(
        `At [Company Name], strong corporate governance is the foundation of our business integrity, accountability, and sustainability. Our governance framework is designed to ensure transparent, ethical, and effective management, aligning with the best practices and standards to drive long-term value for our stakeholders.`
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