'use client'
import { useState, useRef, useEffect } from "react";


const Section4=({section12_1_2Ref})=>{
    const [content,setContent] = useState(
        `Scope 1 emissions are direct greenhouse gas (GHG) emissions from our operations, such as fuel combustion on-site. We measure and report these emissions annually, striving to reduce them through process optimization and cleaner technologies. `
    )
    
    return (
        <>
       
        <div id="section12_1_2" ref={section12_1_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.2 Scope 1 GHG Emissions
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

export default Section4