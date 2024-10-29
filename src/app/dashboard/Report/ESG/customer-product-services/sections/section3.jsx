'use client'
import { useState, useRef, useEffect } from "react";


const Section3=({section15_1_2Ref,data})=>{
    
    return (
        <>
        <div id="setion15_1_2" ref={section15_1_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        15.1.2 Health and Safety Impacts of Product and Service Categories
        </h3>
        {data["416_1a"]?data["416_1a"].length>0?data["416_1a"][0].Q1?data["416_1a"][0].Q1=="No"?(
            <div>
                <p className="text-sm mb-4">No</p>
            </div>
        ):(
            <div>
                <p className="text-[15px] mb-2 font-semibold">
        Number of product and service categories
       </p>
            <p className="text-sm mb-4">{data["416_1a"][0].Q2?data["416_1a"][0].Q2:"No data available"}</p>
            <p className="text-[15px] mb-2 font-semibold">
            Number of product and service categories for which health and safety impacts are assessed for improvement.
            </p>
            <p className="text-sm mb-4">{data["416_1a"][0].Q3?data["416_1a"][0].Q3:"No data available"}</p>
            </div>
        ):<p className="text-sm mb-4">No data available</p>:<p className="text-sm mb-4">No data available</p>:<p className="text-sm mb-4">No data available</p>}
        
        </div>
        </>
    )
}

export default Section3