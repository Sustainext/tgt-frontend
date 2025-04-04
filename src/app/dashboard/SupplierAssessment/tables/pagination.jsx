"use client";
import React, { useState } from "react";

const Pagination = ({ totalItems, rowsPerPageOptions, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1, rowsPerPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1, rowsPerPage);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page, rowsPerPage);
  };

  const handleRowsPerPageChange = (e) => {
    const newValue = Number(e.target.value);
    setRowsPerPage(newValue);
    setCurrentPage(1);
    onPageChange(1, newValue);
  };

  return (
    <div className="w-full mt-6 mb-4 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center  gap-4">
        {/* Pagination Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-100"
            }`}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              totalPages > 5 &&
              Math.abs(page - currentPage) > 2 &&
              page !== 1 &&
              page !== totalPages
            ) {
              if (
                (currentPage <= 3 && page > 5) ||
                (currentPage >= totalPages - 2 && page < totalPages - 4)
              ) {
                return null;
              }

              if (
                page === currentPage - 3 ||
                page === currentPage + 3 ||
                page === 2 ||
                page === totalPages - 1
              ) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }

              return null;
            }

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-white shadow-md text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-100"
            }`}
          >
            &gt;
          </button>
        </div>

        {/* Rows per page */}
        <div className="flex items-center gap-2">
        
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded-md px-3 text-sm py-1"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
