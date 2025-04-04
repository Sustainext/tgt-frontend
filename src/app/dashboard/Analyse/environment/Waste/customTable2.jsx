import React from 'react';

const DynamicTable2 = ({ data = [], columns }) => {
  const isEmptyData = data.length === 0 || data.every((row) => Object.keys(row).length === 0);
  console.log(data, "Data in DynamicTable2");

  return (
    <div className="overflow-auto custom-scrollbar ">
      <table className="rounded-md border border-gray-300  w-full " style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="gradient-background">
          <tr className="">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-3 text-[#727272]  md:table-cell text-[12px] ${
                  index === 0 ? "text-left" : "text-center"
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {isEmptyData ? (
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
                      colIndex === 0 ? "text-left font-normal text-slate-500" : "text-center font-normal text-slate-500"
                    } text-[12px]`}
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


