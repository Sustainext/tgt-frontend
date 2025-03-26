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
    return data.map((row, rowIndex) => {
      const isTotalRow = row['Energy_type']?.toString().includes('Total');
      const hasDoubleTotals = row.hasOwnProperty('Quantity2') && row.hasOwnProperty('Unit2');

      if (isTotalRow) {
        const colSpanValue = columns.length - (hasDoubleTotals ? 4 : 2);

        if (hasDoubleTotals) {
          return (
            <tr key={rowIndex}>
              <td
                colSpan={colSpanValue}
                className="h-14 gradient-text px-4 py-2 border-y text-right font-bold text-[12px]"
              >
                {row['Energy_type']}
              </td>
              <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
                {row['Quantity1']}
              </td>
              <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
                {row['Unit1']}
              </td>
              <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
                {row['Quantity2']}
              </td>
              <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
                {row['Unit2']}
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={rowIndex}>
              <td
                colSpan={colSpanValue}
                className="h-14 gradient-text px-4 py-2 border-y text-right font-bold text-[12px]"
              >
                {row['Energy_type']}
              </td>
              <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
                {row['Quantity']}
              </td>
              <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
                {row['Unit']}
              </td>
            </tr>
          );
        }
      } else {
        return (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex} className={column.cellClass}>
                {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
              </td>
            ))}
          </tr>
        );
      }
    });
  };

  return (
    <div className=' overflow-auto custom-scrollbar'>
    <table className="rounded-md border border-gray-300  w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
      <thead className="border rounded-lg">
        <tr className="border-t border-b gradient-background">{renderHeaders()}</tr>
      </thead>
      <tbody className="border-l border-r rounded-lg">
        {renderRows()}
      </tbody>
    </table>
    </div>

  );
}

export default DynamicTable;
