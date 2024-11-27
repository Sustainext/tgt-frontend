'use client'
import { useState, useRef, useEffect } from "react";



const Section6=({section9_2_4Ref,data})=>{
    
    return (
        <>
        <div id="section9_2_4" ref={section9_2_4Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        9.2.4 Management of Material topic
            </h3>
            {data["3_c_d_e_in_material_topics"] && data["3_c_d_e_in_material_topics"].length > 0 ? (
    data["3_c_d_e_in_material_topics"].map((val, index) => (
        <div key={index}>
            <p className="text-sm mb-2">{val.GRI33cd ? val.GRI33cd : 'No data available'}</p>
            <p className="text-sm mb-4">{val.GRI33e ? val.GRI33e : 'No data available'}</p>
        </div>
    ))
) : (
    <p className="text-sm mb-4">No data available</p>
)}

        </div>
        </>
    )
}

export default Section6