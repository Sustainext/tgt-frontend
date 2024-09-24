'use client'
import { useState, useRef, useEffect } from "react";


const Section4=({section15_1_3Ref})=>{
    
    return (
        <>
        <div id="setion15_1_3" ref={section15_1_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        15.1.3 Incidents of Non-Compliance
        </h3>
        <p className="text-[15px] text-[#344054] mb-2">
        Maintaining compliance with regulatory standards and internal policies is critical to our operations. We have robust systems in place to monitor, report, and address any incidents of non-compliance. 
        </p>
        <p className="text-[15px] mb-2 font-semibold">
        Total number of Incidents of non-compliance with regulations resulting in a fine or penalty
       </p>
            <p className="text-sm mb-4">100</p>
            <p className="text-[15px] mb-2 font-semibold">
            Total number of Incidents of non-compliance with regulations resulting in a warning
            </p>
            <p className="text-sm mb-4">100</p>


            <p className="text-[15px] mb-2 font-semibold">
            Total number of Incidents of non-compliance with voluntary codes
            </p>
            <p className="text-sm mb-4">100</p>
        </div>
        </>
    )
}

export default Section4