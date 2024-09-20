'use client'
import { useState, useRef, useEffect } from "react";
import ConflictTable from "../tables/conflictTable";

const Section25=()=>{
    const [content,setContent] = useState(
        `We have a comprehensive conflict of interest policy to ensure that all potential conflicts are disclosed and managed appropriately. Board members and employees are required to avoid situations that could result in a conflict between personal interests and the interests of the company.`
    )
    return (
        <>
        <div>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        9.7 Conflict of Interest
            </h3>

            <p className="text-sm mb-4">{content}</p>
            <div className="shadow-md rounded-md mb-4">
                <ConflictTable/>
            </div>
        
        </div>
        </>
    )
}

export default Section25