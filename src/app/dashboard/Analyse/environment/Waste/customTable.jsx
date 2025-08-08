import React from 'react';

function DynamicTable({ columns, data }) {
  console.log(data,"waste data");
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
      const isTotalRow = row.material_type && row.material_type.includes('Total');

      return (
        <tr key={rowIndex}>
          {isTotalRow ? (
            <>
              <td colSpan={columns.length - row.totalrow} className="h-14 gradient-text px-4 py-2 border-y text-right font-bold text-[12px]">
                {row.material_type}
              </td>
              <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
              {Number(row.total_waste)}
              </td>
              {row.maprow === 1 && (
                <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]"></td>
              )}
              <td className="px-4 py-2 border-y text-center text-slate-500 font-bold text-[12px]">
                {row.units}
              </td>
            </>
          ) : (
            columns.map((column, columnIndex) => (
              <td key={columnIndex} className={column.cellClass}>
                {column.render ? column.render(row[column.dataIndex], row) : (
                <>
                {row[column.dataIndex]}
                {column.dataIndex === 'contribution' && <span>%</span>}
              </>
                )}
              </td>
            ))
          )}
        </tr>
      );
    });
  };

  return (
    <div className='overflow-x-auto custom-scrollbar w-full' >
    <table className="rounded-md border border-gray-300 w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
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
