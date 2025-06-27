"use client";
import { useState } from "react";

const RefDisclosureTable = ({ data }) => {
  const columns = [
    { header: "GRI Standards" },
    { header: "Disclosure" },
    { header: "Location" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = data.reduce((sum, section) => sum + (section.items?.length || 0), 0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Flattened + grouped data for pagination
  const flattened = [];

  data?.flat().forEach((section) => {
    if (Array.isArray(section.items)) {
      section.items.forEach((item) => {
        flattened.push({ ...item, heading1: section.heading1 });
      });
    }
  });
  

  const currentItems = flattened?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto table-scrollbar border border-gray-200 rounded-md">
      {/* Desktop/tablet view */}
      <div className="block">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="text-[12px] px-4 py-3 text-left border">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flattened.map((item, index) => {
              const isFirstInGroup =
                index === 0 ||
                flattened[index - 1].heading1 !== item.heading1;

              const groupCount = flattened.filter(
                (i) => i.heading1 === item.heading1
              ).length;

              return (
                <tr key={`${item.key}-${index}`} className="text-[13px] text-[#667085]">
                  {isFirstInGroup && (
                    <td
                      rowSpan={groupCount}
                      className="font-semibold px-4 py-3 border-r bg-[#FFFFFF] text-gray-500 w-64 align-middle"
                    >
                      {item.heading1}
                    </td>
                  )}
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.page_number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
       
     
    </div>
  );
};

export default RefDisclosureTable;