'use client'
import { useState, useRef, useEffect } from "react";


const Section14=({section13_4_2Ref})=>{
    const [content,setContent] = useState(
        `We believe in the power of diversity and strive to create an inclusive workplace. Our commitment to diversity is reflected in the composition of our governance bodies and workforce. `
    )
    
    return (
        <>
        <div id="section13_4_2" ref={section13_4_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.4.2 Diversity of Governance Bodies and Employees
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
<p className="text-[15px]  mb-2 font-semibold">Governance Bodies</p>
        <p className="text-[15px]  mb-2 font-semibold">
        Percentage of individuals within the organization’s governance bodies by diversity categories. 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Percentage of Employees per employee category 
            </p>
            

</div>
        </>
    )
}

export default Section14