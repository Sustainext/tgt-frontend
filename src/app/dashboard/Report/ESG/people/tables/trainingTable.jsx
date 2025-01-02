

'use client';
import { useState } from "react";


const TrainingTable = ({data}) => {
  const categories = data&&data.filter((item) => item.category);
  const genders = data&&data.filter((item) => item.gender);

  return (
    <div>
      <div
        style={{
          display: "block",
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "40vw",
          maxHeight: "450px",
        }}
        className="mb-2 rounded-md table-scrollbar"
      >
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="gradient-background">
            <tr>
              <th
                style={{ minWidth: "200px", textAlign: "left" }}
                className="text-[12px] border-r px-4 py-4 text-gray-500"
                colSpan={1}
              >
              </th>
              <th
                style={{ minWidth: "200px", textAlign: "left" }}
                className="text-[12px] border-r px-4 py-4 text-gray-500"
                colSpan={1}
              >
              </th>
              <th
                colSpan="1"
                style={{ textAlign: "center" }}
                className="text-[12px] border-r px-4 py-4 text-gray-500"
              >
                Percentage of Employees Who Received Regular Performance Review
              </th>
              <th
                colSpan="1"
                style={{ textAlign: "center" }}
                className="text-[12px] border-r px-4 py-4 text-gray-500"
              >
                Percentage of Employees Who Received Regular Career Development
                Review
              </th>
            </tr>
          </thead>
          <tbody  className="text-[13px]">
            {/* Render Employee Categories */}
            {data&&data.length>0?(
<>
{categories.map((category, index) => (
              <tr key={`category-${index}`}>
                {index === 0 && (
                  <td
                    className="border-t border-r px-4 py-4 text-left"
                    rowSpan={categories.length}
                  >
                    Employee Category
                  </td>
                )}
                <td
                  className="border-t border-r px-4 py-4 text-left"
                  style={{ width: "200px" }}
                >
                  {category.category}
                </td>
                <td className="border-t border-r px-4 py-4 text-left">
                  {category.performance_percentage}%
                </td>
                <td className="border-t border-r px-4 py-4 text-left">
                  {category.career_development_percentage}%
                </td>
              </tr>
            ))}

            {/* Render Genders */}
            {genders.map((gender, index) => (
              <tr key={`gender-${index}`}>
                {index === 0 && (
                  <td
                    className="border-t border-r px-4 py-4 text-left"
                    rowSpan={genders.length}
                  >
                    Gender
                  </td>
                )}
                <td className="border-t border-r px-4 py-4 text-left">
                  {gender.gender}
                </td>
                <td className="border-t border-r px-4 py-4 text-left">
                  {gender.performance_percentage}%
                </td>
                <td className="border-t border-r px-4 py-4 text-left">
                  {gender.career_development_percentage}%
                </td>
              </tr>
            ))}
</>
            ):(
                <tr>
                    <td colSpan="4" className="text-[13px] text-center px-4 py-4">No Data available</td>
                </tr>
            )}
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingTable;
