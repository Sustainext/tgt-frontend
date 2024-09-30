'use client'
import { useState, useRef, useEffect } from "react";


const NominationTable=()=>{

    const col=[
        "Criteria",
        "Whether taken into consideration?",
        "How?",
    ]
    const rowLabels=[
        "Views of stakeholders (including shareholders)",
        "Diversity",
        "Independence",
        "Competencies relevant to the impacts of the Organization "
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
                        style={{ minWidth: "120px", textAlign: "left" }}
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
        {rowLabels.map((label, rowIndex) => (
                        <tr key={rowIndex} className="text-[13px]">
                            <td className="border-t border-r border-gray-200 p-4 text-left">
                                {label}

                            </td>
                            <td className="border-t border-r border-gray-200 p-4 text-left">
                                Data
                            </td>
                            <td className="border-t border-r border-gray-200 p-4 text-left">
                                Data

                            </td>
                        </tr>
                    ))}
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default NominationTable