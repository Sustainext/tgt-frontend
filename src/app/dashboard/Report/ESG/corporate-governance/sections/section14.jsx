'use client'
import { useState, useRef, useEffect } from "react";
import RatioTable from "../tables/ratioTable";

const Section14=()=>{
    const [content,setContent] = useState(
        `Our remuneration policies are designed to attract, retain, and motivate high-caliber Board members and executives. Compensation is based on industry benchmarks, individual performance, and the achievement of strategic objectives`
    )
    return (
        <>
        <div>
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.8 Annual Compensation Ratio
            </h3>
            <p className="text-[15px] text-[#344054] mb-2">
            Ratio of annual total compensation & ratio of percentage increase in annual total compensation 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <RatioTable/>
            </div>
            
        
        </div>
        </>
    )
}

export default Section14