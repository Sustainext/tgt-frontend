'use client'
import { useState, useRef, useEffect } from "react";
import MaterialityTable2 from "../tables/table2";



const Section5=({section8_1_4Ref,data})=>{
    const col=[
        "Material Topic",
        "Impact Type",
        "Impact Overview"
    ]
   
    return (
        <>
        <div id="section8_1_4" ref={section8_1_4Ref}>
        <p className="text-[17px] text-[#344054] mb-4 font-semibold">
        8.1.4 Management of material topic
            </p>
            <div className="shadow-md rounded-md mb-6">
        <MaterialityTable2 col={col} value={data["3-3a"]?data["3-3a"]:[]}/>
        </div>
            <p className="text-sm mb-4">{data["3-3b"]?data["3-3b"]:'No data available'}</p>
            
        </div>
        </>
    )
}

export default Section5