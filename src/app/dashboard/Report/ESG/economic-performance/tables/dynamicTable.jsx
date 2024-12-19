import React from 'react';

const DynamicTable = ({ data, columns,title }) => {
  // Check if data is empty
  const isEmptyData = !data || data.length === 0;

  return (
    <div    style={{
      display: "block",
      overflowX: "auto",
      maxWidth: "100%",
      minWidth: "100%",
      width: "40vw",
    }}
    className="mb-2 table-scrollbar">
      <table className="min-w-full w-full rounded-lg border border-gray-300" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="block md:table-header-group  gradient-background">
        <tr className="text-[12px] border-b border-gray-200">
            <th colSpan={5} className="p-4 text-start text-gray-500 border-b">
              {title}
            </th>
          </tr>
          <tr className="md:table-row border border-gray-300">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-4 text-[#727272] block md:table-cell text-center text-[12px] border-gray-300 ${index === 0 ? "" : "border-l"}`}
                style={index === 0 || index === 1 ? { width: '11rem', textAlign: 'center' } : { textAlign: 'center' }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-t border-gray-300">
          {isEmptyData ? (
            <tr className="border-t border-gray-300">
              <td
                colSpan={columns.length}
                className="text-center p-4 block md:table-cell text-[12px] font-normal text-slate-500 border-t border-gray-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="md:table-row">
                <td className="p-4 block md:table-cell text-center text-[12px] border-r border-t border-gray-300">{item.loc}</td>
                <td className="p-4 block md:table-cell text-center text-[12px] border-r border-t border-gray-300">{item.total_communicated}</td>
                <td className="p-4 block md:table-cell text-center text-[12px] border-r border-t border-gray-300">{item.total_region}</td>
                <td className="p-4 block md:table-cell text-center text-[12px] border-r border-t border-gray-300">{item.percentage}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
