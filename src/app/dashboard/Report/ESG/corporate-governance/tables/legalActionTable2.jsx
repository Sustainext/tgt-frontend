'use client';
import { useState, useRef, useEffect } from "react";

const LegalActionTable2 = () => {
  // Table headers
  const col = [
    "Completed Legal Action",
    "Status",
    "Decision or judgement",
  ];

  // Table data
  const data = [
    {
    //   operation: "Operation 1",
      location: "data",
      potentialImpact: "data",
      actualImpact: "data",
    },
    {
    //   operation: "Operation 2",
      location: "data",
      potentialImpact: "data",
      actualImpact: "data",
    },
  ];

  return (
    <div style={{ maxHeight: "450px", overflowY: "auto" }} className="mb-2">
      <table className="w-full border border-gray-300 rounded-md overflow-hidden">
        <thead className="gradient-background border border-gray-600">
          <tr className="text-[12px] border border-gray-200">
            <th colSpan={4} className="p-4 text-start text-gray-500">
            Main outcomes of completed legal actions, including any decisions or judgements 
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
            <tr key={rowIndex} className="text-[13px]">
              <td className="border-t border-r border-gray-200 p-4 text-left">
                {row.location}
              </td>
              <td className="border-t border-r border-gray-200 p-4 text-left">
                {row.potentialImpact}
              </td>
              <td className="border-t border-gray-200 p-4 text-left">
                {row.actualImpact}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LegalActionTable2;
