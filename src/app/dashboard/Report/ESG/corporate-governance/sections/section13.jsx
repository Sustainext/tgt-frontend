'use client'
import { useState, useRef, useEffect } from "react";

const Section13=()=>{
    const [content,setContent] = useState(
        `Our remuneration policies are designed to attract, retain, and motivate high-caliber Board members and executives. Compensation is based on industry benchmarks, individual performance, and the achievement of strategic objectives`
    )
    return (
        <>
        <div>
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.7 Remuneration Policies & Process to Determine Remuneration
            </h3>
            <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
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

export default Section13