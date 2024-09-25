import React from 'react';

const DynamicTable2 = ({ data, columns }) => {
  // Check if all rows are empty objects
  const isEmptyData = data.every(row => Object.keys(row).length === 0);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="min-w-full w-full">
        <thead className="block md:table-header-group">
          <tr className="md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-3 font-semibold text-gray-600 block md:table-cell text-center text-[12px] capitalize border border-slate-300`}
               
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length === 0 || isEmptyData ? (
            <tr className="md:table-row">
              <td
                colSpan={columns.length}
                className="text-center p-2 block md:table-cell text-sm border border-slate-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="md:table-row">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-2 block md:table-cell text-sm border border-slate-300 ${
                      colIndex === 0 ? 'text-center' : 'text-center'
                    }`}
                  >
                    {row[column] !== undefined && row[column] !== null
                      ? colIndex === 0
                        ? row[column]
                        : `${row[column]}`
                      : 'N/A'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable2;
