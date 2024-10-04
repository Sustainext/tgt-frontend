'use client'
import { useState, useRef, useEffect } from "react";
import HighestGovernanceTable from "../tables/highestGovernanceTable";



const Section2=({section9_1Ref,section9_1_1Ref})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_1" ref={section9_1Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        9.1 Board of Directors 
            </h3>
            
        </div>
        <div id="section9_1_1" ref={section9_1_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.1.1 Governance structure and composition
            </h3>
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Describe the governance structure, including the committees of the highest governance body
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse accusamus, dolorem iure illum vero quos et, voluptatibus ipsa officia laudantium necessitatibus omnis fuga? Magni expedita beatae molestiae reiciendis distinctio illo.</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Committees of the highest governance body 
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse accusamus, dolorem iure illum vero quos et, voluptatibus ipsa officia laudantium necessitatibus omnis fuga? Magni expedita beatae molestiae reiciendis distinctio illo.</p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Composition of the highest governance body
            </p>
            
            <div  className="mb-4 shadow-md rounded-md">
                <HighestGovernanceTable/>   
            </div>
        </div>
        </>
    )
}

export default Section2