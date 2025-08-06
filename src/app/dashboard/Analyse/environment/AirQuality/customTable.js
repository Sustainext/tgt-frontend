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
    <div className='overflow-x-auto custom-scrollbar w-full' >
    <table className="rounded-md border border-gray-300 w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
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
              className="gradient-text px-4 py-2 border-y text-right font-bold text-[12px]"
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
