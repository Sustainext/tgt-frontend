// import React, { useState } from 'react';
// import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
// import { MdOutlineFileUpload } from "react-icons/md";

// const data = [
//   { id: 1, source: "Business Travel", percentage: "x %", totalEmissions: 212123545, unit: "tCO2e" },
//   { id: 2, source: "Grid Electricity", percentage: "x %", totalEmissions: 212123545, unit: "tCO2e" },
//   { id: 3, source: "Refrigerant R32", percentage: "x %", totalEmissions: 212123545, unit: "tCO2e" },
//   { id: 4, source: "Employee Commute - Car", percentage: "x %", totalEmissions: 212123545, unit: "tCO2e" },
//   { id: 5, source: "Purchased Goods & Services", percentage: "x %", totalEmissions: 212123545, unit: "tCO2e" },
//   { id: 6, source: "Banana", percentage: "x %", totalEmissions: 212123545, unit: "tCO2e" },
//   { id: 7, source: "Banana", percentage: "x %", totalEmissions: 212123545, unit: "tCO2e" },
// ];

// const EmissionsTable = ({onClose, organisation, corporate, location}) => {
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');

//   const handleSort = (column) => {
//     if (sortColumn === column) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortColumn(column);
//       setSortDirection('asc');
//     }
//   };

//   const sortedData = [...data].sort((a, b) => {
//     if (!sortColumn) return 0;
    
//     const aValue = a[sortColumn];
//     const bValue = b[sortColumn];

//     if (typeof aValue === 'string') {
//       return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
//     } else {
//       return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
//     }
//   });

//   const SortIcon = ({ column }) => {
//     if (sortColumn !== column) return <FaSort className="ml-1 inline" />;
//     return sortDirection === 'asc' ? <FaSortUp className="ml-1 inline" /> : <FaSortDown className="ml-1 inline" />;
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md relative">
//     <div className='absolute top-0 right-2 cursor-pointer text-lg' onClick={onClose}>&times;</div>
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h2 className="text-xl font-semibold">Top Emissions by Source</h2>
//           <p className="text-sm text-gray-500">{organisation} {corporate ? ":" + corporate : ""} {location ? ":" + location : ""}</p>
//           <p className="text-sm text-gray-500">Date: 31/02/1994</p>
//         </div>
//         <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-1">
//         <MdOutlineFileUpload />
//           Export
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 S.no
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('source')}>
//                 Source <SortIcon column="source" />
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('percentage')}>
//                 %age contribution <SortIcon column="percentage" />
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('totalEmissions')}>
//                 Total Emissions <SortIcon column="totalEmissions" />
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Unit
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {sortedData.map((row) => (
//               <tr key={row.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.source}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.percentage}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.totalEmissions.toLocaleString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.unit}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmissionsTable;

import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { MdOutlineFileUpload } from "react-icons/md";
import * as XLSX from 'xlsx';

const FullTable = ({ columns, data, onClose, organisation, corporate, location }) => {
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

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Export the workbook to Excel file
    XLSX.writeFile(wb, `${organisation || 'data'}_export.xlsx`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <div className='absolute top-0 right-2 cursor-pointer text-lg' onClick={onClose}>&times;</div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Top Emissions by Source</h2>
          <p className="text-sm text-gray-500">{organisation} {corporate ? ":" + corporate : ""} {location ? ":" + location : ""}</p>
          <p className="text-sm text-gray-500">Date: 31/02/1994</p>
        </div>
        <button
        //   onClick={exportToExcel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-1"
        >
          <MdOutlineFileUpload />
          Export
        </button>
      </div>
      <div className="overflow-x-auto max-h-[650px] overflow-y-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                  <td key={column.accessor} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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

