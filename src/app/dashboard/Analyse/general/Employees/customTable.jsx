import React from "react";

function DynamicTable({ columns, data }) {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table
        className="w-full min-w-[828px] rounded-lg border border-gray-300 "
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead>
          <tr className="gradient-background ">
            {columns.map((column, index) =>
              column.colSpan && column.colSpan > 1 ? (
                <th
                  key={index}
                  colSpan={column.colSpan}
                  rowSpan={1}
                  className="p-2 text-[#727272]  border-r border-b   text-[12px]"
                >
                  {column.header}
                </th>
              ) : (
                <th
                  key={index}
                  colSpan={column.colSpan || 1}
                  rowSpan={column.rowspan || 2}
                  className={`p-2 text-[#727272]  ${column.border} border-b   text-[12px]`}
                >
                  {column.header}
                </th>
              )
            )}
          </tr>
          <tr className="gradient-background ">
            <th className="p-2 text-[#727272]  border-t   text-[12px] border-b">
              &lt;30 years old
            </th>
            <th className="p-2 text-[#727272] border-t   text-[12px] border-b">
              30-50 years old
            </th>
            <th className="p-2 text-[#727272]  border-t border-r   text-[12px] border-b">
              &gt;50 years old
            </th>
          </tr>
        </thead>
        <tbody className=" md:table-row-group">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={`bg-white border-l  md:table-row ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                } ${index === data.length - 1 ? "" : "border-b"}`}
              >
                <td className="p-2 text-left   text-[12px] font-bold border-x">
                  {row.type}
                </td>
                <td className="p-2 text-center   text-[12px] text-slate-500 font-normal">
                  {row.male}
                </td>
                <td className="p-2 text-center   text-[12px] text-slate-500 font-normal">
                  {row.female}
                </td>
                <td className="p-2 text-center   text-[12px] text-slate-500 font-normal border-r">
                  {row.nonBinary}
                </td>
                <td className="p-2 text-center   text-[12px] text-slate-500 font-normal ">
                  {row.ageBelow30}
                </td>
                <td className="p-2 text-center   text-[12px] text-slate-500 font-normal ">
                  {row.age30To50}
                </td>
                <td className="p-2 text-center   text-[12px] text-slate-500 font-normal border-r ">
                  {row.ageAbove50}
                </td>
                <td className="p-2 text-center    text-[12px] text-slate-500 font-normal">
                  {row.total}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white">
              <td
                colSpan={columns.length + 2}
                className="p-2 text-center text-[12px] text-slate-500 font-normal  "
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
