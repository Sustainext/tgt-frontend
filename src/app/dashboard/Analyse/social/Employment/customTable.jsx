import React from 'react';

function DynamicTable({ columns, data }) {
  return (
    <div className="container mx-auto">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className=" gradient-background  block md:table-row">
            {columns.map((column, index) => (
              <th
                key={index}
                colSpan={column.colSpan ? column.colSpan : 1}
                className="p-2 text-gray-600 font-bold  border-x  border-b  block md:table-cell text-sm"
              >
                {column.header}
              </th>
            ))}
          </tr>
          <tr className="gradient-background  block md:table-row">
            <th className="p-2 text-gray-600 font-bold border-x   block md:table-cell"></th>
            <th className="p-2 text-gray-600 font-bold   block md:table-cell"></th>
            <th className="p-2 text-gray-600 font-bold   block md:table-cell"></th>
            <th className="p-2 text-gray-600 font-bold   block md:table-cell"></th>
            <th className="p-2 text-gray-600 font-bold border-l border-t  block md:table-cell text-sm">&lt;30 year old</th>
            <th className="p-2 text-gray-600 font-bold  border-l border-t  block md:table-cell text-sm">30-50 years old</th>
            <th className="p-2 text-gray-600 font-bold  border-l border-t border-r  block md:table-cell text-sm">&gt;50 year old</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.map((row, index) => (
            <tr
              key={index}
              className={`bg-white border-l  border-b block md:table-row ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
            >
              <td className="p-2   text-left block md:table-cell text-sm font-bold border-x ">{row.type}</td>
              <td className="p-2   text-center block md:table-cell text-sm text-gray-600">{row.male}</td>
              <td className="p-2   text-center block md:table-cell text-sm text-gray-600">{row.female}</td>
              <td className="p-2   text-center block md:table-cell text-sm text-gray-600 border-r ">{row.nonBinary}</td>
              <td className="p-2   text-center block md:table-cell text-sm text-gray-600 border-r">{row.ageBelow30}</td>
              <td className="p-2   text-center block md:table-cell text-sm text-gray-600 border-r">{row.age30To50}</td>
              <td className="p-2   text-center block md:table-cell text-sm text-gray-600 border-r">{row.ageAbove50}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
