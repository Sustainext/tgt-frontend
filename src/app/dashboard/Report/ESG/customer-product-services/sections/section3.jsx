"use client";
import { useState, useRef, useEffect } from "react";

const Section3 = ({ section15_1_2Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'15.1.2':'15.1.1',
  sectionTitle = 'Health and Safety Impacts of Product and Service Categories',
  sectionOrder = 15,
 }) => {

  const col=[
    "Organisation/Corporation",
    "Percentage of significant product and service categories for which health and safety impacts are assessed for improvement"
  ]
  return (
    <>
      <div id="setion15_1_2" ref={section15_1_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
        </h3>
        {data["416_1a"] ? (
          data["416_1a"].length > 0 ? (
            data["416_1a"][0].Q1 ? (
              data["416_1a"][0].Q1 == "No" ? (
                <div>
                  <p className="text-sm mb-4">No</p>
                </div>
              ) : (
                <div>
                  {/* <p className="text-[15px] mb-2 font-semibold">
                    Number of product and service categories
                  </p>
                  <p className="text-sm mb-4">
                    {data["416_1a"][0].Q2
                      ? data["416_1a"][0].Q2
                      : "No data available"}
                  </p>
                  <p className="text-[15px] mb-2 font-semibold">
                    Number of product and service categories for which health
                    and safety impacts are assessed for improvement.
                  </p>
                  <p className="text-sm mb-4">
                    {data["416_1a"][0].Q3
                      ? data["416_1a"][0].Q3
                      : "No data available"}
                  </p> */}
                  <p className="text-[14px] text-[#344054] mb-2 font-semibold">
                  Percentage of significant product and service categories for which health and safety impacts are assessed for improvement
                  </p>
                  <div
       style={{
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "40vw",
        maxHeight:"450px"
      }}
      className="rounded-md table-scrollbar shadow-md mb-4">
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        <thead className="gradient-background">
            <tr>
                {col.map((item, idx) => (
                    <th
                        key={idx}
                        style={{ minWidth: "120px", textAlign: "left" }}
                        className={`text-[12px] border-r px-4 py-4 ${
                            idx === 0 ? 'rounded-tl-md' : '' // Top-left corner
                        } ${
                            idx === col.length - 1 ? 'rounded-tr-md' : '' // Top-right corner
                        } text-gray-500`}
                    >
                        <div className="flex ">
                            <p className="flex ">
                                {item}
                            </p>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
      {data['416_1a_analyse'] && data['416_1a_analyse']['customer_health_percent']?data['416_1a_analyse']['customer_health_percent'].length> 0 ? (
        // Find the maximum length between the two arrays to determine how many rows we need
        Array.from(data['416_1a_analyse']['customer_health_percent']).map((val, index) => (
          <tr key={index} className="text-[13px]">
            <td className="border-t border-r border-gray-200 p-4 text-left">
              {val.org_or_corp || 'No data available'}
            </td>
            <td className="border border-gray-200 p-4 text-left">
            {val.percentage || 'No data available'}
            </td>
          </tr>
        ))
      ) : (
        <tr className="text-[13px]">
          <td className="border-t border-r border-gray-200 p-4 text-left">No data available</td>
          <td className="border border-gray-200 p-4 text-left">No data available</td>
        </tr>
      ):(
        <tr className="text-[13px]">
          <td className="border-t border-r border-gray-200 p-4 text-left">No data available</td>
          <td className="border border-gray-200 p-4 text-left">No data available</td>
        </tr>
      )
    }
    </tbody>
    </table>
</div>
                </div>
              )
            ) : (
              <p className="text-sm mb-4">No data available</p>
            )
          ) : (
            <p className="text-sm mb-4">No data available</p>
          )
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}
      </div>
    </>
  );
};

export default Section3;
