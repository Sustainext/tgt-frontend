import React from 'react';

const DynamicTable2 = ({ data, columns }) => {
  // Check if all rows are empty objects
  const isEmptyData = data.every(row => Object.keys(row).length === 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="border border-gray-300 md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm ${
                  column === 'Percentage of suppliers screened using social criteria' ? 'text-center' : 'text-left'
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length === 0 || isEmptyData ? (
            <tr className="border border-gray-300 md:table-row">
              <td
                colSpan={columns.length}
                className="text-center p-2 block md:table-cell text-sm"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-300 md:table-row">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-2 block md:table-cell ${
                      colIndex === 0 ? 'text-center' : 'text-center'
                    } text-sm`}
                  >
                        {row[column] !== undefined && row[column] !== null ? `${row[column]}%` : 'N/A'}
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
