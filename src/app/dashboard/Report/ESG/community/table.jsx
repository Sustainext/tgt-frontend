'use client';
import { useState, useRef, useEffect } from "react";

const CommunityTable = () => {
  const col = [
    "",
    "Percentage of operations implemented by engaging local communities",
  ];

  const data = [
    {
      0: [
        {
          "": "Social impact assessments",
          "Percentage of operations implemented by engaging local communities": "data",
        },
        {
          "": "Environmental impact assessments",
          "Percentage of operations implemented by engaging local communities": "data",
        },
        {
          "": "Public disclosure",
          "Percentage of operations implemented by engaging local communities": "data",
        },
        {
          "": "Community development programs",
          "Percentage of operations implemented by engaging local communities": "data",
        },
        {
          "": "Stakeholder engagement plans",
          "Percentage of operations implemented by engaging local communities": "data",
        },
        {
          "": "Local community consultation committes",
          "Percentage of operations implemented by engaging local communities": "data",
        },
        {
          "": "works councils, occupational health and safety committees",
          "Percentage of operations implemented by engaging local communities": "data",
        },
        {
          "": "Community grievance processes",
          "Percentage of operations implemented by engaging local communities": "data",
        },
      ],
    },
  ];

  return (
    <>
      <div style={{ maxHeight: "450px", overflowY: "auto" }} className="mb-2">
        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
          <thead className="gradient-background">
            <tr>
              {col.map((item, idx) => (
                <th
                  key={idx}
                  style={{ minWidth: "120px", textAlign: "center" }}
                  className={`text-[12px] border-r px-4 py-4 ${
                    idx === 0 ? "rounded-tl-md" : "" // Top-left corner
                  } ${
                    idx === col.length - 1 ? "rounded-tr-md" : "" // Top-right corner
                  } text-gray-500`}
                >
                  <div className="flex justify-center items-center">
                    <p className="flex items-center">{item}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[0][0].map((row, rowIndex) => (
              <tr key={rowIndex} className="text-[11px]">
                <td className="border-t border-r border-gray-200 p-4 text-center">
                  {row[""]}
                </td>
                <td className="border border-gray-200 p-4 text-center">
                  {row["Percentage of operations implemented by engaging local communities"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommunityTable;
