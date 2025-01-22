import React from 'react';

const DynamicTable2 = ({ data, columns }) => {
  // Check if all rows are empty objects
  const isEmptyData = data.every(row => Object.keys(row).length === 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse  block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="border border-gray-300 md:table-row gradient-background">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`px-2 py-3  text-[#727272] block md:table-cell  text-[12px] ${index==0?'text-left':'text-left'} `}
              >
                
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length === 0 || isEmptyData ? (
               <tr className='border'>
              <td
                colSpan={columns.length}
               className="text-center py-4 text-[12px] font-[400]"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-300 md:table-row">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-2 border-y text-slate-500 font-normal text-[12px] w-[50%] text-center h-14`}
                  >
                       {row[column] !== undefined && row[column] !== null
                      ? colIndex === 0 ? row[column] : `${row[column]}%`
                      : 'N/A'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable2;
