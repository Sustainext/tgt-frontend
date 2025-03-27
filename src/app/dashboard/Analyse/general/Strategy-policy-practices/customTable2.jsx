import React from 'react';

const DynamicTable2 = ({ data, columns }) => {
  // Check if all rows are empty objects
  const isEmptyData = data.every(row => Object.keys(row).length === 0);

  return (
    <div className="overflow-x-auto">
        <table className="min-w-full w-full rounded-lg border border-gray-300 "style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="border">
          <tr className="gradient-background">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-3  text-[#727272]  md:table-cell text-[12px] text-center   border-gray-300 w-[50%] ${
                  index === 0 ? '' : ' border-l'
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 || isEmptyData ? (
            <tr className="border border-gray-300 md:table-row">
              <td
                colSpan={columns.length}
                className="text-center p-2  md:table-cell text-[12px] font-normal text-slate-500 border-t border-gray-300"
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
                    className={`p-2  md:table-cell border-t border-gray-300 ${
                      colIndex === 0 ? 'text-center font-normal text-slate-500' : 'text-center font-normal text-slate-500 '
                    } text-[12px]`}
                  >
                        {row[column] !== undefined && row[column] !== null ? `${row[column]}` : 'N/A'}
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
