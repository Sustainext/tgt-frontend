import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import FullTable from "../../shared/components/FullTable";

const Table = ({ type, columns, data,fullData, organisation, corporate, location, fromDate, toDate }) => {
  const [openFullTable, setOpenFullTable] = useState(false);

  const closeFullTable = () => {
    setOpenFullTable(false);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="border border-gray-300 md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column.accessor} 
                className={`px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm w-1/5 ${
                  index === 0 ? "text-left pl-4" : "text-center"
                }`}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border border-gray-300 md:table-row"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-2 block md:table-cell ${
                      colIndex === 0 ? "text-left font-bold pl-4" : "text-center"
                    } text-sm`}
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="border border-gray-300 md:table-row">
              <td
                colSpan={columns.length}
                className="p-2 text-center text-sm font-bold block md:table-cell"
              >
                No data available
              </td>
            </tr>
          )}
          {data.length > 0 && type !== "Scope" && (
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
          <div className="bg-white rounded-lg shadow-lg">
            <FullTable onClose={closeFullTable} columns={columns} data={fullData} organisation={organisation} corporate={corporate} location={location} fromDate={fromDate} toDate={toDate} type={type} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
