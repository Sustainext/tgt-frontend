'use client';
import { useState } from "react";

const DiversityTable = ({columns,data}) => {
  

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
      className="mb-2 rounded-md"
      >
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="gradient-background">
            <tr>
              <th colSpan={3} className="text-[12px] border-r px-4 py-4 text-gray-500 text-left border-b">Gender</th>
              <th colSpan={3} className="text-[12px] border-r px-4 py-4 text-gray-500 text-left border-b">Age Group</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500 text-left border-b">Diversity groups</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500 text-left"></th>
            </tr>
            <tr>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500">Male</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500">Female</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500">Non-Binary</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500">&lt; 30 years</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500">30-50 years</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500">&gt;50 years</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500">Minority group</th>
              <th className="text-[12px] border-r px-4 py-4 text-gray-500">Vulnerable Groups</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-[13px]">
                <td className="border-t border-r border-gray-200 p-4 text-left">{row.Male}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row.Female}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row["Non-Binary"]}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row["< 30 years"]}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row["30-50 years"]}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row[">50 years"]}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row["Minority group"]}</td>
                <td className="border-t border-r border-gray-200 p-4 text-left">{row["Type of vulnerable group - (Number of individuals)"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiversityTable;
