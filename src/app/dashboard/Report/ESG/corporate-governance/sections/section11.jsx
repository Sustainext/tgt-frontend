'use client'
import { useState, useRef, useEffect } from "react";

const Section11=({section9_3_5Ref,data})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_3_5" ref={section9_3_5Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.5 Communication of Critical Concerns
            </h3>
            <textarea
          value={data["2_16_a"]?data["2_16_a"].critical_concerns_communication_description:"No data available"}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none mt-2 focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        <p className="text-[15px] text-[#344054] mb-2 text-left font-semibold">
        Total number of critical concerns that were communicated to the highest governance body :
            </p>
<p className="text-sm mb-4">{data["2_16_b"]?data["2_16_b"].total_critical_concerns_reported:"No data available"}</p>
            <p className="text-[15px] text-[#344054] mb-2 text-left font-semibold">
            Nature of the critical concerns that were communicated to the highest governance body:
            </p>
            <p className="text-sm mb-4">{data["2_16_b"]?data["2_16_b"].nature_of_critical_concerns_reported:"No data available"}</p>
        </div>
        </>
    )
}

export default Section11