'use client';
import { useState } from "react";

const PerformanceReviewTable = ({columns,data}) => {
  

  return (
    <div>
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
              <th
                style={{ minWidth: "200px", textAlign: "left" }}
                className="text-[12px] border-r px-4 py-4 text-gray-500"
              >
                Type of Employees
              </th>
              <th colSpan="2" style={{ textAlign: "center" }} className="text-[12px] border-r px-4 py-4 text-gray-500 border-b">
                Employee Category
              </th>
              <th colSpan="3" style={{ textAlign: "center" }} className="text-[12px] border-r px-4 py-4 text-gray-500 border-b">
                Gender
              </th>
            </tr>
            <tr>
              <th></th>
              <th style={{ minWidth: "120px", textAlign: "left" }} className="text-[12px] border-r px-4 py-4 text-gray-500 border-l">A</th>
              <th style={{ minWidth: "120px", textAlign: "left" }} className="text-[12px] border-r px-4 py-4 text-gray-500">B</th>
              <th style={{ minWidth: "120px", textAlign: "left" }} className="text-[12px] border-r px-4 py-4 text-gray-500">Male</th>
              <th style={{ minWidth: "120px", textAlign: "left" }} className="text-[12px] border-r px-4 py-4 text-gray-500">Female</th>
              <th style={{ minWidth: "120px", textAlign: "left" }} className="text-[12px] border-r px-4 py-4 text-gray-500">Non-Binary</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-[13px]">
                <td className="border-t border-r border-gray-200 p-4 text-left">{row["Type of Employees"]}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row.A}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row.B}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row.Male}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row.Female}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row["Non-Binary"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceReviewTable;
