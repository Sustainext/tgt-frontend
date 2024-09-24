'use client';
import { useState, useRef, useEffect } from "react";

// Dynamic table component to handle multiple tables
const EconomicTable4 = ({ title, col, data }) => {
  return (
    <div style={{ maxHeight: "450px", overflowX: "auto", overflowY: "auto" }} className="mb-4 w-full">
      <table className="min-w-max w-full border border-gray-300 rounded-md overflow-hidden mb-4">
        <thead className="gradient-background border border-gray-600">
          <tr className="text-[12px] border border-gray-200">
            <th colSpan={col.length} className="p-4 text-start text-gray-500">
              {title}
            </th>
          </tr>
          <tr>
            {col.map((item, idx) => (
              <th
                key={idx}
                style={{ minWidth: "120px", textAlign: "left", whiteSpace: "nowrap" }}
                className={`text-[12px] border-r px-4 py-4 ${
                  idx === 0 ? "rounded-tl-md" : "" // Top-left corner
                } ${idx === col.length - 1 ? "rounded-tr-md" : ""} text-gray-500`} // Top-right corner
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-gray-300">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-[11px]">
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border-t ${cellIndex !== col.length - 1 ? 'border-r' : ''} border-gray-200 p-4 text-start`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example Usage
const EconomicTables = () => {
  // Define data for multiple tables
  const tableData = [
    {
      title: "Total number and percentage of governance body members that the organization’s anti-corruption policies and procedures have been communicated to, by region:",
      columns: [
        "Region",
        "Total number of governance body members that the organization's anti-corruption policies and procedures have been communicated to ",
        "Total number of governance body members in that region.",
        "Percentage of governance body members that the organization's anti-corruption policies and procedures have been communicated to "
      ],
      rows: [
        { Operation: "Region 1", TotalOperation: "25", Percentage: "60%",TrainingHours: "1000" },
        { Operation: "Region 2", TotalOperation: "15", Percentage: "50%",TrainingHours: "1000" }
      ]
    },
    {
      title: "Total number and percentage of employees that the organization’s anti-corruption policies and procedures have been communicated to, broken down by employee category and region. ",
      columns: [
        "Location Name",
        "Employee Category",
        "Total number of employees that the organization's anti-corruption policies and procedures have been communicated to",
        "Percentage of employees that the organization's anti-corruption policies and procedures have been communicated to ",
        "Percentage of employees that the organization's anti-corruption policies and procedures have been communicated to "
      ],
      rows: [
        { Category: "Category A", TotalEmployees: "500", Percentage: "50%", TrainingHours: "1000" },
        { Category: "Category B", TotalEmployees: "300", Percentage: "30%", TrainingHours: "800" }
      ]
    },
    {
      title: "Business Partners Assessed for Corruption Risks",
      columns: [
        "Location",
        "Type of Business Partner",
        "Total Number of Business Partners",
        "Percentage of Business Partners Assessed"
      ],
      rows: [
        { Location: "Location 1", Type: "Type A", TotalPartners: "100", Percentage: "80%" },
        { Location: "Location 2", Type: "Type B", TotalPartners: "50", Percentage: "60%" }
      ]
    }
  ];

  return (
    <div>
      {tableData.map((table, idx) => (
        <EconomicTable4 key={idx} title={table.title} col={table.columns} data={table.rows} />
      ))}
    </div>
  );
};

export default EconomicTables;
