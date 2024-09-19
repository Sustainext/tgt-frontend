'use client'
import { useState, useRef, useEffect } from "react";
import Section1 from "./section1/page"



const Companyoperations=()=>{
    return (
        <>
        <div className="mx-2 p-2">
        
            <div className="flex gap-4">
            <div className="w-[80%]">
         <Section1/>
            </div>
            {/* page sidebar */}
            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky w-[20%] mt-2">
                <p className="text-[11px] text-[#727272] mb-2">
                About the company 
                and operations
                </p>
                <p className="text-[12px] text-blue-400 mb-2">
                2.1  Business Model and Impact 
                </p>
                <p className="text-[12px] text-[#495059] mb-2 ml-2">
                2.1.1 Activities, Value Chain, and Other Business Relationships
                </p>
                <p className="text-[12px] text-[#495059] mb-2 ml-2">
                2.1.2 Entities Included in the Organization's Sustainability Reporting
                </p>
                <p className="text-[12px] text-blue-400 mb-2">
                2.2 Supply Chain
                </p>
            </div>
            </div>
           
           
        </div>
        </>
    )
}

export default Companyoperations