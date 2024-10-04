'use client';
import { useState, useRef, useEffect } from "react";

const EmployeeInfoTable = () => {
  const columns = [
    "Type of Employees",
    "Percentage of Male Employees",
    "Percentage of Female Employees",
    "Percentage of Non-Binary Employees",
    "Percentage of Employees < 30 years old",
    "Percentage of Employees 30-50 years old",
    "Percentage of Employees > 50 years old"
  ];

  const data = [
    {
      "Type of Employees": "Permanent Employees",
      "Percentage of Male Employees": "data",
      "Percentage of Female Employees": "data",
      "Percentage of Non-Binary Employees": "data",
      "Percentage of Employees < 30 years old": "data",
      "Percentage of Employees 30-50 years old": "data",
      "Percentage of Employees > 50 years old": "data",
    },
    {
      "Type of Employees": "Temporary Employees",
      "Percentage of Male Employees": "data",
      "Percentage of Female Employees": "data",
      "Percentage of Non-Binary Employees": "data",
      "Percentage of Employees < 30 years old": "data",
      "Percentage of Employees 30-50 years old": "data",
      "Percentage of Employees > 50 years old": "data",
    },
    {
      "Type of Employees": "Non-Guaranteed Hours Employees",
      "Percentage of Male Employees": "data",
      "Percentage of Female Employees": "data",
      "Percentage of Non-Binary Employees": "data",
      "Percentage of Employees < 30 years old": "data",
      "Percentage of Employees 30-50 years old": "data",
      "Percentage of Employees > 50 years old": "data",
    },
    {
      "Type of Employees": "Full-Time Employees",
      "Percentage of Male Employees": "data",
      "Percentage of Female Employees": "data",
      "Percentage of Non-Binary Employees": "data",
      "Percentage of Employees < 30 years old": "data",
      "Percentage of Employees 30-50 years old": "data",
      "Percentage of Employees > 50 years old": "data",
    },
    {
      "Type of Employees": "Part-Time Employees",
      "Percentage of Male Employees": "data",
      "Percentage of Female Employees": "data",
      "Percentage of Non-Binary Employees": "data",
      "Percentage of Employees < 30 years old": "data",
      "Percentage of Employees 30-50 years old": "data",
      "Percentage of Employees > 50 years old": "data",
    },
   
  ];

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
