'use client';
import { useState, useRef, useEffect } from "react";

const EmployeeTable2=({columns,data})=>{


    return (
        <>
         <div  style={{
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "40vw",
        maxHeight:"450px"
      }}
      className="mb-2 rounded-md table-scrollbar">
      <table className="min-w-full  w-full">
        <thead className=" md:table-header-group  ">
          <tr className="gradient-background  md:table-row text-left">
            {columns.map((column, index) => (
              column.colSpan && column.colSpan > 1 ? (
                <th
                  key={index}
                  colSpan={column.colSpan}
                  rowSpan={1}
                  className="p-4 text-[#727272]  border-r border-b  md:table-cell text-[12px]"
                >
                  {column.header}
                </th>
              ) : (
                <th
                  key={index}
                  colSpan={column.colSpan || 1}
                  rowSpan={column.rowspan || 2}
                  className={`p-4 text-[#727272]  ${column.border} border-b  md:table-cell text-[12px]`}
                >
                  {column.header}
                </th>
              )
            ))}
          </tr>
          <tr className="gradient-background  md:table-row text-left">
            <th className="p-4 text-[#727272]  border-t  md:table-cell text-[12px] border-b">&lt;30 years old</th>
            <th className="p-4 text-[#727272] border-t  md:table-cell text-[12px] border-b">30-50 years old</th>
            <th className="p-4 text-[#727272]  border-t border-r block md:table-cell text-[12px] border-b">&gt;50 years old</th>
          </tr>
        </thead>
        <tbody className=" md:table-row-group">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
              key={index}
              className={`bg-white border-l  md:table-row ${index % 2 === 0 ? 'bg-gray-100' : ''} ${index === data.length - 1 ? '' : 'border-b'}`}
            >
                <td className="p-4 text-left  md:table-cell text-[13px] border-x">{row.type}</td>
                <td className="p-4 text-left  md:table-cell text-[13px] text-slate-500 font-normal">{row.male}</td>
                <td className="p-4 text-left  md:table-cell text-[13px] text-slate-500 font-normal">{row.female}</td>
                <td className="p-4 text-left  md:table-cell text-[13px] text-slate-500 font-normal border-r">{row.nonBinary}</td>
                <td className="p-4 text-left  md:table-cell text-[13px] text-slate-500 font-normal ">{row.ageBelow30}</td>
                <td className="p-4 text-left  md:table-cell text-[13px] text-slate-500 font-normal ">{row.age30To50}</td>
                <td className="p-4 text-left  md:table-cell text-[13px] text-slate-500 font-normal border-r ">{row.ageAbove50}</td>
                <td className="p-4 text-left   md:table-cell text-[13px] text-slate-500 font-normal">{row.total}</td>
              </tr>
            ))
          ) : (
            <tr className="bg-white w-full">
              <td colSpan={columns.length + 2} className="p-4 text-center text-[13px] text-slate-500 font-normal  w-full">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
        </>
    )
}

export default EmployeeTable2