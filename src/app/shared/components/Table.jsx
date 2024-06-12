import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="border border-gray-300 md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column.accessor}
                className={`px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm ${
                  index === 0 ? 'text-left' : 'text-center'
                }`}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border border-gray-300 md:table-row">
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-2 block md:table-cell ${
                    colIndex === 0 ? 'text-left font-bold' : 'text-center'
                  } text-sm`}
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
