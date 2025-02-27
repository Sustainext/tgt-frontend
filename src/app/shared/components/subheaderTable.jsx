import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import FullTable from "../../shared/components/FullTable";

const SubHeaderTable = ({ type, columns, data, fullData, organisation, corporate, location, fromDate, toDate }) => {

  return (
    <div>
    <div 
    className="container mx-auto p-4"
    // style={{
    //   display: "block",
    //   overflowX: "auto",
    //   maxWidth: "100%",
    //   minWidth: "100%",
    //   width: "40vw",
    //   maxHeight: "450px"
    // }}
    // className="mb-2 rounded-md table-scrollbar"
    >
      <table className="rounded-md border border-gray-300  w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="gradient-background">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index}
                colSpan={col.subHeaders.length || 1}
                rowSpan={col.subHeaders.length ? 1 : 2}
                className={`text-[12px] ${col.header=="Gases included in the calculation"?'border-l':''}  px-2 py-2  text-[12px] text-[#727272] text-center border-b border-gray-300`} 
              >
                {col.header}
              </th>
            ))}
          </tr>
          <tr>
            {columns.map((col, index) => 
              col.subHeaders.length > 0 &&
              col.subHeaders.map((subHeader, subIndex) => (
                <th key={subIndex} className={`text-[12px] ${subHeader=="CO2"?'border-l':''}  px-2 py-3  text-[12px] text-[#727272] border-b border-gray-300`}>
                  {subHeader}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {data && data.length>0?(
            data.map((row, rowIndex) => (
                <tr key={rowIndex} className="text-[12px]">
                  {columns.map((col, colIndex) => (
                    col.subHeaders.length > 0 ? (
                      col.subHeaders.map((subHeader, subColIndex) => (
                        <td key={subColIndex} className="border-gray-300 border-b p-2 text-center">
                          {row[subHeader]}
                        </td>
                      ))
                    ) : (
                      <td key={colIndex} className="border-gray-300 border-b p-2 text-center">
                        {row[col.header]}
                      </td>
                    )
                  ))}
                </tr>
              ))
          ):(
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
  </div>
  );
};

export default SubHeaderTable;
