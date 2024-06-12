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
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.type.includes('Total') ? (
          <>
            <td colSpan={columns.length - 2} className="h-14 gradient-text px-4 py-2 border-y text-right font-bold text-sm">
              {row.type}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-sm">
              {row.consumption}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-sm">
              {row.units}
            </td>
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
