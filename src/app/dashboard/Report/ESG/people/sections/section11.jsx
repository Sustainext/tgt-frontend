'use client'
import { useState, useRef, useEffect } from "react";


const Section11=({section13_3Ref})=>{
    const [content,setContent] = useState(
        `We have strict policies and procedures in place to prevent child labor. Any incidents are thoroughly investigated, and corrective actions are implemented to prevent recurrence. `
    )
    
    return (
        <>
        <div id="section13_3" ref={section13_3Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
13.3 Incidents of Child Labour
</h3>
<p className="text-[15px]  mb-2 font-semibold">
        Operations at significant risk for incidents of young workers exposed to hazardous work 
            </p>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

        
            <p className="text-[15px]  mb-2 font-semibold">
            Operations considered to have significant risk of child labor
            </p>

            <p className="text-[15px]  mb-2 font-semibold">
            Suppliers at significant risk for incidents of child labor
            </p>

            <p className="text-[15px]  mb-2 font-semibold">
            Suppliers at significant risk for incidents of young workers exposed to hazardous work 
            </p>
            

</div>
        </>
    )
}

export default Section11