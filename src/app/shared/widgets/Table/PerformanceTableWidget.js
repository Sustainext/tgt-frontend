import React from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
const PerformanceTable = ({ value = {}, onChange }) => {
  const { employeeCategories = [], genders = [] } = value;

  // Function to calculate totals for performance and career development only for genders
  const calculateGenderTotals = () => {
    let totalPerformance = 0;
    let totalCareerDevelopment = 0;

    genders.forEach((row) => {
      totalPerformance += parseInt(row.performance || 0, 10);
      totalCareerDevelopment += parseInt(row.careerDevelopment || 0, 10);
    });

    return { totalPerformance, totalCareerDevelopment };
  };

  const totals = calculateGenderTotals();

  // Debounced update functions to improve performance during rapid changes
  const updateCategoriesDebounced = debounce((updatedCategories) => {
    onChange({
      ...value,
      employeeCategories: updatedCategories,
    });
  }, 300);

  const updateGendersDebounced = debounce((updatedGenders) => {
    onChange({
      ...value,
      genders: updatedGenders,
    });
  }, 300);

  // Update functions for real-time changes
  const handleEmployeeCategoryChange = (index, field, fieldValue) => {
    const updatedCategories = employeeCategories.map((item, idx) =>
      idx === index ? { ...item, [field]: fieldValue } : item
    );

    // Immediate update
    onChange({
      ...value,
      employeeCategories: updatedCategories,
    });

    // Uncomment this to use debounce for better performance
    // updateCategoriesDebounced(updatedCategories);
  };

  const handleGenderChange = (index, field, fieldValue) => {
    const updatedGenders = genders.map((item, idx) =>
      idx === index ? { ...item, [field]: fieldValue } : item
    );

    // Immediate update
    onChange({
      ...value,
      genders: updatedGenders,
    });

    // Uncomment this to use debounce for better performance
    // updateGendersDebounced(updatedGenders);
  };

  return (
    <div className="p-4">
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
                  Number of employees who received regular performance review{" "}
                </p>

                <MdInfoOutline
                  data-tooltip-id={`test123`}
                  data-tooltip-content="Regular performance and career development review: Review based on criteria known to the employee and his or her superior."
                  className="cursor-pointer ml-1 w-[20%]"
                />
                <ReactTooltip
                  id={`test123`}
                  place="top"
                  effect="solid"
                  style={{
                    width: "400px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                    zIndex: "1000",
                  }}
                />
              </div>
            </th>
            <th className="border-l border-gray-300 px-4 py-2 text-center text-[12px] text-[#00000] h-[54px]">
              <div className="flex items-center relative">
                <p>
                  Number of employees who received regular career development
                  review{" "}
                </p>

                <MdInfoOutline
                  data-tooltip-id={`test124`}
                  data-tooltip-content="Regular performance and career development review: Review based on criteria known to the employee and his or her superior."
                  className="cursor-pointer ml-1 w-[20%]"
                />
                <ReactTooltip
                  id={`test124`}
                  place="top"
                  effect="solid"
                  style={{
                    width: "400px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                    zIndex: "1000",
                  }}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
  {/* If employeeCategories is empty, show a message */}
  {employeeCategories.length === 0 ? (
    <tr>
      <td
        colSpan="4"
        className="border-t border-gray-300 px-4 py-2 text-center text-[12px] text-[#00000]"
      >
        No employee categories available. Please add data to continue.
      </td>
    </tr>
  ) : (
    // Render Employee Categories if not empty
    employeeCategories.map((row, index) => (
      <tr key={`employee-${index}`}>
        {index === 0 && (
          <td
            className="border-t border-gray-300 px-4 py-2 text-[12px] text-[#00000] gradient-background text-center"
            rowSpan={employeeCategories.length}
          >
            <div className="flex items-center relative">
              <p>Employee Category</p>
              <MdInfoOutline
                data-tooltip-id={`test126`}
                data-tooltip-content="Please specify the employee category."
                className="cursor-pointer ml-1 w-[20%]"
              />
              <ReactTooltip
                id={`test126`}
                place="top"
                effect="solid"
                style={{
                  width: "400px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  zIndex: "1000",
                }}
              />
            </div>
          </td>
        )}
        <td className="border-l border-t border-gray-300 px-4 py-2 text-[12px] text-[#00000]">
          {row.category}
        </td>
        <td className="border-l border-t border-gray-300 px-4 py-2 text-center">
          <input
            type="number"
            value={row.performance}
            onChange={(e) =>
              handleEmployeeCategoryChange(index, "performance", e.target.value)
            }
            className="border p-1 w-full text-center text-[12px]"
          />
        </td>
        <td className="border-t border-l border-gray-300 px-4 py-2 text-center">
          <input
            type="number"
            value={row.careerDevelopment}
            onChange={(e) =>
              handleEmployeeCategoryChange(
                index,
                "careerDevelopment",
                e.target.value
              )
            }
            className="border p-1 w-full text-center text-[12px]"
          />
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
                <td className="border-l border-t border-gray-300 px-4 py-2 text-center">
                  <input
                    type="number"
                    value={row.performance}
                    onChange={(e) =>
                      handleGenderChange(index, "performance", e.target.value)
                    }
                    className="border p-1 w-full text-center text-[12px]"
                  />
                </td>
                <td className="border-t border-l border-gray-300 px-4 py-2 text-center">
                  <input
                    type="number"
                    value={row.careerDevelopment}
                    onChange={(e) =>
                      handleGenderChange(index, "careerDevelopment", e.target.value)
                    }
                    className="border p-1 w-full text-center text-[12px]"
                  />
                </td>
              </tr>
            ))}


  {/* Totals Row */}
  {employeeCategories.length > 0 ? (
    <tr>
      <td className="border-t border-gray-300 px-4 py-2 text-[12px] text-[#00000] gradient-background text-center">
        Total employee
      </td>
      <td className="border-l border-t border-gray-300 px-4 py-2 text-center"></td>
      <td className="border-l border-t border-gray-300 px-4 py-2 text-center text-[12px] text-[#00000]">
        {totals.totalPerformance}
      </td>
      <td className="border-l border-t border-gray-300 px-4 py-2 text-center text-[12px] text-[#00000]">
        {totals.totalCareerDevelopment}
      </td>
    </tr>
  ) : null}
</tbody>


      </table>
    </div>
  );
};

export default PerformanceTable;
