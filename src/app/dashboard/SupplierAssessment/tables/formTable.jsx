"use client";
import React, { useState } from "react";
import Pagination from "./pagination";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import DeleteModal from "../forms/modals/deleteFormModal";

const FormTable = ({
  columns,
  currentData,
  totalItems,
  rowsPerPageOptions,
  onPageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="overflow-x-auto table-scrollbar">
        <table className="table-auto w-full bg-white rounded-lg shadow-md min-w-[900px]">
          <thead className="bg-gray-100">
            <tr>
              {columns &&
                columns.map((val, i) => (
                  <th
                    className={`px-6 py-3  text-sm font-semibold text-gray-600 
                      ${i === 0 ? "min-w-[25px]" : "min-w-[150px]"} 
                  ${columns.length - 1 == i ? "text-center" : "text-left"}`}
                  >
                    {val.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.sno}
                  </td>
                  <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200">
                    {row.formName}
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.createdBy}
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.createdOn}
                  </td>
                  <td className="xl:px-3 py-3 text-sm text-[#9823DF] border-b border-gray-200 relative px-1">
                    <div className="flex flex-wrap gap-2">
                      {/* Mobile: show only 1 item */}
                      {row.usedIn.slice(0, 1).map((data, index) => (
                        <span
                          key={`mobile-${index}`}
                          className="block md:hidden px-2 py-1 bg-[#9823df1a] font-semibold text-[#9823DF] text-sm rounded-md"
                        >
                          {data}
                        </span>
                      ))}

                      {/* Desktop: show up to 3 items */}
                      {row.usedIn.slice(0, 3).map((data, index) => (
                        <span
                          key={`desktop-${index}`}
                          className="hidden md:inline-block px-2 py-1 bg-[#9823df1a] font-semibold text-[#9823DF] text-sm rounded-md"
                        >
                          {data}
                        </span>
                      ))}

                      {/* Show 'more' button for mobile if more than 1 */}
                      {row.usedIn.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const modal = document.getElementById(
                              `modal-${idx}`
                            );
                            modal.style.display = "block";
                          }}
                          className="md:hidden text-[#007EEF] text-sm underline cursor-pointer"
                        >
                          +{row.usedIn.length - 1} more
                        </button>
                      )}

                      {/* Show 'more' button for desktop if more than 3 */}
                      {row.usedIn.length > 3 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const modal = document.getElementById(
                              `modal-${idx}`
                            );
                            modal.style.display = "block";
                          }}
                          className="hidden md:inline text-[#007EEF] text-sm underline cursor-pointer"
                        >
                          +{row.usedIn.length - 3} more
                        </button>
                      )}
                    </div>

                    {/* Modal for displaying all usedIn items */}
                    <div
                      id={`modal-${idx}`}
                      className="hidden absolute top-0 left-[40%] xl:w-full w-[250px] bg-white shadow-lg p-4 rounded-md border border-gray-200 z-10"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-medium text-gray-800 mb-2">
                          Assessment Used
                        </h2>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const modal = document.getElementById(
                              `modal-${idx}`
                            );
                            modal.style.display = "none";
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {row.usedIn.map((data, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#9823df1a] font-semibold text-[#9823DF] text-sm rounded-md"
                          >
                            {data}
                          </span>
                        ))}
                      </div>
                      <div className="border-b border-gray-300 mt-4 my-2"></div>
                    </div>
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 text-center">
                    <div className="flex justify-center items-center">
                      <MdOutlineDeleteOutline
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                        className="text-[20px] text-gray-500 cursor-pointer hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalItems}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={onPageChange}
      />

      <DeleteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default FormTable;
