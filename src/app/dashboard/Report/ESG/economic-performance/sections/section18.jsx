'use client'
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Section18=({section11_5_3Ref})=>{
    const data = useSelector((state) => state.screen11Slice.getdata);
    return (
        <>
        <div id="section11_5_3" ref={section11_5_3Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.5.3. Incidents of Anti-Corruption
</h3>
{data["205_3a"]?.map((item, index) => (
          <div key={`205_3a_${index}`} className="mb-4">
            <p className="text-[12px] mb-2">{item.Q1 || "No data available"}</p>
            <p className="text-[12px] mb-2">{item.Q2 || "No data available"}</p>
            <p className="text-[12px] mb-2">{item.Q4 || "No data available"}</p>
        
          </div>
        ))}
       {data["205_3b"]?.map((item, index) => (
          <div key={`205_3b_${index}`} className="mb-4">
            <p className="text-[12px] mb-2">{item.Q1 || "No data available"}</p>
    
        
          </div>
        ))}
          {data["205_3c"]?.map((item, index) => (
          <div key={`205_3c_${index}`} className="mb-4">
            <p className="text-[12px] mb-2">{item.Q1 || "No data available"}</p>
    
        
          </div>
        ))}
        </div>
        </>
    )
}

export default Section18