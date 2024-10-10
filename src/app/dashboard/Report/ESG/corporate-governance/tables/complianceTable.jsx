'use client'
import { useState, useRef, useEffect } from "react";


const ComplianceTable=({rowLabels,tableData})=>{

   
    return (
        <>
       <div style={{ maxHeight: "400px", overflowY: "auto" }} className="mb-2">
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        
        <tbody>
        {rowLabels.map((label, rowIndex) => (
            <tr key={rowIndex} className="text-[13px]">
                <td className="border-t border-r border-gray-200 p-4 text-left">
                    {label}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-center">
                    {tableData?tableData[rowIndex]:"No data available"} {/* Corresponding value from data */}
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