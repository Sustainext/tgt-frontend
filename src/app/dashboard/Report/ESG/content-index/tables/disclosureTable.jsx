"use client";
import React, { useState, useRef, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const DisclosureTable = ({ data,ispageNumberGenerated }) => {
  const columns = [
    { header: "GRI Standards and Other resources", subHeaders: [] },
    { header: "Disclosure", subHeaders: [] },
    { header: "Location", subHeaders: [] },
    {
      header: "Omission",
      subHeaders: ["Req omitted", "Reason", "Explanation"],
    },
    { header: "GRI Sector Standard Ref no", subHeaders: [] }, // No sub-headers
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Helper function to recursively extract all items from deeply nested sections
  const extractItems = (data) => {
    let items = [];

    data.forEach((entry) => {
      if (entry.items) {
        items = items.concat(entry.items);
      }
      if (entry.sections) {
        entry.sections.forEach((section) => {
          items = items.concat(extractItems([section])); // recursive call
        });
      }
    });

    return items;
  };

  const allItems = extractItems(data ? data : []);

  // Calculate index for slicing data based on currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(allItems?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden border border-gray-200 rounded-md">
        {/* Table for desktop and tablet view */}
        <div className="hidden sm:block">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    colSpan={col.subHeaders.length || 1}
                    rowSpan={col.subHeaders.length ? 1 : 2}
                    className={`text-[12px] border-r px-4 py-4 border-b ${
                      col.subHeaders.length > 0 ? "text-center" : "text-left"
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
              <tr>
                {columns.map(
                  (col, index) =>
                    col.subHeaders.length > 0 &&
                    col.subHeaders.map((subHeader, subIndex) => (
                      <th
                        key={subIndex}
                        className="text-[12px] border-r px-4 py-4"
                      >
                        {subHeader}
                      </th>
                    ))
                )}
              </tr>
            </thead>

            {/* <tbody className="bg-white divide-y divide-gray-200">
             
              <tr className="bg-[#F1F7FF]">
                <td
                  colSpan="7"
                  className="px-4 py-2 font-semibold text-[13px] text-[#0F6CBD]"
                >
                  GRI 2: General Disclosure 2021
                </td>
              </tr>

             
              <tr className="text-[13px]">
                <td
                  rowSpan={data.length + 1}
                  className="px-4 py-4 text-[#667085] border-r border-gray-200"
                >
                  GRI 2: General Disclosure 2021
                </td>
              </tr>

             
              {data?.map((row, rowIndex) => (
                <tr
                  key={row.key}
                  className={`text-[13px] relative ${
                    row?.is_filled === false ? "text-red-600" : "text-[#667085]"
                  }`}
                >
                  <td
                    className="px-4 py-4"
                    data-tooltip-id={
                      row?.is_filled === false
                        ? `tooltip-${row.key}`
                        : undefined
                    }
                    data-tooltip-html={
                      row?.is_filled === false
                        ? "Disclosure not filled. Provide reason for omission or fill in the data"
                        : ""
                    }
                  >
                    {row.title}
                  </td>
                  <td className="px-4 py-4">{row.page}</td>

                 
                  {row.omission.map((omissionItem, index) => (
                    <>
                      <td className="px-4 py-4">{omissionItem.req_omitted}</td>
                      <td className="px-4 py-4">
                        {omissionItem.reason || row?.is_filled
                          ? omissionItem.reason
                          : "Add in next step"}
                      </td>
                      <td className="px-4 py-4">
                        {omissionItem.explanation || row?.is_filled
                          ? omissionItem.explanation
                          : "Add in next step"}
                      </td>
                    </>
                  ))}
                  <td className="px-4 py-4">{row.gri_sector_no}</td>
                  {!row?.is_filled && (
                    <ReactTooltip
                      id={`tooltip-${row.key}`}
                      place="top"
                      effect="solid"
                      style={{
                        width: "300px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </tr>
              ))}
            </tbody> */}
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((group, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  {/* Heading 1 */}
                  <tr className="bg-[#F1F7FF]">
                    <td
                      colSpan="8"
                      className="px-4 py-2 font-semibold text-[15px] text-[#0F6CBD]"
                    >
                      {group.heading1}
                    </td>
                  </tr>

                  {/* Flat structure */}
                  {group.items?.map((row, rowIndex) => (
                    <tr
                      key={row.key}
                      className={`text-[13px] relative ${
                        row?.is_filled === false
                          ? "text-red-600"
                          : "text-[#667085]"
                      }`}
                    >
                      {/* Only render heading1 once using rowSpan */}
                      {rowIndex === 0 && (
                        <td
                          rowSpan={group.items.length}
                          className="px-4 py-4 font-medium align-middle border-r border-gray-200"
                        >
                          {group.heading1}
                        </td>
                      )}

                      {/* Disclosure title with tooltip if not filled */}
                      <td
                        className="px-4 py-4"
                        data-tooltip-id={
                          row?.is_filled === false
                            ? `tooltip-${row.key}`
                            : undefined
                        }
                        data-tooltip-content={
                          row?.is_filled === false
                            ? "Disclosure not filled. Provide reason for omission or fill in the data"
                            : undefined
                        }
                      >
                        {row.title}
                        {row?.is_filled === false && (
                          <ReactTooltip
                            id={`tooltip-${row.key}`}
                            place="top"
                            effect="solid"
                            className="!max-w-xs !text-xs"
                            style={{
                              backgroundColor: "#000",
                              color: "#fff",
                              fontSize: "12px",
                              borderRadius: "6px",
                              padding: "8px",
                            }}
                          />
                        )}
                      </td>

                      <td className="px-4 py-4 text-center">{ispageNumberGenerated?row.page_number:'Loading...'}</td>
                      <td className="px-4 py-4">
                        {row.omission?.[0]?.req_omitted}
                      </td>
                      <td className="px-4 py-4">
                        {row.omission?.[0]?.reason || row?.is_filled
                          ? row.omission?.[0]?.reason
                          : "Add in next step"}
                      </td>
                      <td className="px-4 py-4">
                        {row.omission?.[0]?.explanation || row?.is_filled
                          ? row.omission?.[0]?.explanation
                          : "Add in next step"}
                      </td>
                      <td className="px-4 py-4 text-center">{row.gri_sector_no}</td>
                    </tr>
                  ))}

                  {/* Nested structure with heading3 rowspan */}
                  {group.sections?.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                      {/* Heading 2 */}
                      <tr className="bg-[#F9FAFB]">
                        <td
                          colSpan="8"
                          className="px-4 py-2 font-semibold text-[13px] text-[#344054]"
                        >
                          {section.heading2}
                        </td>
                      </tr>

                      {section.sections?.map((subsection, subIndex) => (
                        <React.Fragment key={subIndex}>
                          {subsection.items.map((row, rowIndex) => (
                            <tr
                              key={row.key}
                              className={`text-[13px] relative ${
                                row?.is_filled === false
                                  ? "text-red-600"
                                  : "text-[#667085]"
                              }`}
                            >
                              {/* Only render heading3 once per group using rowSpan */}
                              {rowIndex === 0 && (
                                <td
                                  rowSpan={subsection.items.length}
                                  className="px-4 py-4 font-medium text-[#667085] align-middle border-r border-gray-200"
                                >
                                  {subsection.heading3}
                                </td>
                              )}

                              {/* Disclosure title with tooltip */}
                              <td
                                className="px-4 py-4"
                                data-tooltip-id={
                                  row?.is_filled === false
                                    ? `tooltip-${row.key}`
                                    : undefined
                                }
                                data-tooltip-content={
                                  row?.is_filled === false
                                    ? "Disclosure not filled. Provide reason for omission or fill in the data"
                                    : undefined
                                }
                              >
                                {row.title}
                                {row?.is_filled === false && (
                                  <ReactTooltip
                                    id={`tooltip-${row.key}`}
                                    place="top"
                                    effect="solid"
                                    className="!max-w-xs !text-xs"
                                    style={{
                                      backgroundColor: "#000",
                                      color: "#fff",
                                      fontSize: "12px",
                                      borderRadius: "6px",
                                      padding: "8px",
                                    }}
                                  />
                                )}
                              </td>

                              <td className="px-4 py-4 text-center">{ispageNumberGenerated?row.page_number:'Loading...'}</td>
                              <td className="px-4 py-4">
                                {row.omission?.[0]?.req_omitted}
                              </td>
                              <td className="px-4 py-4">
                                {row.omission?.[0]?.reason || row?.is_filled
                                  ? row.omission?.[0]?.reason
                                  : "Add in next step"}
                              </td>
                              <td className="px-4 py-4">
                                {row.omission?.[0]?.explanation ||
                                row?.is_filled
                                  ? row.omission?.[0]?.explanation
                                  : "Add in next step"}
                              </td>
                              <td className="px-4 py-4 text-center">{row.gri_sector_no}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="xl:hidden md:hidden lg:hidden 4k:hidden 2k:hidden 2xl:hidden block">
          {currentItems?.map((row, mobrowIndex) => (
            <div
              key={row.key}
              className={`bg-white shadow-lg rounded-lg p-4 mb-4   ${
                row?.is_filled === false ? "border-2 border-red-600" : ""
              }`}
            >
              <div className="flex justify-between ">
                <span
                  className={`font-semibold text-sm ${
                    row?.is_filled === false ? "text-red-600" : "text-[#667085]"
                  }`}
                  // Add the tooltip only to the title
                  data-tooltip-id={
                    row?.is_filled === false
                      ? `tooltip-${mobrowIndex}`
                      : undefined
                  }
                  data-tooltip-html={
                    row?.is_filled === false
                      ? `Disclosure not filled. Provide reason for omission or fill in the data`
                      : ""
                  }
                >
                  {row.title}
                  <ReactTooltip
                    key={mobrowIndex}
                    id={`tooltip-${mobrowIndex}`}
                    place="top"
                    effect="solid"
                    style={{
                      width: "300px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                      borderRadius: "8px",
                    }}
                  />
                </span>
              </div>

              {row.omission.map((omissionItem, index) => (
                <div key={index} className="mt-2">
                  <div className="text-sm flex mb-2 relative">
                    <strong>Req omitted:</strong>
                    <p
                      className={`font-semibold text-sm ${
                        row?.is_filled === false
                          ? "text-red-600"
                          : "text-[#667085]"
                      }`}
                    >
                      {omissionItem.req_omitted}
                    </p>
                  </div>
                  <div className="text-sm flex mb-2 relative">
                    <strong>Reason:</strong>
                    <p
                      className={`font-semibold text-sm ${
                        row?.is_filled === false
                          ? "text-red-600"
                          : "text-[#667085]"
                      }`}
                    >
                      {omissionItem.reason || row?.is_filled
                        ? omissionItem.reason
                        : "Add in next step"}
                    </p>
                  </div>
                  <div className="text-sm flex mb-2 relative">
                    <strong>Explanation:</strong>
                    <p
                      className={`font-semibold text-sm ${
                        row?.is_filled === false
                          ? "text-red-600"
                          : "text-[#667085]"
                      }`}
                    >
                      {omissionItem.explanation || row?.is_filled
                        ? omissionItem.explanation
                        : "Add in next step"}
                    </p>
                  </div>
                </div>
              ))}

              <div className="text-sm relative flex">
                <strong>GRI Sector Ref no:</strong>
                <p
                  className={`font-semibold text-sm ${
                    row?.is_filled === false ? "text-red-600" : "text-[#667085]"
                  }`}
                >
                  {row.gri_sector_no}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {Math.ceil(allItems?.length / itemsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(allItems?.length / itemsPerPage)
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisclosureTable;