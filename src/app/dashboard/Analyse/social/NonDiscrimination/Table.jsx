import React from "react";

const DynamicTable2 = ({ data, columns }) => {
  // Check if all rows are empty objects
  const isEmptyData = data.every((row) => Object.keys(row).length === 0);

  return (
    <div className='overflow-x-auto custom-scrollbar w-full'>
      <table
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className=" md:table-header-group ">
          <tr className="md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column}
                className={` py-3  text-[#727272]  md:table-cell text-[12px]  border-b border-gray-300 ${
                  index === 0 ? "text-left px-3" : "text-center px-2"
                } `}
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
                    className={` md:table-cell ${
                      colIndex === 0
                        ? "text-left font-bold px-3 py-2 "
                        : "text-center font-normal text-slate-500 px-2 py-2  "
                    } text-[12px] border-b border-gray-300 `}
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

export default DynamicTable2;
