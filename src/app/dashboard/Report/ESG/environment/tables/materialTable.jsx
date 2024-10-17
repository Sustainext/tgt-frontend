'use client';
import { useState } from "react";

// Dynamic Table Component
const MaterialTable = ({ columns, data }) => {
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
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="text-[12px] border-r px-4 py-4 text-gray-500 text-left border-b"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
  {data.length > 0 ? (
    data.map((data, index) => (
      <tr key={index} className="text-[13px]">
        <td className="border-t border-r border-gray-200 p-4 text-left">
          {data.material_type}
        </td>
        <td className="border-t border-r border-gray-200 p-4 text-left">
          {data.material_category}
        </td>
        <td className="border-t border-r border-gray-200 p-4 text-left">
          {data.source}
        </td>
        <td className="border-t border-r border-gray-200 p-4 text-left">
          {data.total_quantity}
        </td>
        <td className="border-t border-r border-gray-200 p-4 text-left">
          {data.units}
        </td>
      </tr>
    ))
  ) : (
    <tr className="text-[13px]">
      <td className="border-t border-r border-gray-200 p-4 text-left" colSpan={5}>
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



export default MaterialTable;
