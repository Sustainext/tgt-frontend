'use client';
import { useState, useRef, useEffect } from "react";

const CommunityTable2 = ({data}) => {
  // Table headers
  const col = [
    "Operations with significant actual and potential negative impacts on local communities",
    "Location of Operations",
    "Potential Negative Impacts of the Operation",
    "Actual Negative Impacts of the Operation",
  ];

  // Table data
  

  return (
    <div style={{ maxHeight: "450px", overflowY: "auto" }} className="mb-2">
      <table className="w-full border border-gray-300 rounded-md overflow-hidden">
        <thead className="gradient-background border border-gray-600">
          <tr className="text-[12px] border border-gray-200">
            <th colSpan={4} className="p-4 text-start text-gray-500">
              Operations with significant actual and potential negative impacts
            </th>
          </tr>
          <tr>
            {col.map((item, idx) => (
              <th
                key={idx}
                style={{ minWidth: "120px", textAlign: "left" }}
                className={`text-[12px] border-r px-4 py-4 ${
                  idx === 0 ? "rounded-tl-md" : "" // Top-left corner
                } ${
                  idx === col.length - 1 ? "rounded-tr-md" : "" // Top-right corner
                } text-gray-500`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-gray-300">
          {data.length>0?data.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-[13px]">
              <td className="border-t border-r border-gray-200 p-4 text-start">
                {row.localcommunities}
              </td>
              <td className="border-t border-r border-gray-200 p-4 text-start">
                {row.locationofoperations}
              </td>
              <td className="border-t border-r border-gray-200 p-4 text-start">
                {row.potentialnegative}
              </td>
              <td className="border-t border-gray-200 p-4 text-start">
                {row.impactsoftheOperation}
              </td>
            </tr>
          )):(
            <tr className="text-[13px]">
            <td className="border-t border-r border-gray-200 p-4 text-start">
              No data available
            </td>
            <td className="border-t border-r border-gray-200 p-4 text-start">
            No data available
            </td>
            <td className="border-t border-r border-gray-200 p-4 text-start">
            No data available
            </td>
            <td className="border-t border-gray-200 p-4 text-start">
            No data available
            </td>
          </tr>
          )
        
        }
        </tbody>
      </table>
    </div>
  );
};

export default CommunityTable2;
