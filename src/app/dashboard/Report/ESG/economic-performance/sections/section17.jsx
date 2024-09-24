'use client'
import { useState, useRef, useEffect } from "react";
import EconomicTable3 from "../tables/table3";

const Section17=({section11_5_2Ref})=>{
   
    return (
        <>
        <div id="section11_5_2" ref={section11_5_2Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.5.2. Operations Assessed for Risks Related to Anti-Corruption
</h3>

<div className="rounded-md shadow-md mb-4">
<EconomicTable3 />
</div>
       
        </div>
        </>
    )
}

export default Section17