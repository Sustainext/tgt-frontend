'use client'
import { useState, useRef, useEffect } from "react";

const Section10=()=>{
    const [content,setContent] = useState(
        `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
    )
    return (
        <>
        <div>
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.4 Role of the highest governance body in sustainability reporting
            </h3>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Description of  how the highest governance body delegates responsibility for managing 
            the organization's impacts on economy, environment and people:
            </p>
            <p className="text-sm mb-4">{content}</p>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Senior executives with responsibility for the management of impacts:
            </p>
            <p className="text-sm mb-4">{content}</p>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Delegated responsibility for the management of impacts to other employees:
            </p>
            <p className="text-sm mb-4">{content}</p>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Description of  the process and frequency for senior executives or other employees to report back 
to the highest governance body on the management of the organization's impacts on the 
economy, environment and people:
            </p>
            <p className="text-sm mb-4">{content}</p>
        
        </div>
        </>
    )
}

export default Section10