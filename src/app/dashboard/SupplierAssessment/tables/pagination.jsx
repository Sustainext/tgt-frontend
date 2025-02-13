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
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
    onPageChange(1, Number(e.target.value));
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="">
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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
        ))}
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
      <div className="">
        {/* <span className="text-gray-600 mr-2">Rows per page:</span> */}
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border border-gray-300 rounded-md px-3 text-sm py-1"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option} className="text-[13px]">
              {option} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
