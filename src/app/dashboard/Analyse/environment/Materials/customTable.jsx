import React from 'react';

function DynamicTable({ columns, data }) {
  const renderHeaders = () => {
    return columns.map((column, index) => (
      <th key={index} className={column.headerClass}>
        {column.label}
      </th>
    ));
  };

  const renderRows = () => {
    if (data.length === 0) {
      // Return a row with a message that there is no data, spanning all columns
      return (
        <tr className='border'>
          <td colSpan={columns.length} className="text-center py-4 text-[12px]">
            No data available
          </td>
        </tr>
      );
    }
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.type.includes('Total') ? (
          <>
            <td colSpan={columns.length - 3} className="h-14  px-4 py-2 border-y text-right gradient-text text-opacity-20 font-bold text-[12px] ">
              {row.type}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px] ">
              {row.total}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px] ">
              {row.units}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px] "></td>
          </>
        ) : (
          columns.map((column, columnIndex) => (
            <td key={columnIndex} className={column.cellClass}>
              {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
            </td>
          ))
        )}
      </tr>
    ));
  };

  return (

     <div className='overflow-auto custom-scrollbar ' >
    <table className="rounded-md border border-gray-300  w-full min-w-[828px] " style={{ borderCollapse: "separate", borderSpacing: 0 }}>
      <thead >
        <tr className="border-t border-b  border-gray-300 gradient-background">{renderHeaders()}</tr>
      </thead>
      <tbody className="border-l border-t  border-r border-gray-300 ">
        {renderRows()}
      </tbody>
    </table>
    </div>
  );
}

export default DynamicTable;
