import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import FullTable from "../../shared/components/FullTable";

const SubHeaderTable = ({
  type,
  columns,
  data,
  fullData,
  organisation,
  corporate,
  location,
  fromDate,
  toDate,
}) => {
  return (
    <div className="overflow-x-auto custom-scrollbar w-full max-w-full xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4">
      <table
        className="w-full  rounded-lg border border-gray-300 "
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
          <thead className="gradient-background">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  colSpan={col.subHeaders.length || 1}
                  rowSpan={col.subHeaders.length ? 1 : 2}
                  className={`text-[12px] ${
                    col.header == "Gases included in the calculation"
                      ? "border-l"
                      : ""
                  }  px-2 py-2  text-[12px] text-[#727272] text-center border-b border-gray-300 whitespace-nowrap min-w-0`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
            <tr>
              {columns.map(
                (col, index) =>
                  col.subHeaders.length > 0 &&
                  col.subHeaders.map((subHeader, subIndex) => (
                    <th
                      key={subIndex}
                      className={`text-[12px] ${
                        subHeader == "CO2" ? "border-l" : ""
                      }  px-2 py-3  text-[12px] text-[#727272] border-b border-gray-300 whitespace-nowrap min-w-0`}
                    >
                      {subHeader}
                    </th>
                  ))
              )}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="text-[12px]">
                  {columns.map((col, colIndex) =>
                    col.subHeaders.length > 0 ? (
                      col.subHeaders.map((subHeader, subColIndex) => (
                        <td
                          key={subColIndex}
                          className="border-gray-300 border-b p-2 text-center"
                        >
                          {row[subHeader]}
                        </td>
                      ))
                    ) : (
                      <td
                        key={colIndex}
                        className="border-gray-300 border-b p-2 text-center"
                      >
                        {row[col.header]}
                      </td>
                    )
                  )}
                </tr>
              ))
            ) : (
              <tr className="border border-gray-300 md:table-row">
                <td
                  colSpan={14}
                  className="text-center py-4 text-[12px] font-[400]"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
   
  );
};

export default SubHeaderTable;
