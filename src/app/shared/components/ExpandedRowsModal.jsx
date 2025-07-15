import React, { useState, useEffect } from "react";

// Simple Portal component for demonstration
const Portal = ({ children }) => {
  return children;
};

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

  // Reset to page 1 when modal opens or data changes
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen, data.length]);

  // Reset to page 1 when rows per page changes
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  const renderPagination = () => {
    const pages = [];

    // Show all pages if total pages <= 5
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Add ellipsis if needed
      if (currentPage > 3) {
        pages.push("...");
      }

      // Add pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      // Add ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page if there's more than one page
      if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-2 py-1 text-sm text-gray-400"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-8 h-8 text-sm font-medium rounded transition-colors ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  const defaultRenderRow = (item, index) => {
    const actualIndex = startIndex + index;
    const rowStatus = getRowStatus ? getRowStatus(item) : "default";
    const rowClassName = getRowClassName
      ? getRowClassName(item, rowStatus)
      : "";

    return (
      <tr
        key={actualIndex}
        className={`border-b border-gray-100 ${rowClassName}`}
      >
        <td className="px-4 py-3 text-sm text-gray-900 font-medium">
          {actualIndex + 1}
        </td>
        {columns.map((column, colIndex) => (
          <td key={colIndex} className="px-4 py-3 text-sm text-gray-600">
            {column.render
              ? column.render(item, actualIndex)
              : item[column.key] || "-"}
          </td>
        ))}
      </tr>
    );
  };

  const getStatusDot = (item) => {
    const status = getRowStatus ? getRowStatus(item) : item.status || "default";
    const statusColors = {
      assigned: "bg-gray-500",
      approved: "bg-orange-500",
      calculated: "bg-green-500",
      default: "bg-green-500",
    };
    return statusColors[status] || statusColors.default;
  };

  const getDefaultRowClassName = (item) => {
    const rowType = getRowStatus ? getRowStatus(item) : item.status || "";
    return rowType === "assigned"
      ? "bg-gray-50"
      : rowType === "approved"
      ? "bg-orange-50"
      : rowType === "calculated"
      ? "bg-green-50"
      : "";
  };

  const customRenderRow = (item, index) => {
    const actualIndex = startIndex + index;

    return (
      <tr
        key={actualIndex}
        className="border-b border-gray-100 hover:bg-gray-50"
      >
        <td className="px-4 py-3 text-sm text-gray-900 font-medium">
          {actualIndex + 1}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusDot(item)}`}></div>
            {item.category}
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{item.subCategory}</td>
        <td className="px-4 py-3 text-sm text-gray-600 max-w-md">
          <div className="truncate" title={item.activity}>
            {item.activity}
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600 text-right">
          {item.quantity}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{item.unit}</td>
      </tr>
    );
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[95%] h-[75%] max-w-6xl flex flex-col shadow-xl">
          <div className="h-full p-6 pb-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {title || "Scope 1 emissions data"}
          </h2>

          <div className="border border-gray-200 rounded-lg h-full overflow-auto py-3">
            {/* Modal Header */}
            <div className="flex justify-between items-start px-3">
              <div>
                <div className="text-sm text-gray-500 font-bold">
                  Total no of rows: {data.length}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sno
                      </th>
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                            column.key === "quantity" ? "text-right" : ""
                          } ${column.key === "Category" ? "ml-3" : ""}`}
                        >
                          {column.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {currentData.map((item, index) =>
                      renderRow
                        ? renderRow(item, index, startIndex)
                        : defaultRenderRow(item, index)
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>

          {/* Modal Footer with Pagination */}
          <div className="flex justify-center items-center px-6 py-4 border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {renderPagination()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={rowsPerPage}
                onChange={(e) =>
                  handleRowsPerPageChange(Number(e.target.value))
                }
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
