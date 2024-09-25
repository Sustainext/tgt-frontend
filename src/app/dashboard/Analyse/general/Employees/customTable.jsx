import React from 'react';

function DynamicTable({ columns, data }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="min-w-full  w-full">
        <thead className="block md:table-header-group  ">
          <tr className="gradient-background block md:table-row">
            {columns.map((column, index) => (
              column.colSpan && column.colSpan > 1 ? (
                <th
                  key={index}
                  colSpan={column.colSpan}
                  rowSpan={1}
                  className="p-2 text-gray-600 font-bold border-r border-b block md:table-cell text-sm"
                >
                  {column.header}
                </th>
              ) : (
                <th
                  key={index}
                  colSpan={column.colSpan || 1}
                  rowSpan={column.rowspan || 2}
                  className={`p-2 text-gray-600 font-bold ${column.border} border-b block md:table-cell text-sm`}
                >
                  {column.header}
                </th>
              )
            ))}
          </tr>
          <tr className="gradient-background block md:table-row">
            <th className="p-2 text-gray-600 font-bold  border-t block md:table-cell text-sm border-b">&lt;30 years old</th>
            <th className="p-2 text-gray-600 font-bold border-t block md:table-cell text-sm border-b">30-50 years old</th>
            <th className="p-2 text-gray-600 font-bold  border-t border-r block md:table-cell text-sm border-b">&gt;50 years old</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
              key={index}
              className={`bg-white border-l block md:table-row ${index % 2 === 0 ? 'bg-gray-100' : ''} ${index === data.length - 1 ? '' : 'border-b'}`}
            >
                <td className="p-2 text-left block md:table-cell text-sm font-bold border-x">{row.type}</td>
                <td className="p-2 text-center block md:table-cell text-sm text-gray-600">{row.male}</td>
                <td className="p-2 text-center block md:table-cell text-sm text-gray-600">{row.female}</td>
                <td className="p-2 text-center block md:table-cell text-sm text-gray-600 border-r">{row.nonBinary}</td>
                <td className="p-2 text-center block md:table-cell text-sm text-gray-600 ">{row.ageBelow30}</td>
                <td className="p-2 text-center block md:table-cell text-sm text-gray-600 ">{row.age30To50}</td>
                <td className="p-2 text-center block md:table-cell text-sm text-gray-600 border-r ">{row.ageAbove50}</td>
                <td className="p-2 text-center  block md:table-cell text-sm text-gray-600">{row.total}</td>
              </tr>
            ))
          ) : (
            <tr className="bg-white">
              <td colSpan={columns.length + 2} className="p-2 text-center text-sm font-bold text-gray-600 block md:table-cell">
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
