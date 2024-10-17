'use client';
import { useState, useRef, useEffect } from "react";

const ReductionTable = ({ columns, data,consumption,total1,unit1,total2,unit2 }) => {
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
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="border-t border-r border-b border-gray-200 p-4 text-left">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
            {consumption?(
                    <tr className="text-[13px]">
                    {/* The 'consumption' should span exactly 2 columns and text should not wrap */}
                    <td
                      className="border-none p-4 text-left uppercase text-[#18b8f8] whitespace-nowrap"
                      colSpan={columns.length>5?2:1}
                    >
                      {consumption}
                    </td>
                  
                     {/* Empty cells for the remaining columns, except the last four */}
      {columns.length > 5 &&
        columns.slice(0, columns.length - 6).map((_, colIndex) => (
          <td key={colIndex} className="border-none p-4 text-left"></td>
        ))}
                  
                    {/* The last two columns for 'total' and 'unit' */}
                    <td className="border-none p-4 text-left">{total1}</td>
                    <td className="border-none p-4 text-left">{unit1}</td>
                    <td className="border-none p-4 text-left">{total2}</td>
                    <td className="border-none p-4 text-left">{unit2}</td>
                  </tr>
                  
            ):(
                <div></div>
            )}
            
          </tbody>
        </table>
      </div>
    </>
  );
};



export default ReductionTable;




