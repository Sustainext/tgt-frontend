import React from 'react';

const Table = ({ employeeCategories }) => {
  // Default employee categories if none are provided
  const defaultEmployeeCategories = ['A', 'B'];
  const categories = employeeCategories && employeeCategories.length > 0 ? employeeCategories : defaultEmployeeCategories;

  // Gender is fixed
  const genders = ['Male', 'Female', 'Non-Binary'];

  // Headers
  const headers = [
    'Percentage of employees who received regular performance review',
    'Number of employees who received regular career development review',
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse block md:table w-full rounded-lg overflow-hidden">
        <thead className="block md:table-header-group border">
          <tr className="border border-gray-300 md:table-row gradient-background">
            <th
              rowSpan="2"
              className="px-2 py-3 text-[#727272] block md:table-cell text-left text-[12px] border"
            >
              Employee Category
            </th>
            <th
              rowSpan="2"
              className="px-2 py-3 text-[#727272] block md:table-cell text-left text-[12px] border"
            >
              Gender
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                colSpan="1"
                className="px-2 py-3 text-[#727272] block md:table-cell text-center text-[12px] border"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {categories.map((category, catIndex) => (
            <React.Fragment key={catIndex}>
              {genders.map((gender, genderIndex) => (
                <tr key={genderIndex} className="border border-gray-300 md:table-row">
                  {/* Only display the category cell for the first row of each category */}
                  {genderIndex === 0 && (
                    <td
                      rowSpan={genders.length}
                      className="p-2 block md:table-cell text-left font-normal text-slate-500 text-[12px] border"
                    >
                      {category}
                    </td>
                  )}
                  <td className="p-2 block md:table-cell text-left font-normal text-slate-500 text-[12px] border">
                    {gender}
                  </td>
                  <td className="p-2 block md:table-cell text-center font-normal text-slate-500 text-[12px] border">
                    {/* Placeholder for data */}
                    {/* Replace with actual data or input */}
                    N/A
                  </td>
                  <td className="p-2 block md:table-cell text-center font-normal text-slate-500 text-[12px] border">
                    {/* Placeholder for data */}
                    {/* Replace with actual data or input */}
                    N/A
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
