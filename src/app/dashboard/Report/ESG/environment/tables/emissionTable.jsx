'use client';
import { useState } from "react";

// Dynamic Table Component
const EmissionTable = ({ title, columns, data }) => {
  return (
    <div>
      <div
        style={{
          display: "block",
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "40vw",
          maxHeight: "450px",
        }}
        className="mb-2 rounded-md table-scrollbar"
      >
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="gradient-background">
          <tr className="text-[12px] border border-gray-200">
            {/* <th colSpan={7} className="p-4 text-start text-gray-500">
              {title}
            </th> */}
          </tr>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  colSpan={col.subHeaders ? col.subHeaders.length : 1}
                  rowSpan={col.subHeaders ? 1 : 2}
                  className="text-[12px] border-r px-4 py-4 text-gray-500 text-left border-b"
                >
                  {col.header}
                </th>
              ))}
            </tr>
            <tr>
              {columns.map((col, index) =>
                col.subHeaders
                  ? col.subHeaders.map((subHeader, subIndex) => (
                      <th
                        key={subIndex}
                        className="text-[12px] border-r px-4 py-4 text-gray-500"
                      >
                        {subHeader}
                      </th>
                    ))
                  : null
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-[13px]">
                {columns.map((col, colIndex) =>
                  col.subHeaders
                    ? col.subHeaders.map((subHeader, subColIndex) => (
                        <td
                          key={subColIndex}
                          className="border-t border-r border-gray-200 p-4 text-left"
                        >
                          {row[subHeader]}
                        </td>
                      ))
                    : (
                      <td
                        key={colIndex}
                        className="border-t border-r border-gray-200 p-4 text-left"
                      >
                        {row[col.header]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default EmissionTable;
