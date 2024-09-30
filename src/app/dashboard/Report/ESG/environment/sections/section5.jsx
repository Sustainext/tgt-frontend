'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";

const Section5=({section12_1_3Ref})=>{
    const [content,setContent] = useState(
        `Scope 2 emissions are indirect GHG emissions from the consumption of purchased electricity, heat, or steam. We aim to reduce Scope 2 emissions by increasing our use of renewable energy and improving energy efficiency. `
    )

    
    return (
        <>
       
        <div id="section12_1_3" ref={section12_1_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.3 Scope 2 GHG Emissions
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
            Scope 2
            </p>
           
</div>
        </>
    )
}

export default Section5