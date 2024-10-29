'use client';
import { useState, useRef, useEffect } from "react";

const CommunityTable = ({data}) => {
  const col = [
    "",
    "Percentage of operations implemented by engaging local communities",
  ];

  

  return (
    <>
      <div style={{ maxHeight: "450px", overflowY: "auto" }} className="mb-2 table-scrollbar">
        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
          <thead className="gradient-background">
          <tr className="text-[12px] border border-gray-200">
            <th colSpan={4} className="p-4 text-start text-gray-500">
            Percentage of operations implemented by engaging local communities
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
                  <div className="flex">
                    <p className="flex">{item}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length>0?data.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-[13px]">
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row[""]}
                </td>
                <td className="border border-gray-200 p-4 text-center">
                  {row["Percentage of operations implemented by engaging local communities"]>0?row["Percentage of operations implemented by engaging local communities"]:"N/A"}
                </td>
              </tr>
            )):(
              <tr className="text-[13px]">
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  No data available
                </td>
                <td className="border border-gray-200 p-4 text-center">
                No data available
                </td>
              </tr>
            )
            
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommunityTable;
