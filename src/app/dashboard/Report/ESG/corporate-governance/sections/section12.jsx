'use client'
import { useState, useRef, useEffect } from "react";

const Section12=({section9_3_6Ref,data})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_3_6" ref={section9_3_6Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.6 Evaluation of the Performance of the Highest Governance Body
            </h3>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Processes for evaluating the performance of the highest governance body: 
            </p>
            <textarea
          value={data["2_18_a"]?data["2_18_a"].Q1:"No data available"}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none mt-2 focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        Frequency of the evaluations:
            </p>
<p className="text-sm mb-4">{data["2_18_b"]?data["2_18_b"].evaluation_frequency:"No data available"}</p>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Actions taken in response to the evaluations:
            </p>
            <p className="text-sm mb-4">{data["2_18_c"]?data["2_18_c"]:"No data available"}</p>
        
        </div>
        </>
    )
}

export default Section12