'use client'
import { useState, useRef, useEffect } from "react";


const ComplaintTable=({data})=>{

    const col=[
        "Number of substantiated complaints received concerning breaches of customer privacy",
        "Complaints received from outside parties and substantiated by the organization",
        "Complaints from regulatory bodies"
    ]
    return (
        <>
       <div style={{ maxHeight: "400px", overflowY: "auto" }} className="mb-2">
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        <thead className="gradient-background">
            <tr>
                {col.map((item, idx) => (
                    <th
                        key={idx}
                        style={{ textAlign: "left" }}
                        className={`text-[12px] border-r px-4 py-4 ${
                            idx === 0 ? 'rounded-tl-md' : '' // Top-left corner
                        } ${
                            idx === col.length - 1 ? 'rounded-tr-md' : '' // Top-right corner
                        } text-gray-500`}
                    >
                        <div className="flex">
                            <p className="flex">
                                {item}
                            </p>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data?.length>0?data.map((val)=>(
                <tr className="text-[13px]">
                <td className="border border-gray-200 p-4 rounded-bl-md text-left">{val.customerprivacy?val.customerprivacy:"No data available"}</td>
                <td className="border border-gray-200 p-4 rounded-bl-md text-left">{val.substantiatedorganization?val.substantiatedorganization:"No data available"}</td>
                <td className="border border-gray-200 p-4 rounded-bl-md text-left">{val.regulatorybodies?val.regulatorybodies:"No data available"}</td>
                </tr>
            )):(
                <tr className="text-[13px]">
                <td className="border border-gray-200 p-4 rounded-bl-md text-left">No data available</td>
                <td className="border border-gray-200 p-4 rounded-bl-md text-left">No data available</td>
                <td className="border border-gray-200 p-4 rounded-bl-md text-left">No data available</td>
                </tr>
            )}
            
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default ComplaintTable