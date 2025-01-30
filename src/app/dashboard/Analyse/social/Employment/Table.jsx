import React from 'react';

function Table({ columns, data }) {
  // Calculate the total number of columns
  const totalColumns = columns.reduce((acc, column) => acc + (column.colSpan || 1), 0);

  return (
    <div className="container mx-auto">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="gradient-background block md:table-row">
            {/* Main headers */}
            {columns.map((column, index) => (
              <th
                key={index}
                colSpan={column.colSpan || 1}
                className="p-2 text-[#727272] border-x border-b block md:table-cell text-[12px]"
              >
                {column.header}
              </th>
            ))}
          </tr>
          <tr className="gradient-background block md:table-row">
            {/* Subheaders */}
            <th className="p-2 text-slate-500 font-bold border-x block md:table-cell"></th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">Male</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">Female</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">Non-Binary</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">&lt;30 years</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">30-50 years</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">&gt;50 years</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">Minority group</th>
            <th className="p-2 text-slate-500 font-bold border-l border-t block md:table-cell text-[12px]">Vulnerable Communities</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border block md:table-row">
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['Employee category'] || '-'}
                </td>
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['Male'] || '-'}
                </td>
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['Female'] || '-'}
                </td>
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['NonBinary'] || '-'}
                </td>
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['ageBelow30'] || '-'}
                </td>
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['age30To50'] || '-'}
                </td>
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['ageAbove50'] || '-'}
                </td>
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['Minoritygroup'] || '-'}
                </td>
                <td className="p-2 text-center text-[12px] font-[400] border-x block md:table-cell">
                  {row['VulnerableCommunities'] || '-'}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border">
              <td colSpan={totalColumns} className="p-2 text-center text-[12px] font-[400]">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
