'use client';
import { useState, useRef, useEffect } from "react";

const BenefitsTable = () => {
  const columns = [
    "Significant location of operation",
    "Life Insurance",
    "Health Care",
    "Disability & Invalidity Coverage",
    "Parental Leave",
    "Retirement Provision",
    "Stock Ownership"
  ];

  const data = [
    {
      "Significant location of operation": "Location A",
      "Life Insurance": "",
      "Health Care": "",
      "Disability & Invalidity Coverage": "",
      "Parental Leave": "",
      "Retirement Provision": "",
      "Stock Ownership": ""
    },
    {
      "Significant location of operation": "Location B",
      "Life Insurance": "",
      "Health Care": "",
      "Disability & Invalidity Coverage": "",
      "Parental Leave": "",
      "Retirement Provision": "",
      "Stock Ownership": ""
    },
    {
      "Significant location of operation": "Location C",
      "Life Insurance": "",
      "Health Care": "",
      "Disability & Invalidity Coverage": "",
      "Parental Leave": "",
      "Retirement Provision": "",
      "Stock Ownership": ""
    }
  ];

  return (
    <>
      <div style={{ maxHeight: "450px", overflowY: "auto" }} className="mb-2">
        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
          <thead className="gradient-background">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ minWidth: "120px", textAlign: "center" }}
                  className={`text-[12px] border-r px-4 py-4 ${idx === 0 ? "rounded-tl-md" : ""} ${
                    idx === columns.length - 1 ? "rounded-tr-md" : ""} text-gray-500`}
                >
                  <div className="flex justify-center items-center">
                    <p className="flex items-center">{col}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-[11px]">
                <td className="border-t border-r border-gray-200 p-4 text-center">
                  {row["Significant location of operation"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-center">
                  {row["Life Insurance"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-center">
                  {row["Health Care"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-center">
                  {row["Disability & Invalidity Coverage"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-center">
                  {row["Parental Leave"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-center">
                  {row["Retirement Provision"]}
                </td>
                <td className="border-t border-r border-gray-200 p-4 text-center">
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
