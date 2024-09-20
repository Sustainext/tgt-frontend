'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import HighestGovernanceTable from "../tables/highestGovernanceTable";


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section2=()=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        9.1 Board of Directors 
            </h3>
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.1.1 Governance structure and composition
            </h3>
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Describe the governance structure, including the committees of the highest governance body
            </p>
            <p className="text-sm mb-4">{content}</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Committees of the highest governance body 
            </p>
            <p className="text-sm mb-4">{content}</p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Composition of the highest governance body
            </p>
            
            {/* <div  className="mb-4 shadow-md rounded-md">
                <HighestGovernanceTable/>   
            </div> */}
        </div>
        </>
    )
}

export default Section2