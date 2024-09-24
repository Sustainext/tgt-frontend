'use client'
import { useState, useRef, useEffect } from "react";


const ConflictTable=()=>{

    const rowLabels=[
        "Legal action(s) pending",
        "Legal action(s) completed",
    ]
    return (
        <>
       <div style={{ maxHeight: "400px", overflowY: "auto" }} className="mb-2">
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        <thead className="gradient-background">
        <tr className="text-[12px] border border-gray-200">
            <th colSpan={4} className="p-4 text-start text-gray-500">
            Number of legal actions pending or completed during the reporting period regarding anti-competitive behavior.
            </th>
          </tr>
            
        </thead>
        <tbody>
        {rowLabels.map((label, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border-t border-r border-gray-200 p-4 text-left">
                                {label}

                            </td>
                            <td className="border-t border-r border-gray-200 p-4 text-center">
                               Yes
                            </td>
                            
                        </tr>
                    ))}
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default ConflictTable