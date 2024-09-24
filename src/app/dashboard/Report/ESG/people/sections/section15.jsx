'use client'
import { useState, useRef, useEffect } from "react";


const Section15=({section13_4_3Ref})=>{
    const [content,setContent] = useState(
        `We ensure equitable remuneration practices across our organization. Our compensation policies are designed to eliminate pay disparities and promote fairness. `
    )
    
    return (
        <>
        <div id="section13_4_3" ref={section13_4_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.4.3 Remuneration
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px]  mb-2 font-semibold">
        Ratio of basic salary of women to men   
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Ratio of remuneration of women to men
            </p>
            

</div>
        </>
    )
}

export default Section15