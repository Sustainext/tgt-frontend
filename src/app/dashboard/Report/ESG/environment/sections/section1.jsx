'use client'
import { useState, useRef, useEffect } from "react";


const Section1=()=>{
    const [content,setContent] = useState(
        `At [Company Name], we recognize our responsibility to minimize the environmental impact of our operations and to contribute positively to the health of our planet. Our environmental strategy is focused on reducing emissions, managing materials responsibly, conserving water, optimizing energy use, reducing waste, protecting biodiversity, and improving air quality. `
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