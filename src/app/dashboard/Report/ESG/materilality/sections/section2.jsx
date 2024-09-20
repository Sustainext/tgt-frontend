'use client'
import { useState, useRef, useEffect } from "react";
import MaterialityTable from "../table";



const Section2=({section8_1_1Ref})=>{
    
    return (
        <>
        <div id="section8_1_1" ref={section8_1_1Ref}>
        <p className="text-[17px] text-[#344054] mb-4 font-semibold">
        8.1.1 List of material topics
            </p>
            <div className="shadow-md rounded-md mb-6">
        <MaterialityTable/>
        </div>
        </div>
        </>
    )
}

export default Section2