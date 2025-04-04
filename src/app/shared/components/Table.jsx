import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import FullTable from "../../shared/components/FullTable";

const Table = ({ type, columns, data,fullData, organisation, corporate, location, fromDate, toDate }) => {
  const [openFullTable, setOpenFullTable] = useState(false);

  const closeFullTable = () => {
    setOpenFullTable(false);
  };

  return (
<div className="container mx-auto xl:p-4 lg:p-4 md:p-4 2xl:p-4 4k:p-4 2k:p-4 p-1 mb-3 overflow-auto custom-scrollbar ">

      
      <table className="rounded-md border border-gray-300  w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="">
          <tr className="border-b border-gray-300 md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column.accessor} 
                className={`px-2 py-3  text-[#727272]  md:table-cell border-b border-gray-300   text-[12px] ${type=="Reduction"?'':'xl:w-1/5 lg:w-1/5 md:w-1/5 2xl:w-1/5 4k:w-1/5 2k:w-1/5'} ${
                  index === 0 || type=="Reduction" ? "text-left pl-4" : "text-center"
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
          {data.length > 0 && type !== "Scope" && type !== "Reduction" &&(
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
            <FullTable onClose={closeFullTable} columns={columns} data={fullData} organisation={organisation} corporate={corporate} location={location} fromDate={fromDate} toDate={toDate} type={type} />
          </div>
        </div>
      )}
    </div>

  );
};

export default Table;
