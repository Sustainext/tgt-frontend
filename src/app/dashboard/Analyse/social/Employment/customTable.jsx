import React from 'react';

function DynamicTable({ columns, data }) {
  // Calculate total columns including special age group columns
  const totalColumns = columns.reduce((acc, column) => acc + (column.colSpan || 1), 0) + 3; // +3 for the age group headers

  return (
    <div className="container mx-auto overflow-x-auto custom-scrollbar">
      <table className="min-w-[828px] border-collapse  md:table w-full rounded-lg overflow-hidden">
        <thead className=" md:table-header-group border">
          <tr className="gradient-background  md:table-row">
            {columns.map((column, index) => (
              <th
                key={index}
                colSpan={column.colSpan ? column.colSpan : 1}
                
                className="p-2 text-[#727272] border-x border-b border-gray-300  md:table-cell text-[12px]"
              >
                {column.header}
              </th>
            ))}
          </tr>
          <tr className="gradient-background  md:table-row">
            {/* Simplified headers for age groups */}
            <th className="p-2 text-slate-500 font-bold border-x border-gray-300 md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold  md:table-cell border-x"></th>
            <th className="p-2 text-slate-500 font-bold  md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold  md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold  md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold border-l border-t border-gray-300  md:table-cell text-[12px]">&lt;30 year old</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t border-gray-300  md:table-cell text-[12px]">30-50 years old</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t border-r  border-gray-300 md:table-cell text-[12px]">&gt;50 year old</th>
          </tr>
        </thead>
        <tbody className=" md:table-row-group">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={`bg-white border-l border-b border-gray-300  md:table-row ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
              >
                <td className="p-2 text-left md:table-cell text-[12px] font-bold border-x border-gray-300 ">{row.type}</td>
                <td className="p-2 text-center md:table-cell text-[12px] text-slate-500 font-normal border-r border-gray-300 ">{row.Totalnoofemployees}</td>
                <td className="p-2 text-center  md:table-cell text-[12px] text-slate-500 font-normal"> {row.male !== undefined && row.male !== null && row.male !== '' ? `${row.male} %` : ''}</td>
                <td className="p-2 text-center  md:table-cell text-[12px] text-slate-500 font-normal">  {row.female !== undefined && row.female !== null && row.female !== '' ? `${row.female} %` : ''}</td>
                <td className="p-2 text-center  md:table-cell text-[12px] text-slate-500 font-normal border-r border-gray-300">  {row.nonBinary !== undefined && row.nonBinary !== null && row.nonBinary !== '' ? `${row.nonBinary} %` : ''}</td>
                <td className="p-2 text-center  md:table-cell text-[12px] text-slate-500 font-normal border-r border-gray-300">  {row.ageBelow30 !== undefined && row.ageBelow30 !== null && row.ageBelow30 !== '' ? `${row.ageBelow30} %` : ''}</td>
                <td className="p-2 text-center  md:table-cell text-[12px] text-slate-500 font-normal border-r border-gray-300">  {row.age30To50 !== undefined && row.age30To50 !== null && row.age30To50 !== '' ? `${row.age30To50} %` : ''}</td>
                <td className="p-2 text-center  md:table-cell text-[12px] text-slate-500 font-normal border-r border-gray-300">  {row.ageAbove50 !== undefined && row.ageAbove50 !== null && row.ageAbove50 !== '' ? `${row.ageAbove50} %` : ''}</td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border border-gray-300">
              <td colSpan={totalColumns} className="p-2 text-center text-[12px] font-[400]">
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
