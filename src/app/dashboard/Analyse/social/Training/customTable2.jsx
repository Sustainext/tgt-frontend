import React from 'react';

const DynamicTable2 = ({ data, columns }) => {
  // Check if all rows are empty objects
  const isEmptyData = data.every(row => Object.keys(row).length === 0);

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table
        className="min-w-[828px] w-full rounded-lg border border-gray-300 "
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className=" md:table-header-group border">
          <tr className="border border-gray-300 md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-3  text-[#727272]  md:table-cell text-[12px] ${
                  column === 'Percentage of suppliers screened using social criteria' ? 'text-center' : 'text-center'
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" md:table-row-group">
          {data.length === 0 || isEmptyData ? (
            <tr className="border border-gray-300 md:table-row">
              <td
                colSpan={columns.length}
                className="text-center p-2  md:table-cell text-[12px] font-normal text-slate-500"
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
                    className={`p-2  md:table-cell ${
                      colIndex === 0 ? 'text-center font-normal text-slate-500' : 'text-center font-normal text-slate-500'
                    } text-[12px]`}
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
