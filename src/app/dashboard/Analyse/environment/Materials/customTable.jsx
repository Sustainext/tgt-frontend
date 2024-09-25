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
          <td colSpan={columns.length} className="text-center py-4">
            No data available
          </td>
        </tr>
      );
    }
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.type.includes('Total') ? (
          <>
            <td colSpan={columns.length - 3} className="h-14  px-4 py-2 border-y text-right gradient-text text-opacity-20 font-bold text-sm">
              {row.type}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-sm">
              {row.total}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-sm">
              {row.units}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-sm"></td>
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
    <table className="w-full rounded-lg overflow-hidden">
      <thead className="border rounded-lg">
        <tr className="border-t border-b gradient-background">{renderHeaders()}</tr>
      </thead>
      <tbody className="border-l border-r rounded-lg">
        {renderRows()}
      </tbody>
    </table>
  );
}

export default DynamicTable;
