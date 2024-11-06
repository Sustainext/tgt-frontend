import React from "react";

const Table1 = ({ data, columns }) => {
  const isEmptyData = data.every((row) => Object.keys(row).length === 0);
  const columnWidth = `${100 / columns.length}%`;

  return (
    <div className="">
      <table
        className="min-w-full w-full rounded-lg border-x border-t border-gray-300"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="block md:table-header-group">
          <tr className="md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-3 text-[#727272] block md:table-cell text-[12px] text-center border-b border-gray-300 `}
                style={{ width: columnWidth }}
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
                className="text-center p-2 block md:table-cell text-[12px] font-normal text-slate-500 border-b border-gray-300"
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
                    className={`p-2 block md:table-cell h-20 text-center text-[12px] font-normal text-slate-500 ${
                      colIndex !== 2 ? 'border-r' : ''
                    } border-t border-gray-300`}
                    style={{ width: columnWidth }}
                  >
                    {row[column] || "N/A"}
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

export default Table1;
