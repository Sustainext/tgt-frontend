'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import HighestGovernanceTable from "../tables/highestGovernanceTable";
import NominationTable from "../tables/nominationTable";


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section3=({section9_2Ref,section9_2_1Ref})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_2" ref={section9_2Ref} >
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        9.2 General Governance
            </h3>
           
        </div>
        <div id="section9_2_1" ref={section9_2_1Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.2.1 Nomination, Selection of the Highest Governance Body
            </h3>
            <p className="text-sm mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti a ut possimus sit, eius in ea atque, sint dicta delectus incidunt cumque fuga quod repellat obcaecati laborum debitis quo rerum!</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Criteria considered for nomination and selection of the highest governance body 
            </p>
            <div  className="mb-4 shadow-md rounded-md">
                <NominationTable/>
            </div>
        </div>
        </>
    )
}

export default Section3