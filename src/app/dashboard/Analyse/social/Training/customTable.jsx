import React from "react";


const Table = ({ data }) => {
  // Separate employee categories and genders from the data
  const employeeCategories = data.filter((item) => item.category);
  const genders = data.filter((item) => item.gender);

  return (
    <div>
      <table
        className="min-w-full rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="gradient-background">
          <tr>
            <th className="px-4 py-2 h-[54px]"></th>
            <th className="px-4 py-2 h-[54px]"></th>
            <th className="border-l border-gray-300  px-4 py-2 text-center text-[12px] text-[#00000] h-[54px]">
              <div className="flex items-center relative">
                <p>
                Percentage of employees who received regular performance review
                </p>
           
              </div>
            </th>
            <th className="border-l border-gray-300 px-4 py-2 text-center text-[12px] text-[#00000] h-[54px]">
              <div className="flex items-center relative">
                <p>
                Number of employees who received regular career development review
                </p>
               
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeCategories.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="border-t border-gray-300 px-4 py-2 text-center text-[12px] text-[#00000]"
              >
              No data available
              </td>
            </tr>
          ) : (
            employeeCategories.map((row, index) => (
              <tr key={`employee-${index}`}>
                {index === 0 && (
                  <td
                    className="border-t border-gray-300 px-4 py-2 text-[12px] text-[#00000] gradient-background text-center"
                    rowSpan={employeeCategories.length}
                  >
                    <div className="flex items-center relative">
                      <p>Employee Category</p>
                   
                    </div>
                  </td>
                )}
                <td className="border-l border-t border-gray-300 px-4 py-2 text-[12px] text-[#00000]">
                  {row.category}
                </td>
                <td className="border-l border-t border-gray-300 px-4 py-2 text-center text-[12px]">
                  {row.performance_percentage}%
                </td>
                <td className="border-t border-l border-gray-300 px-4 py-2 text-center text-[12px]">
                  {row.career_development_percentage}%
                </td>
              </tr>
            ))
          )}

          {employeeCategories.length > 0 &&
            genders.map((row, index) => (
              <tr key={`gender-${index}`}>
                {index === 0 && (
                  <td
                    className="border-t border-gray-300 px-4 py-2 text-[12px] text-[#00000] gradient-background text-center"
                    rowSpan={genders.length}
                  >
                    Gender
                  </td>
                )}
                <td className="border-l border-t border-gray-300 px-4 py-2 text-[12px] text-[#00000]">
                  {row.gender}
                </td>
                <td className="border-l border-t border-gray-300 px-4 py-2 text-center text-[12px]">
                  {row.performance_percentage}%
                </td>
                <td className="border-t border-l border-gray-300 px-4 py-2 text-center text-[12px]">
                  {row.career_development_percentage}%
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
