import React from 'react';

function DynamicTable({ columns, data }) {
    const dataRows = data.filter(row => !row.Total); // Rows without a "Total" key
  const totalsRow = data.find(row => row.Total); // Row with the "Total" key, if it exists
  const totalLabel = columns.totalLabelKey || "Total"; 

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
          <td key={columnIndex} className={row[column.dataIndex]=='Total'?'gradient-text py-2 border-y px-4 font-bold text-left text-[12px]':column.cellClass}>
           {row[column.dataIndex]}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div
        style={{
          display: "block",
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "40vw",
        }}
        className="mb-2 rounded-lg table-scrollbar"
      >
    <table className="w-full rounded-lg">
      <thead className="border rounded-lg">
        <tr className="border-t border-b gradient-background">
          {renderHeaders()}
        </tr>
      </thead>
      <tbody className="border-l border-r rounded-lg">
        {renderRows()}

        {totalsRow && (
          <tr className='border'>
            <td
              colSpan={columns.totalLabelKey=="Total"?3:2}
              className="gradient-text px-4 py-2 border-y text-right font-bold text-[13px]"
            >
             {totalLabel}
            </td>
            <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
              {totalsRow.Total}
            </td>
          </tr>
        )}
       
      </tbody>
    </table>
    </div>
  );
}

export default DynamicTable;
