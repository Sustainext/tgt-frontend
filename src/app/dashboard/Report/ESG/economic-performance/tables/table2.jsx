'use client'
import { useState, useRef, useEffect } from "react";


const Table2=({col,values})=>{

    
    return (
        <>
       <div style={{ overflowX: "auto" }} className="mb-2">
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        <thead className="gradient-background">
            <tr>
                {col.map((item, idx) => (
                    <th
                        key={idx}
                        style={{textAlign: "left" }}
                        className={`text-[12px] border-r px-3.5 py-3.5  ${
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
                {values.map((val)=>(
                     <td className="border border-gray-200 p-4 rounded-bl-md text-left text-sm">{val}</td>
                ))}
                
                
            </tr>
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default Table2