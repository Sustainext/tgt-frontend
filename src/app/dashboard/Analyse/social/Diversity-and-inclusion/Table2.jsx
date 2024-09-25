import React from 'react';

const Table2 = ({ data }) => {
  // Check if all rows are empty objects
  const isEmptyData = data.every(row => Object.keys(row).length === 0);

  const columns = [
    "Category",
    "Male",
    "Female",
    "Non-Binary",
    "<30 years",
    "30-50 years",
    ">50 years",
    "Minority group"
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="border border-gray-300 md:table-row gradient-background">
            <th rowSpan="2" className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-left border border-gray-300">
              Percentage of employees per employee category
            </th>
            <th colSpan="3" className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              Gender
            </th>
            <th colSpan="3" className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              Age Group
            </th>
            <th rowSpan="1" className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              Diversity groups
            </th>
          </tr>
          <tr className="border border-gray-300 md:table-row gradient-background">
            <th className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              Male
            </th>
            <th className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              Female
            </th>
            <th className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              Non-Binary
            </th>
            <th className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              {'<30 years'}
            </th>
            <th className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              30-50 years
            </th>
            <th className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              {'>50 years'}
            </th>
            <th className="px-2 py-3 font-semibold text-gray-600 block md:table-cell text-sm text-center border border-gray-300">
              {'Minority group'}
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length === 0 || isEmptyData ? (
            <tr className="border border-gray-300 md:table-row">
              <td
                colSpan={columns.length}
                className="text-center p-2 block md:table-cell text-sm h-20"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-300 md:table-row">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-2 block md:table-cell h-20 ${
                      colIndex === 0 ? 'text-center font-bold' : 'text-center'
                    } text-sm border border-gray-300`}
                  >
                    {row[column] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;

