'use client'
import { useState, useRef, useEffect } from "react";


const CustomerTable=()=>{

    const col=[
        "Organization/Corporation",
        "Percentage of significant product or service categories covered by and assessed for compliance with such procedures."
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
            <td className="border border-gray-200 p-4 rounded-bl-md text-center">Data</td>
            <td className="border border-gray-200 p-4 rounded-bl-md text-center">Data</td>
            </tr>
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default CustomerTable