import React from "react";

const DynamicTable2 = ({ data, columns }) => {
  // Function to check if a row is an empty object
  const isEmptyRow = (row) => Object.keys(row).length === 0;

  // Check if data is empty or all rows are empty objects
  const isDataEmpty = data.length === 0 || data.every(isEmptyRow);
  console.log(data, "test data");
  return (
    <div className='overflow-x-auto custom-scrollbar w-full'>
      <table
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="  md:table-header-group ">
          <tr className="md:table-row gradient-background ">
            {columns.map((column, index) => (
              <th
                key={column.accessor}
                className={`px-2 py-3  text-[#727272]   md:table-cell text-[12px] border-b border-gray-300 ${
                  index === 0 ? "text-left" : "text-center"
                }`}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="  md:table-row-group">
          {isDataEmpty ? (
            <tr className="border border-gray-300 md:table-row">
              <td
                colSpan={columns.length}
                className="text-center py-4 text-[12px] font-[400] border-b border-gray-300"
              >
                No available data
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
                    className={`p-2   md:table-cell border-b  border-gray-300 ${
                      colIndex === 0
                        ? "text-left font-bold"
                        : "text-center font-normal text-slate-500"
                    } text-sm`}
                  >
                    {row[column.accessor]}
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
