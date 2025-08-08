import React from "react";

const Table1 = ({ data, columns }) => {
  const isEmptyData = data.every((row) => Object.keys(row).length === 0);
  const columnWidth = `${100 / columns.length}%`;

  return (
    <div className='overflow-x-auto custom-scrollbar w-full'>
      <table
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className=" md:table-header-group">
          <tr className="md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-3 text-[#727272]  md:table-cell text-[12px] text-center border-b border-gray-300 `}
                style={{ width: columnWidth }}
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
                className="text-center p-2  md:table-cell text-[12px] font-normal text-slate-500 border-b border-gray-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border border-gray-300 md:table-row"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-2  md:table-cell  text-center text-[12px] font-normal text-slate-500 ${
                      colIndex !== 2 ? "border-r" : ""
                    }  border-b border-gray-300`}
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
