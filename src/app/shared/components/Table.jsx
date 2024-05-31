import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-max w-full table-auto" style={{ border: "none" }}>
        <thead>
          <tr className="border-b border-black border-opacity-10">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-neutral-500 text-xs font-normal leading-[15px] text-left w-1/4"
                style={{ border: "none" }}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="text-gray-600 text-sm font-light"
          style={{ border: "none" }}
        >
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="py-3 px-6 text-left text-black text-opacity-90 text-[13px] font-normal leading-none"
                  style={{ border: "none" }}
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
