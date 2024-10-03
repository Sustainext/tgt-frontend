'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import HighestGovernanceTable from "../tables/highestGovernanceTable";
import NominationTable from "../tables/nominationTable";
;


const Section6=({section9_2_4Ref})=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div id="section9_2_4" ref={section9_2_4Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        9.2.4 Management of Material topic
            </h3>
            <p className="text-sm mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur atque aut corrupti repellendus cumque ipsam, minima earum aliquam sit consequatur id quas beatae itaque quasi tempora dolore quibusdam quidem corporis.</p>
        </div>
        </>
    )
}

export default Section6