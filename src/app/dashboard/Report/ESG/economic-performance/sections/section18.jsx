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
{data["205_3a_anti_corruption"]?.length>0?data["205_3a_anti_corruption"].map((item, index) => (
          <div key={`205_3a_anti_corruption${index}`} className="mb-4">
            <p className="text-[12px] mb-2">{item.Q1 || "No data available"}</p>
            <p className="text-[12px] mb-2">{item.Q2 || "No data available"}</p>
         
        
          </div>
        )):(
          <p className="text-sm mb-2">No data available</p>
        )
      
      }
       {data["205_3b_anti_corruption"]?.length>0?data["205_3b_anti_corruption"].map((item, index) => (
          <div key={`205_3b_anti_corruption${index}`} className="mb-4">
            <p className="text-[12px] mb-2">{item.Q1 || "No data available"}</p>
    
        
          </div>
        )):(
          <p className="text-sm mb-2">No data available</p>
        )
        
        
        }


          {data["205_3c_anti_corruption"]?.length>0?data["205_3c_anti_corruption"].map((item, index) => (
          <div key={`205_3c_anti_corruption${index}`} className="mb-4">
            <p className="text-[12px] mb-2">{item.Q1 || "No data available"}</p>
    
        
          </div>
        ))
        :(
          <p className="text-sm mb-2">No data available</p>
        )
        }


{data["205_3d_anti_corruption"]?.length>0?data["205_3d_anti_corruption"].map((item, index) => (
          <div key={`financial_implications_${index}`} className="mb-4">
            <p className="text-sm mb-2">{item.Q1 || "No data available"}</p>
            
            {/* Only show Q2 if Q1 is not 'Yes' and Q2 has a value */}
            {item.Q1 == "Yes" && item.Q2 && <p className="text-sm mb-2">{item.Q2}</p>}

            <p className="text-sm mb-2">{item.Q3 || "No data available"}</p>
          </div>
        ))
        :(
          <p className="text-sm mb-2">No data available</p>
        )
      }
        </div>
        </>
    )
}

export default Section18