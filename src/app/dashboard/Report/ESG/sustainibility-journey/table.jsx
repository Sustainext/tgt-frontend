'use client'
import { useState, useRef, useEffect } from "react";


const SustainabilityJourneyTable=()=>{

    const col=[
        "Suppliers",
        "Location of Supplier",
        "Significant actual and potential negative social impacts.",
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
                        style={{ minWidth: "120px", textAlign: "center" }}
                        className={`text-[12px] border-r px-4 py-4 ${
                            idx === 0 ? 'rounded-tl-md' : '' // Top-left corner
                        } ${
                            idx === col.length - 1 ? 'rounded-tr-md' : '' // Top-right corner
                        } text-gray-500`}
                    >
                        <div className="flex justify-center items-center">
                            <p className="flex items-center">
                                {item}
                            </p>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="border-t border-r border-gray-200 p-4 text-center text-sm">Data</td>
                <td className="border border-gray-200 p-4 rounded-bl-md text-center text-sm">Data</td>
                <td className="border border-gray-200 p-4 rounded-br-md text-center text-sm">Data</td>
                {/* Ensure all cells have border applied */}
            </tr>
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default SustainabilityJourneyTable