'use client';
import { useState, useRef, useEffect } from "react";

const EconomicTable3 = () => {
  // Table headers
  const col = [
    "Total number of operations assessed for risks related to corruption ",
    "Total number of operations",
    "Percentage of operations asssessed for risks related to corruption",
   
  ];

  // Table data
  const data = [
    {
    //   operation: "Operation 1",
      Operation: "data",
      TotalOperation: "data",
      Percentage: "data",
    },
    // {
    //   operation: "Operation 2",
    //   location: "data",
    //   potentialImpact: "data",
    //   actualImpact: "data",
    // },
  ];

  return (
    <div style={{ maxHeight: "450px", overflowY: "auto" }} className="mb-2">
      <table className="w-full border border-gray-300 rounded-md overflow-hidden">
        <thead className="gradient-background border border-gray-600">
          <tr className="text-[12px] border border-gray-200">
            <th colSpan={4} className="p-4 text-start text-gray-500">
            Operations assessed for risks related to corruption 
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-[11px]">
             
              <td className="border-t border-r border-gray-200 p-4 text-start">
                {row.Operation}
              </td>
              <td className="border-t border-r border-gray-200 p-4 text-start">
                {row.TotalOperation}
              </td>
              <td className="border-t border-gray-200 p-4 text-start">
                {row.Percentage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EconomicTable3;
