'use client'
import { useState, useRef, useEffect } from "react";
import BenefitsTable from "../tables/benifitsTable";

const Section4=({section13_1_3Ref})=>{
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
    )
    
    return (
        <>
        <div id="section13_1_3" ref={section13_1_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.1.3 Employee Benefits and Health Services
</h3>

        <p className="text-[15px]  mb-2 font-semibold">
        Benefits provided to full-time employees by location
            </p>
            <div className="shadow-md rounded-md mb-4">
                <BenefitsTable/>
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Benefits provided to part-time employees by location 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <BenefitsTable/>
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Benefits provided to temporary employees by location 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <BenefitsTable/>
            </div>

</div>
        </>
    )
}

export default Section4