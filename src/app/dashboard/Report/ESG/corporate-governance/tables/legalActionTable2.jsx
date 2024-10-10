'use client';
import { useState, useRef, useEffect } from "react";

const LegalActionTable2 = ({tabledata}) => {
  // Table headers
  const col = [
    "Completed Legal Action",
    "Status",
    "Decision or judgement",
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
          {tabledata.length>0?
           tabledata.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-[13px]">
              <td className="border-t border-r border-gray-200 p-4 text-left">
                {row.CompletedLegalAction?row.CompletedLegalAction:"No data available"}
              </td>
              <td className="border-t border-r border-gray-200 p-4 text-left">
                {row.Status?row.Status:"No data available"}
              </td>
              <td className="border-t border-gray-200 p-4 text-left">
                {row.Decisionorjudgement?row.Decisionorjudgement:"No data available"}
              </td>
            </tr>
          )):(
            <tr className="text-[13px]">
            <td className="border-t border-r border-gray-200 p-4 text-left">
              {"No data available"}
            </td>
            <td className="border-t border-r border-gray-200 p-4 text-left">
              {"No data available"}
            </td>
            <td className="border-t border-gray-200 p-4 text-left">
              {"No data available"}
            </td>
          </tr>
          )
        
        }
        </tbody>
      </table>
    </div>
  );
};

export default LegalActionTable2;
