"use client";
import React from "react";
import Pagination from "./pagination";

const Table = ({
  columns,
  currentData,
  totalItems,
  rowsPerPageOptions,
  onPageChange,
}) => {
  return (
    <>
      <div className="overflow-x-auto table-scrollbar">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              {columns &&
                columns.map((val,i) => (
                  <th key={i} className={`px-3 py-3 ${(columns.length-1)==i?'text-center':'text-left'} text-sm font-semibold text-gray-600`}>
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
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200">
                    {row.form}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.createdBy}
                  </td>
                   {/* Modified Stakeholder Groups Column */}
      <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200 relative">
        <div className="flex flex-wrap gap-2">
          {row.group.slice(0, 3).map((group, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#ef007e1a] font-semibold text-[#EF007E] text-sm rounded-md"
            >
              {group}
            </span>
          ))}
          {row.group.length > 3 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const modal = document.getElementById(`modal-${idx}`);
                modal.style.display = "block";
              }}
              className="text-[#007EEF] text-sm underline cursor-pointer"
            >
              +{row.group.length - 3} more
            </button>
          )}
        </div>

        {/* Modal for displaying all groups */}
        <div
          id={`modal-${idx}`}
          className="hidden absolute top-0  left-[40%] w-full bg-white shadow-lg p-4 rounded-md border border-gray-200 z-10"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Stakeholder Groups
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const modal = document.getElementById(`modal-${idx}`);
                modal.style.display = "none";
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {row.group.map((group, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#ef007e1a] font-semibold text-[#EF007E] text-sm rounded-md"
              >
                {group}
              </span>
            ))}
          </div>
          <div className="border-b border-gray-300 mt-4 my-2"></div>
        </div>
      </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.createdOn}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.dueDate}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    <div className="flex items-center justify-center ">
                    <div className="relative w-12 h-12">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        {/* Background Circle */}
                        <circle
                          className="text-gray-200"
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        {/* Progress Circle */}
                        <circle
                          className="text-green-500"
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray="100"
                          strokeDashoffset={100 - (idx + 1) * 10} // Adjust progress percentage
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Percentage Text */}
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-600">
                        {(idx + 1) * 10}%
                      </span>
                    </div>
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
    </>
  );
};

export default Table;
