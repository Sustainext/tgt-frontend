'use client';
import { useState, useRef, useEffect } from "react";

const BenefitsTable = ({columns,data}) => {
 

  return (
    <>
      <div 
       style={{
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "40vw",
        maxHeight:"450px"
      }}
      className="mb-2 rounded-md table-scrollbar"
      >
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="gradient-background">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ minWidth: "120px", textAlign: "left" }}
                  className={`text-[12px] border-r px-4 py-4 ${idx === 0 ? "rounded-tl-md" : ""} ${
                    idx === columns.length - 1 ? "rounded-tr-md" : ""} text-gray-500`}
                >
                  <div className="flex">
                    <p className="flex">{col}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-[13px]">
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Significant location of operation"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Life Insurance"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Health Care"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Disability & Invalidity Coverage"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Parental Leave"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Retirement Provision"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Stock Ownership"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BenefitsTable;
