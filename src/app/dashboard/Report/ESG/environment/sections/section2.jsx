'use client'
import { useState, useRef, useEffect } from "react";


const Section2=({section12_1Ref})=>{
    const [content,setContent] = useState(
        `We manage our emissions through a comprehensive strategy that includes setting reduction targets, implementing energy-efficient technologies, and monitoring our progress. `
    )
    
    return (
        <>
        <div id="section12_1" ref={section12_1Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        12.1 Emissions
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

export default Section2