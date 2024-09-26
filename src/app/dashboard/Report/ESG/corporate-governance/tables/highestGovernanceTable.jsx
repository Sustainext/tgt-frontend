'use client'
import { useState, useRef, useEffect } from "react";


const HighestGovernanceTable=()=>{

    const col=[
        "Name",
        "Executive power",
        "Independence",
        "Tenure on the governance body",
        "Number of significant positions",
        "Commitments held by member",
        "The nature of  commitments",
        "Gender",
        "Under-represented social groups",
        "Competencies relevant to the impacts of the organization",
        "Stakeholder representation "
    ]
    const values=[
        "Name",
        "Executive power",
        "Independence",
        "Tenure on the governance body",
        "Number of significant positions",
        "Commitments held by member",
        "The nature of  commitments",
        "Gender",
        "Under-represented social groups",
        "Competencies relevant to the impacts of the organization",
        "Stakeholder representation "
    ]
    return (
        <>
       <div 
        style={{
            display: "block",
            overflowX: "auto",
            maxWidth: "100%",
            minWidth: "100%",
            width: "40vw",
          }}
          className="mb-2"
       >
    <table className="w-full border border-gray-200 rounded-md">
        <thead className="gradient-background">
            <tr>
                {col.map((item, idx) => (
                    <th
                        key={idx}
                        style={{textAlign: "left"}}
                        className={`text-[12px] border-r px-4 py-4  ${
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
            <tr className="text-[13px]">
                {values.map((val)=>(
                     <td className="border border-gray-200 p-4 rounded-bl-md text-center">Data</td>
                ))}
                
                
            </tr>
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default HighestGovernanceTable