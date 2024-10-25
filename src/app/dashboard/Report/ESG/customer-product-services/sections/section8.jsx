'use client'
import { useState, useRef, useEffect } from "react";
import ComplaintTable from "../table2"

const Section8=({section15_3Ref,data})=>{
   
    const tableData=data["418_1a_analyse"]?data['418_1a_analyse'].customer_privacy_data?data["418_1a_analyse"].customer_privacy_data:[]:[]
    return (
        <>
        <div id="setion15_3" ref={section15_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        15.3 Customers
        </h3>
        <p className="text-[15px] mb-2 font-semibold">
        Number of identified leaks, thefts, or losses of customer data: 
       </p>
            <p className="text-sm mb-4">{data["418_1b"]?data["418_1b"].length>0?data["418_1b"][0].Q1?data["418_1b"][0].Q1:"No data available":"No data available":"No data available"}</p>
            <p className="text-[15px] mb-2 font-semibold">
            Statement of fact
            </p>
            <p className="text-sm mb-4">{data["418_1c"]?data["418_1c"].length>0?data["418_1c"][0].Q1?data["418_1c"][0].Q1:"No data available":"No data available":"No data available"}</p>

<p className="text-[15px] mb-2 font-semibold">Total number of substantiated complaints received concerning breaches of customer privacy</p>
        <div className="rounded-md mb-4 shadow-md">
            <ComplaintTable data={tableData}/>
        </div>
           
           
        </div>
        </>
    )
}

export default Section8