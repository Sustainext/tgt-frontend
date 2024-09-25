import React from 'react';

const DynamicTable = ({ data, columns }) => {
  // Check if data is empty
  const isEmptyData = data && Object.keys(data).length === 0;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="min-w-full w-full border-collapse border border-gray-300">
        <thead className="block md:table-header-group">
          <tr className="md:table-row gradient-background border border-gray-300">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-2 py-3 font-semibold text-gray-600 block md:table-cell text-[12px] capitalize border border-gray-300`}
                style={index === 0 || index === 1 ? { width: '11rem', textAlign: 'center' } : { textAlign: 'left' }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group border-b border-gray-300">
          {isEmptyData ? (
            <tr className="md:table-row border border-gray-300">
              <td
                colSpan={columns.length}
                className="text-center p-2 block md:table-cell text-sm border border-gray-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            Object.keys(data).map((location, locationIndex) => {
              const employees = data[location];

              return (
                <React.Fragment key={locationIndex}>
                  {employees.length > 0 ? (
                    employees.map((employee, employeeIndex) => (
                      <tr key={`${locationIndex}-${employeeIndex}`} className="md:table-row">
                        {/* Only render the location cell for the first row under each location */}
                        {employeeIndex === 0 && (
                          <td
                            rowSpan={employees.length} // Span across all rows for this location
                            className="p-2 block md:table-cell text-center text-sm border-r border-t border-l border-gray-300"
                          >
                            {location}
                          </td>
                        )}
                        {columns.slice(1).map((columnKey, colIndex) => (
                          <td
                            key={colIndex}
                            className="p-2 block md:table-cell text-center text-sm border border-gray-300"
                          >
                            {colIndex === 3 // Assuming index 3 is the percentage column
                              ? `${employee[columnKey] || 'N/A'}%` // Add % symbol for the last column
                              : employee[columnKey] !== undefined
                              ? employee[columnKey]
                              : 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr key={locationIndex} className="md:table-row">
                      <td
                        colSpan={columns.length}
                        className="text-center p-2 block md:table-cell text-sm border border-gray-300"
                      >
                        No data available for {location}
                      </td>
                    </tr>
                  )}

                  {/* Total row for this location */}
                  {employees.length > 0 && (
                    <tr className="md:table-row border-r border-l border-gray-300">
                      <td></td>
                      <td className="p-2 block total md:table-cell text-center text-sm font-bold border border-gray-300">
                        Total
                      </td>
                      {/* Column 3 */}
                      <td className="p-2 block md:table-cell text-center text-sm border border-gray-300">
                        {employees.reduce((acc, employee) => acc + parseFloat(employee[columns[2]] || 0), 0)}
                      </td>
                      {/* Column 4 */}
                      <td className="p-2 block md:table-cell text-center text-sm border border-gray-300">
                        {employees.reduce((acc, employee) => acc + parseFloat(employee[columns[3]] || 0), 0)}
                      </td>
                      {/* Column 5 (calculated as (column 3 / column 4) * 100 with % symbol) */}
                      <td className="p-2 block md:table-cell text-center text-sm border border-gray-300">
                        {(() => {
                          const totalColumn3 = employees.reduce((acc, employee) => acc + parseFloat(employee[columns[2]] || 0), 0);
                          const totalColumn4 = employees.reduce((acc, employee) => acc + parseFloat(employee[columns[3]] || 0), 0);
                          const percentage = totalColumn4 > 0
                            ? parseFloat(((totalColumn3 / totalColumn4) * 100).toFixed(2)) % 1 === 0
                              ? ((totalColumn3 / totalColumn4) * 100).toFixed(0)
                              : ((totalColumn3 / totalColumn4) * 100).toFixed(2)
                            : 'N/A';
                          return `${percentage}%`; // Add % sign even for N/A
                        })()}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
