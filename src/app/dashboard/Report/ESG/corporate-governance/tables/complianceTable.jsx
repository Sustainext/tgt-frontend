'use client'
import { useState, useRef, useEffect } from "react";


const ComplianceTable=({rowLabels})=>{

   
    return (
        <>
       <div style={{ maxHeight: "400px", overflowY: "auto" }} className="mb-2">
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        {/* <thead className="gradient-background">
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
        </thead> */}
        <tbody>
        {rowLabels.map((label, rowIndex) => (
                        <tr key={rowIndex} className="text-[13px]">
                            <td className="border-t border-r border-gray-200 p-4 text-left">
                                {label}

                            </td>
                            <td className="border-t border-r border-gray-200 p-4 text-center">
                                23
                            </td>
                        </tr>
                    ))}
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default ComplianceTable