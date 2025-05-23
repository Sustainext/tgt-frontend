"use client";
import { useState, useRef, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const RefDisclosureTable = ({ data }) => {
  const columns = [
    { header: "GRI Standards", subHeaders: [] },
    { header: "Disclosure", subHeaders: [] },
    { header: "Location", subHeaders: [] },
    // {
    //   header: "Omission",
    //   subHeaders: ["Req omitted", "Reason", "Explanation"],
    // },
    // { header: "GRI Sector Standard Ref no", subHeaders: [] }, // No sub-headers
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate index for slicing data based on currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(data?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //   const dataRows = [
  //     {
  //       key: "2-1",
  //       title: "2-1 Organizational details",
  //       page: "Page 4",
  //       omission: [
  //         {
  //           req_omitted: "",
  //           reason: "",
  //           explanation: ""
  //         }
  //       ],
  //       gri_sector_no: "",
  //       highlight: false,
  //     },
  //     {
  //       key: "2-2",
  //       title: "2-2 Entities included in the organization’s sustainability reporting",
  //       page: "Page 5",
  //       omission: [
  //         {
  //           req_omitted: "",
  //           reason: "",
  //           explanation: ""
  //         }
  //       ],
  //       gri_sector_no: "",
  //       highlight: false,
  //     },
  //     {
  //       key: "2-8",
  //       title: "2-8 Workers who are not employees",
  //       page: "Page 8",
  //       omission: [
  //         {
  //           req_omitted: "Certain data omitted",
  //           reason: "Data unavailable",
  //           explanation: "Will be included in next reporting period"
  //         }
  //       ],
  //       gri_sector_no: "2-8",
  //       highlight: true,
  //     },
  //     {
  //       key: "2-9",
  //       title: "2-9 Governance structure and composition",
  //       page: "2-9",
  //       omission: [
  //         {
  //           req_omitted: "Structure details",
  //           reason: "Confidentiality",
  //           explanation: "Limited to internal stakeholders"
  //         }
  //       ],
  //       gri_sector_no: "2-9",
  //       highlight: true,
  //     },
  //     // Add additional rows as needed
  //   ];

  return (
    <>
      <div className="overflow-x-auto border border-gray-200 rounded-md">
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

            <tbody className="bg-white divide-y divide-gray-200">
              {/* Header row for General Disclosure */}
              <tr className="bg-[#F1F7FF]">
                <td
                  colSpan="7"
                  className="px-4 py-2 font-semibold text-[13px] text-[#0F6CBD]"
                >
                  GRI 2: General Disclosure 2021
                </td>
              </tr>

              {/* Row title for the disclosure */}
              <tr className="text-[13px]">
                <td
                  rowSpan={data.length + 1}
                  className="px-4 py-4 text-[#667085] border-r border-gray-200"
                >
                  GRI 2: General Disclosure 2021
                </td>
              </tr>

              {/* Map through dataRows */}
              {data?.map((row, rowIndex) => (
                <tr
                  key={row.key}
                  className={`text-[13px] relative text-[#667085]`}
                >
                  <td
                    className="px-4 py-4"
                    // data-tooltip-id={
                    //   row?.is_filled === false
                    //     ? `tooltip-${rowIndex}`
                    //     : undefined
                    // }
                    // data-tooltip-html={
                    //   row?.is_filled === false
                    //     ? "Disclosure not filled. Provide reason for omission or fill in the data"
                    //     : ""
                    // }
                  >
                    {row.title}
                  </td>
                  <td className="px-4 py-4">{row.page}</td>

                  {/* Omission details */}
                  {/* {row.omission.map((omissionItem, index) => (
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
                      id={`tooltip-${rowIndex}`}
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
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="xl:hidden md:hidden lg:hidden 4k:hidden 2k:hidden 2xl:hidden block">
          {currentItems?.map((row, mobrowIndex) => (
            <div
              key={row.key}
              className={`bg-white shadow-lg rounded-lg p-4 mb-4`}
            >
              <div className="flex justify-between ">
                <span
                  className={`font-semibold text-sm text-[#667085]
                  `}
                  // Add the tooltip only to the title
                //   data-tooltip-id={
                //     row?.is_filled === false
                //       ? `tooltip-${mobrowIndex}`
                //       : undefined
                //   }
                //   data-tooltip-html={
                //     row?.is_filled === false
                //       ? `Disclosure not filled. Provide reason for omission or fill in the data`
                //       : ""
                //   }
                >
                  {row.title}
                  {/* <ReactTooltip
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
                  /> */}
                </span>
                {/* <span className="text-sm text-gray-500">{row.page}</span> */}
              </div>

              {/* {row.omission.map((omissionItem, index) => (
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
                      {omissionItem.req_omitted || "Add in next step"}
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
              </div> */}
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {Math.ceil(data?.length / itemsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(data?.length / itemsPerPage)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>

          {/* ReactTooltips */}
        </div>

        {/* Tooltips */}
      </div>
    </>
  );
};

export default RefDisclosureTable;
