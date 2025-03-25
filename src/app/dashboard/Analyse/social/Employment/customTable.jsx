import React from 'react';

function DynamicTable({ columns, data }) {
  // Calculate total columns including special age group columns
  const totalColumns = columns.reduce((acc, column) => acc + (column.colSpan || 1), 0) + 3; // +3 for the age group headers

  return (
    <div className="container mx-auto">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="gradient-background block md:table-row">
            {columns.map((column, index) => (
              <th
                key={index}
                colSpan={column.colSpan ? column.colSpan : 1}
                
                className="p-2 text-[#727272] border-x border-b block md:table-cell text-[12px]"
              >
                {column.header}
              </th>
            ))}
          </tr>
          <tr className="gradient-background block md:table-row">
            {/* Simplified headers for age groups */}
            <th className="p-2 text-slate-500 font-bold border-x block md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold block md:table-cell border-x"></th>
            <th className="p-2 text-slate-500 font-bold block md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold block md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold block md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">&lt;30 year old</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">30-50 years old</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t border-r block md:table-cell text-[12px]">&gt;50 year old</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={`bg-white border-l border-b block md:table-row ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
              >
                <td className="p-2 text-left block md:table-cell text-[12px] font-bold border-x ">{row.type}</td>
                <td className="p-2 text-center block md:table-cell text-[12px] text-slate-500 font-normal border-r ">{row.Totalnoofemployees}</td>
                <td className="p-2 text-center block md:table-cell text-[12px] text-slate-500 font-normal"> {row.male !== undefined && row.male !== null && row.male !== '' ? `${row.male} %` : ''}</td>
                <td className="p-2 text-center block md:table-cell text-[12px] text-slate-500 font-normal">  {row.female !== undefined && row.female !== null && row.female !== '' ? `${row.female} %` : ''}</td>
                <td className="p-2 text-center block md:table-cell text-[12px] text-slate-500 font-normal border-r ">  {row.nonBinary !== undefined && row.nonBinary !== null && row.nonBinary !== '' ? `${row.nonBinary} %` : ''}</td>
                <td className="p-2 text-center block md:table-cell text-[12px] text-slate-500 font-normal border-r">  {row.ageBelow30 !== undefined && row.ageBelow30 !== null && row.ageBelow30 !== '' ? `${row.ageBelow30} %` : ''}</td>
                <td className="p-2 text-center block md:table-cell text-[12px] text-slate-500 font-normal border-r">  {row.age30To50 !== undefined && row.age30To50 !== null && row.age30To50 !== '' ? `${row.age30To50} %` : ''}</td>
                <td className="p-2 text-center block md:table-cell text-[12px] text-slate-500 font-normal border-r">  {row.ageAbove50 !== undefined && row.ageAbove50 !== null && row.ageAbove50 !== '' ? `${row.ageAbove50} %` : ''}</td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border">
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
