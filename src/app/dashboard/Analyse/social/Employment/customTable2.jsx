import React from 'react';

const DynamicTable2 = ({ data, columns }) => {
  const renderCellContent = (content) => {
    if (typeof content === "boolean") {
      return content ? "Yes" : "No"; // Corrected typo from 'flase' to 'false'
    }
    return content;
  };

  return (
    <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
        <tr className="border border-gray-300 md:table-row gradient-background">
          {columns.map((column, index) => (
            <th
              key={index} // Using index as key since column might not be unique or string
              className={`px-2 py-3  text-[#727272] block md:table-cell text-[12px] ${
                index === 0 ? 'text-left' : 'text-center'
              }`}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border border-gray-300 md:table-row">
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-2 block md:table-cell  ${
                    colIndex === 0 ? 'text-left font-bold' : 'text-center font-normal text-slate-500'
                  } text-[12px]`}
                >
                   {renderCellContent(row[column])}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr className="border border-gray-300 md:table-row">
            <td colSpan={columns.length} className="p-2 text-center text-[12px] text-slate-500 font-normal">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DynamicTable2;
