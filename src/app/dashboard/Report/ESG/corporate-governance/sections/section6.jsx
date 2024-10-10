'use client'
import { useState, useRef, useEffect } from "react";



const Section6=({section9_2_4Ref,data})=>{
    
    return (
        <>
        <div id="section9_2_4" ref={section9_2_4Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        9.2.4 Management of Material topic
            </h3>
            <p className="text-sm mb-4">{data["3_c_d_e_in_material_topics"]?data["3_c_d_e_in_material_topics"]:"No data available"}</p>
        </div>
        </>
    )
}

export default Section6