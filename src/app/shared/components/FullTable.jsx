import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { MdOutlineFileUpload } from "react-icons/md";
import * as XLSX from 'xlsx';

const FullTable = ({ columns, data, onClose, organisation, corporate, location, fromDate, toDate, type }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return <FaSort className="ml-1 inline" />;
    return sortDirection === 'asc' ? <FaSortUp className="ml-1 inline" /> : <FaSortDown className="ml-1 inline" />;
  };

  const exportToExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
  
    // Prepare the data for the sheet
    const sheetData = [
      columns.map((col) => col.Header), // Headers
      ...sortedData.map((row) => columns.map((col) => row[col.accessor])) // Rows
    ];
  
    // Convert data to a worksheet
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
  
    // Auto-size columns
    const colWidths = sheetData.reduce((acc, row) => {
      row.forEach((cell, i) => {
        const cellLength = cell ? cell.toString().length : 0;
        acc[i] = Math.max(acc[i] || 0, cellLength);
      });
      return acc;
    }, {});
  
    ws['!cols'] = Object.keys(colWidths).map(i => ({ wch: colWidths[i] }));
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Export the workbook to Excel file
    XLSX.writeFile(wb, `${organisation || 'data'}_emissions_by_${type}.xlsx`);
  };

  return (
    <div className="bg-white rounded-lg relative w-full max-w-full min-h-[600px] xl:max-h-[600px] overflow-hidden">
      <div className='absolute top-0 right-2 cursor-pointer text-2xl' onClick={onClose}>&times;</div>
      <div className="flex justify-between items-center mb-4 p-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Emissions by {type}</h2>
          <p className="text-sm text-gray-500">{organisation} {corporate ? ": " + corporate : ""} {location ? ": " + location : ""}</p>
          <p className="text-sm text-gray-500">Date: {fromDate} {toDate? "to " + toDate : ""}</p>
        </div>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-1"
        >
          <MdOutlineFileUpload />
          Export
        </button>
      </div>
      <div className="overflow-x-auto max-h-[750px] overflow-y-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="gradient-background">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer h-10"
                  onClick={() => handleSort(column.accessor)}
                >
                  {column.Header} <SortIcon column={column.accessor} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.accessor} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 h-10">
                    {column.accessor === 'id' ? index + 1 : 
                     typeof row[column.accessor] === 'number' ? row[column.accessor].toLocaleString() : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullTable;

