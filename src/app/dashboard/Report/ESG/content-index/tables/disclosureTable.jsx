'use client';
import { useState, useRef, useEffect } from "react";

const DisclosureTable = ({data}) => {
 
    const columns = [
        { header: "GRI Standards and Other resources", subHeaders: [] },
        { header: "Disclosure", subHeaders: [] },
        { header: "Location", subHeaders: [] },
        { header: "Omission", subHeaders: ["Req omitted", "Reason", "Explanation"] },
        { header: "GRI Sector Standard Ref no", subHeaders: [] } // No sub-headers
      ];

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
    <div class="overflow-x-auto border border-gray-200 rounded-md">
  <table class="min-w-full table-auto ">
  <thead className="bg-blue-500 text-white">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index}
                  colSpan={col.subHeaders.length || 1}
                  rowSpan={col.subHeaders.length ? 1 : 2}
                  className={`text-[12px] border-r px-4 py-4 border-b ${col.subHeaders.length>0?'text-center':'text-left'}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
            <tr>
              {columns.map((col, index) => 
                col.subHeaders.length > 0 &&
                col.subHeaders.map((subHeader, subIndex) => (
                  <th key={subIndex} className="text-[12px] border-r px-4 py-4">
                    {subHeader}
                  </th>
                ))
              )}
            </tr>
          </thead>
   


          <tbody className="bg-white divide-y divide-gray-200">
  {/* Header row for General Disclosure */}
  <tr className="bg-[#F1F7FF]">
    <td colSpan="7" className="px-4 py-2 font-semibold text-[13px] text-[#0F6CBD]">
      GRI 2: General Disclosure 2021
    </td>
  </tr>

  {/* Row title for the disclosure */}
  <tr className="text-[13px]">
    <td rowSpan={data.length + 1} className="px-4 py-4 text-[#667085] border-r border-gray-200">
      GRI 2: General Disclosure 2021
    </td>
  </tr>

  {/* Map through dataRows */}
  {data?.map((row) => (
    <tr key={row.key} className={`text-[13px] ${!row.is_filled ? "text-red-600" : "text-[#667085]"}`}>
      <td className="px-4 py-4">{row.title}</td>
      <td className="px-4 py-4">{row.page}</td>

      {/* Omission details */}
      {row.omission.map((omissionItem, index) => (
        <>
          <td className="px-4 py-4">{omissionItem.req_omitted}</td>
          <td className="px-4 py-4">{omissionItem.reason || row.is_filled?omissionItem.reason:"Add in next step"}</td>
          <td className="px-4 py-4">{omissionItem.explanation || row.is_filled?omissionItem.explanation:"Add in next step"}</td>
        </>
      ))}
       <td className="px-4 py-4">{row.gri_sector_no}</td>
    </tr>
  ))}
</tbody>


  </table>
</div>


    </>
  );
};

export default DisclosureTable;
