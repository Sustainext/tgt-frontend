import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import FullTable from "../../shared/components/FullTable";

const Table = ({
  type,
  columns,
  data,
  fullData,
  organisation,
  corporate,
  location,
  fromDate,
  toDate,
}) => {
  const [openFullTable, setOpenFullTable] = useState(false);

  const closeFullTable = () => {
    setOpenFullTable(false);
  };

  return (
       <div className="overflow-x-auto custom-scrollbar w-full max-w-full xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4">
      <table
        className="w-full  rounded-lg border border-gray-300 "
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="">
          <tr className="border-b border-gray-300 md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column.accessor}
                className={`px-2 py-3  text-[#727272]  md:table-cell border-b border-gray-300   text-[12px] ${
                  type == "Reduction"
                    ? "text-left whitespace-nowrap"
                    : "w-auto min-w-0"
                } ${
                  index === 0 || type == "Reduction"
                    ? "text-left pl-4"
                    : "text-center"
                }`}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" md:table-row-group">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border border-gray-300 md:table-row"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-2  md:table-cell border-b border-gray-300 ${
                      colIndex === 0 ? "text-left  pl-4" : "text-center"
                    } text-[12px]`}
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="border border-gray-300 md:table-row w-full">
              <td
                colSpan={columns.length}
                className="text-center py-4 text-[12px] font-[400]"
              >
                No data available
              </td>
            </tr>
          )}
          {data.length > 0 && type !== "Scope" && type !== "Reduction" && (
            <tr className="border border-gray-300 md:table-row">
              <td
                colSpan={columns.length}
                className="px-2 py-3 text-left text-sm font-bold md:table-cell text-blue-400 w-1/5"
              >
                <button
                  className="flex justify-start items-center gap-2"
                  onClick={() => setOpenFullTable(true)}
                >
                  <MdArrowOutward />
                  <div>Open Full List</div>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openFullTable && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-lg shadow-lg xl:w-auto w-[93%] overflow-auto custom-scrollbar">
            <FullTable
              onClose={closeFullTable}
              columns={columns}
              data={fullData}
              organisation={organisation}
              corporate={corporate}
              location={location}
              fromDate={fromDate}
              toDate={toDate}
              type={type}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
