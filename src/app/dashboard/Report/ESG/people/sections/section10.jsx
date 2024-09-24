'use client'
import { useState, useRef, useEffect } from "react";


const Section10=({section13_2_3Ref})=>{
    const [content,setContent] = useState(
        `We are committed to eradicating forced or compulsory labor from our operations and supply chain. We conduct regular audits and assessments to ensure compliance with our labor standards. `
    )
    
    return (
        <>
        <div id="section13_2_3" ref={section13_2_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.2.3 Forced or Compulsory Labour
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px]  mb-2 font-semibold">
        Operations considered to have significant risk for incidents of forced or compulsary labor  
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Suppliers at significant risk for incidents of forced or compulsory labor 
            </p>
            

</div>
        </>
    )
}

export default Section10