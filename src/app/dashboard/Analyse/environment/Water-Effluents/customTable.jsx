import React from 'react';

function DynamicTable({ columns, data }) {
  const dataRows = data.filter(row => !row.Total); // Rows without a "Total" key
  const totalsRow = data.find(row => row.Total); // Row with the "Total" key, if it exists
  const totalLabel = columns.totalLabelKey || "Total"; // Dynamic Total Label

  const renderHeaders = () => {
    return columns.map((column, index) => (
      <th key={index} className={column.headerClass}>
        {column.label}
      </th>
    ));
  };

  const renderRows = () => {
    if (dataRows.length === 0) {
      return (
        <tr className="border">
          <td colSpan={columns.length} className="text-center py-4 text-[12px]">
            No data available
          </td>
        </tr>
      );
    }
    return dataRows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map((column, columnIndex) => (
          <td key={columnIndex} className={column.cellClass}>
            {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <table className="w-full rounded-lg overflow-hidden">
      <thead className="border rounded-lg">
        <tr className="border-t border-b gradient-background">
          {renderHeaders()}
        </tr>
      </thead>
      <tbody className="border-l border-r rounded-lg">
        {renderRows()}

        {/* Dynamic Total Row */}
        {totalsRow && (
          <tr>
            <td
              colSpan={columns.length - 2}
              className="h-14 gradient-text px-4 py-2 border-y text-right font-bold text-[12px]"
            >
              {totalLabel}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
              {totalsRow.Total}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
              {totalsRow.Units || totalsRow.Unit}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default DynamicTable;
