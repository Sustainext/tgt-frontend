"use client";
import { useState, useRef, useEffect } from "react";

const Risktable = ({ col, rows }) => {
  return (
    <>
      <div
        style={{
          display: "block",
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "40vw",
        }}
        className="mb-2 table-scrollbar"
      >
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="gradient-background">
            <tr>
              {col.map((item, idx) => (
                <th
                  key={idx}
                  style={{ textAlign: "left" }}
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
            {rows.length>0?
            rows.map((row, rowIndex) => (
              <tr className="text-[13px]" key={rowIndex}>
                {row.map((val, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-200 p-4 text-left ${
                      rowIndex === rows.length - 1 && colIndex === 0
                        ? "rounded-bl-md"
                        : ""
                    }`}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            )):(
              <tr className="text-[13px]">
               <td
               colSpan={12}
                    className={`border border-gray-200 p-4 text-center`}
                  >
                   No data available
                  </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Risktable;
