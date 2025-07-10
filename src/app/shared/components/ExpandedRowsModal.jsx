'use client';
import React, { useState, useEffect } from 'react';
import Portal from './Portal';

const ExpandedRowsModal = ({
  isOpen,
  onClose,
  title,
  data = [],
  columns = [],
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
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

    // Always show first page
    pages.push(1);

    // Add ellipsis if needed
    if (currentPage > 3) {
      pages.push('...');
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
      pages.push('...');
    }

    // Always show last page if there's more than one page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span
            key={`ellipsis-${index}`}
            className='px-3 py-1 text-sm text-gray-500'
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 text-sm border rounded transition-colors ${
            currentPage === page
              ? 'bg-blue-500 text-white border-blue-500'
              : 'hover:bg-gray-50 border-gray-300'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  const defaultRenderRow = (item, index) => {
    const actualIndex = startIndex + index;
    const rowStatus = getRowStatus ? getRowStatus(item) : 'default';
    const rowClassName = getRowClassName
      ? getRowClassName(item, rowStatus)
      : '';

    return (
      <tr key={actualIndex} className={`hover:bg-gray-50 ${rowClassName}`}>
        <td className='px-4 py-2 text-sm text-gray-900'>{actualIndex + 1}</td>
        {columns.map((column, colIndex) => (
          <td key={colIndex} className='px-4 py-2 text-sm text-gray-900'>
            {column.render
              ? column.render(item, actualIndex)
              : item[column.key] || '-'}
          </td>
        ))}
      </tr>
    );
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center -z--1000'>
        <div className='bg-white rounded-lg w-[95%] h-[90%] max-w-7xl flex flex-col'>
          {/* Modal Header */}
          <div className='flex justify-between items-center p-4 border-b'>
            <div className='flex items-center space-x-4'>
              <h2 className='text-xl font-semibold'>{title}</h2>
              <div className='text-sm text-gray-500'>
                Total: {data.length} rows
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-2'>
                <label className='text-sm font-medium'>Rows per page:</label>
                <select
                  value={rowsPerPage}
                  onChange={(e) =>
                    handleRowsPerPageChange(Number(e.target.value))
                  }
                  className='border rounded px-2 py-1 text-sm'
                >
                  {rowsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 text-xl font-bold'
              >
                ×
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className='flex-1 overflow-hidden'>
            <div className='h-full overflow-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50 sticky top-0'>
                  <tr>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      #
                    </th>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {currentData.map((item, index) =>
                    renderRow
                      ? renderRow(item, index, startIndex)
                      : defaultRenderRow(item, index)
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Footer with Pagination */}
          <div className='flex justify-between items-center p-4 border-t'>
            <div className='text-sm text-gray-500'>
              Showing {startIndex + 1} to {endIndex} of {data.length} results
            </div>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Previous
              </button>

              {renderPagination()}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ExpandedRowsModal;
