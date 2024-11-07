import React from 'react';

const Table1 = ({ data1, columns1 }) => {
  // Columns structure
  const columns = [
    {
      mainHeader: 'Gender',
      subHeaders: ['Male', 'Female', 'Non-Binary', 'Total number of employees'],
    },
    {
      mainHeader: 'Age Group',
      subHeaders: ['< 30 years', '30-50 years', '> 50 years', 'Total number of employees'],
    },
    {
      mainHeader: 'Diversity Groups',
      subHeaders: ['Minority group', 'Vulnerable Communities'],
    },
  ];

  // Data structure reflecting table values (as shown in the image)
  const data = [
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // Single row of data for simplicity
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="border border-gray-300 md:table-row gradient-background">
            {/* Main headers with colSpan */}
            {columns.map((header, index) => (
              <th
                key={index}
                colSpan={header.subHeaders.length}
                className="px-2 py-3 text-[#727272] block md:table-cell text-center text-[12px] border"
              >
                {header.mainHeader}
              </th>
            ))}
          </tr>
          <tr className="border border-gray-300 md:table-row gradient-background">
            {/* Sub-headers */}
            {columns.map((header) =>
              header.subHeaders.map((subHeader, index) => (
                <th
                  key={index}
                  className="px-2 py-3 text-[#727272] block md:table-cell text-center text-[12px] border"
                >
                  {subHeader}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border border-gray-300 md:table-row">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="p-2 block md:table-cell text-center font-normal text-slate-500 text-[12px] border"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table1;
