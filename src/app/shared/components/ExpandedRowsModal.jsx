import React, { useState, useEffect } from "react";

const Portal = ({ children }) => children;

// Status color and name mapping
const STATUS_COLORS = {
  calculated: { dot: "bg-green-500", name: "Calculated" },
  assigned: { dot: "bg-gray-500", name: "Assigned" },
  approved: { dot: "bg-orange-500", name: "Approved" },
  default: { dot: "bg-gray-300", name: "Default" },
};

// Tooltip component
function Tooltip({ children, text }) {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block px-3 py-3 bg-white text-gray-700 border border-gray-300 text-xs rounded-xl z-50 whitespace-nowrap pointer-events-none shadow-xl">
        {text}
      </div>
    </div>
  );
}

// Find index of category column (not used, but kept for possible future use)
function getCategoryColIndex(columns) {
  return columns.findIndex((col) => col.key === "category");
}

const ExpandedRowsModal = ({
  isOpen,
  onClose,
  title,
  data = [],
  columns = [],
  defaultRowsPerPage = 6,
  rowsPerPageOptions = [6, 10, 25, 50],
  renderRow = null,
  getRowStatus = null,
  getRowClassName = null,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  useEffect(() => {
    if (isOpen) setCurrentPage(1);
  }, [isOpen, data.length]);

  const handleRowsPerPageChange = (v) => {
    setRowsPerPage(v);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  function renderStatusDot(statusRaw) {
    const status = STATUS_COLORS[statusRaw] ? statusRaw : "default";
    return (
      <Tooltip text={STATUS_COLORS[status].name}>
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full ring-1 ring-gray-200 ${STATUS_COLORS[status].dot}`}
        />
      </Tooltip>
    );
  }

  function renderPagination() {
    if (totalPages < 2) return null;
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);
    }

    return (
      <>
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`w-8 h-8 flex items-center justify-center text-gray-600 rounded ${
            currentPage === 1
              ? "opacity-50 cursor-default"
              : "hover:bg-gray-100"
          } flex-shrink-0`}
          aria-label="Previous page"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
            <path
              d="M13 15l-5-5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 py-1 text-sm text-gray-400 flex-shrink-0"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 text-sm font-medium rounded transition-colors ${
                currentPage === page
                  ? "text-blue-500 bg-white border border-gray-300"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`w-8 h-8 flex items-center justify-center text-gray-600 rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-default"
              : "hover:bg-gray-100"
          } flex-shrink-0`}
          aria-label="Next page"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
            <path
              d="M7 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </>
    );
  }

  // --- Default Row Render, with status dot between SNO and CATEGORY column ---
  const defaultRenderRow = (item, index) => {
    const actualIndex = startIndex + index;
    const rowStatus = getRowStatus ? getRowStatus(item) : "default";
    const rowClassName = getRowClassName
      ? getRowClassName(item, rowStatus)
      : "";

    // Map data columns, insert dot at right position (always after SNO)
    const tds = [
      <td
        key="sno"
        className="px-4 py-3 text-sm text-gray-900 font-medium text-left"
      >
        {actualIndex + 1}
      </td>,
      <td key="dot" className="px-1 py-3 text-center align-middle">
        {renderStatusDot(rowStatus)}
      </td>
    ];
    columns.forEach((column, colIndex) =>
      tds.push(
        <td key={colIndex} className="px-4 py-3 text-sm text-gray-600">
          {column.render
            ? column.render(item, actualIndex)
            : item[column.key] || "-"}
        </td>
      )
    );

    return (
      <tr
        key={actualIndex}
        className={`border-b border-gray-200 hover:bg-gray-50 ${rowClassName}`}
      >
        {tds}
      </tr>
    );
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-[95%] h-[90vh] max-w-6xl flex flex-col shadow-xl border border-gray-300 max-h-[800px] min-h-[600px]">          <div className="flex-1 p-6 pb-4 flex flex-col min-h-0">
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {title || "Scope 1 emissions data"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none"
              >
                ×
              </button>
            </div>
            <div className="border border-gray-300 rounded-lg flex-1 overflow-hidden shadow-sm flex flex-col min-h-0">
              {/* Table header */}
              <div className="flex justify-between items-center px-4 py-4 border-b border-gray-300 flex-shrink-0">
                <div className="py-1">
                  <div className="text-sm text-gray-600 font-semibold">
                    Total no of rows:{" "}
                    <span className="text-gray-900">{data.length}</span>
                  </div>
                </div>
              </div>
              {/* Table body with scroll */}
              <div className="flex-1 min-h-0 overflow-auto">
                <table className="w-full border-none">
                  <thead className="bg-gray-100 border-b border-gray-50 sticky top-0 z-10">
                    <tr className="border-b border-gray-300 py-2">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Sno
                      </th>
                      <th className="px-1 py-3 text-center"></th>
                      {columns.map((column, idx) => (
                        <th
                          key={idx}
                          className={`px-4 py-3 text-left text-xs font-medium text-gray-700 tracking-wider ${
                            column.key === "quantity" ? "text-right" : ""
                          }`}
                        >
                          {column.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {currentData.map((item, index) => {
                      const row = renderRow
                        ? renderRow(item, index, startIndex, renderStatusDot)
                        : defaultRenderRow(item, index);

                      const mergedClassName = [
                        row.props.className,
                        index < currentData.length - 1
                          ? "border-b border-gray-200"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ");

                      return React.cloneElement(row, {
                        className: mergedClassName,
                      });
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Pagination/Footer */}
          <div className="flex justify-center items-center px-6 py-4 border-t border-gray-200 flex-shrink-0 min-h-[60px]">
  <div className="flex items-center gap-1 overflow-x-auto max-w-[70%] py-1" style={{scrollbarWidth: 'thin'}}>
    {renderPagination()}
  </div>
  <div className="flex items-center gap-2 flex-shrink-0">
              <select
                value={rowsPerPage}
                onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:border-blue-500"
              >
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {String(option).padStart(2, "0")} per page
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ExpandedRowsModal;