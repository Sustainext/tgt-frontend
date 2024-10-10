'use client'
import { useState, useRef, useEffect } from "react";


const HighestGovernanceTable=({tableData})=>{

    const data=tableData["2_9_c"]?[tableData["2_9_c"]]:[]
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
        "name",
        "executivePower",
        "independence",
        "tenure",
        "significantPositions",
        "commitmentsHeld",
        "natureOfCommitments",
        "gender",
        "underRepresentedGroups",
        "competencies",
        "stakeholderRepresentation"
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
          className="mb-2 table-scrollbar"
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
            
            {data.length>0?
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-[13px]">
                <td className="border border-gray-200 p-4 text-center">{row.name}</td>
                <td className="border border-gray-200 p-4 text-center">{row.executivePower}</td>
                <td className="border border-gray-200 p-4 text-center">{row.independence}</td>
                <td className="border border-gray-200 p-4 text-center">{row.tenure}</td>
                <td className="border border-gray-200 p-4 text-center">{row.significantPositions}</td>
                <td className="border border-gray-200 p-4 text-center">{row.commitmentsHeld}</td>
                <td className="border border-gray-200 p-4 text-center">{row.natureOfCommitments}</td>
                <td className="border border-gray-200 p-4 text-center">{row.gender}</td>
                <td className="border border-gray-200 p-4 text-center">{row.underRepresentedGroups}</td>
                <td className="border border-gray-200 p-4 text-center">{row.competencies}</td>
                <td className="border border-gray-200 p-4 text-center">{row.stakeholderRepresentation}</td>
              </tr>
            )):(
                <tr className="text-[13px]">
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
                <td className="border border-gray-200 p-4 text-center">No data available</td>
              </tr>
            )}
                
                
           
           
        </tbody>
    </table>
</div>

        </>
    )
}
export default HighestGovernanceTable