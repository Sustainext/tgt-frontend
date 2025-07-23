'use client';
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const BrsrPolicyTableWidget = ({
  id,
  options,
  value,
  required,
  onChange,
  formContext,
  disableRules = {},
  controllingValues = [],
}) => {
  console.log(id,"check")
  const [localValue, setLocalValue] = useState(value || []);

  useEffect(() => {
    setLocalValue(value || []);
  }, [value]);

  // const isCellDisabled = (rowIndex, columnKey) => {
  //   if (disableRules.type === "columnIfFirstRowYes") {
  //     return controllingValues[0]?.[columnKey] === "Yes";
  //   }
  //   if (disableRules.type === "columnIfFirstRowNo") {
  //     return controllingValues[0]?.[columnKey] === "No";
  //   }
  //   if (disableRules.type === "textIfFirstRowYes") {
  //     return controllingValues[0]?.[columnKey] !== "Yes" && rowIndex === 1;
  //   }
  //   return false;
  // };
  // const isCellDisabled = (rowIndex, columnKey) => {
  //   // Only apply the logic to reasonsNotCovered table
  //   if (!formContext?.formData?.policyDetails?.[0]) return false;

  //   const firstRow = formContext.formData.policyDetails[0];

  //   if (id.includes("reasonsNotCovered")) {
  //     // Disable this column (for any row) if first row of table 1 has "Yes"
  //     return firstRow[columnKey] === "Yes";
  //   }
  //   if (id.includes("reviewComplianceReasons")) {
  //     console.log("inside it okay")
  //   const table3 = formContext?.formData?.reviewOfNGRBCs;
  //   const firstRow = table3?.[0] || {};
  //   const secondRow = table3?.[1] || {};
  //   console.log(firstRow,"first row")

  //   if (rowIndex === 0) return firstRow[columnKey] === "No";
  //   if (rowIndex === 1) return secondRow[columnKey] === "No";
  // }


  //   return false;
  // };
  const isCellDisabled = (rowIndex, columnKey) => {
  const { formData } = formContext || {};

  // --- Disable reasonsNotCovered based on policyDetails row1 ---
  if (id.includes("reasonsNotCovered")) {
    const policyFirstRow = formData?.policyDetails?.[0];
    if (policyFirstRow && policyFirstRow[columnKey] === "Yes") {
      return true;
    }
  }

  // --- Disable reviewComplianceReasons rows based on reviewOfNGRBCs rows ---
  if (id.includes("reviewComplianceReasons")) {
    const reviewRows = formData?.reviewOfNGRBCs || [];

    // Map of rowIndex in reviewComplianceReasons to the corresponding logic in reviewOfNGRBCs
    const dependencyMap = {
      0: 0, // row1 depends on reviewOfNGRBCs row1
      1: 1, // row2 depends on reviewOfNGRBCs row2
    };

    const dependentRowIndex = dependencyMap[rowIndex];
    const relevantReviewRow = reviewRows?.[dependentRowIndex];

    if (relevantReviewRow && relevantReviewRow[columnKey] === "No") {
      return true;
    }
  }

  return false;
};




  const handleFieldChange = (rowIndex, columnKey, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};
    updatedValues[rowIndex][columnKey] = newValue;
    setLocalValue(updatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: "block",
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "80vw",
        }}
        className="mb-2 pb-2 table-scrollbar"
      >
        <table
          className="table-fixed w-full rounded-md"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead className="gradient-background h-[60px]">
            <tr>
              <th className="text-[13px] text-center px-2 py-2 w-[250px]"> </th>
              {options.titles.map((item, idx) => (
                <th key={idx} className="text-[13px] w-[250px] text-center px-2 py-2">
                  <div className="flex font-medium items-center justify-center">
                    <p>{item.title}</p>
                    {item.tooltip && (
                      <>
                        <MdInfoOutline
                          data-tooltip-id={`tooltip-${item.key}`}
                          data-tooltip-content={item.tooltip}
                          className="ml-2 cursor-pointer"
                        />
                        <ReactTooltip id={`tooltip-${item.key}`}
                          place="top"
                          effect="solid"
                          // positionStrategy="fixed"
                          style={{
                            width: "300px",
                            backgroundColor: "#000",
                            color: "white",
                            fontSize: "11px",
                            boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                            borderRadius: "8px",
                            zIndex: 99999, // Ensure it appears above everything
                          }}
                        />
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="m-0 p-0 h-[80px]">
            {options.rowLabels.map((rowLabel, rowIndex) => (
              <tr key={rowIndex}>
                <td className="text-[12px] text-left p-2 w-[250px]">
                  <div className="flex items-start">
                    <p>{rowLabel.title}</p>
                  </div>
                </td>
                {options.titles.map((column, columnIndex) => {
                  const layoutType = rowLabel.layout || "input"; // 👈 use row layout here
                  const cellValue = localValue[rowIndex]?.[column.key] || "";
                  return (
                    <td key={columnIndex} className="p-2 text-[12px] w-[250px] text-center">
                      {layoutType === "inputDropdown" && (
                        <select
                          value={cellValue}
                          onChange={(e) =>
                            handleFieldChange(rowIndex, column.key, e.target.value)
                          }
                          disabled={isCellDisabled(rowIndex, column.key)}
                          className={`text-[12px]   py-2 pl-1 w-full border-b ${isCellDisabled(rowIndex, column.key) ? "bg-gray-100" : ""}`}

                        >
                          <option className="font-medium" value="">Select</option>
                          {rowLabel.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {layoutType === "input" && (
                        <input
                          type="text"
                          value={cellValue}
                          onChange={(e) =>
                            handleFieldChange(rowIndex, column.key, e.target.value)
                          }
                          placeholder="Enter data"
                          className={`text-[12px] pl-2 py-2 w-full text-left border-b ${isCellDisabled(rowIndex, column.key) ? "bg-gray-100" : ""}`}
                          disabled={isCellDisabled(rowIndex, column.key)}
                        />
                      )}

                      {layoutType === "multiline" && (
                        <textarea
                          rows={2}
                          type="text"
                          value={cellValue}
                          onChange={(e) =>
                            handleFieldChange(rowIndex, column.key, e.target.value)
                          }
                          placeholder="Enter data"
                          className={`text-[12px] pl-2 py-2 w-full text-left border-b ${isCellDisabled(rowIndex, column.key) ? "bg-gray-100" : ""}`}
                          disabled={isCellDisabled(rowIndex, column.key)}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrsrPolicyTableWidget;
