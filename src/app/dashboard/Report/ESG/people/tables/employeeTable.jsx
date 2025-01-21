'use client';
import { useState, useRef, useEffect } from "react";

const EmployeeInfoTable = ({columns,data}) => {
  

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
                  {row["Type of Employees"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Total no of employees"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Percentage of Male Employees"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Percentage of Female Employees"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Percentage of Non-Binary Employees"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Percentage of Employees < 30 years old"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Percentage of Employees 30-50 years old"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-left">
                  {row["Percentage of Employees > 50 years old"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeInfoTable;
