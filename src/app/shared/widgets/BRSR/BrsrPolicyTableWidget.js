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
  const [localValue, setLocalValue] = useState(value || []);

  // console.log(localValue,id,"check")

  useEffect(() => {
    setLocalValue(value || []);
  }, [value]);

 
//  const isCellDisabled = (rowIndex, columnKey) => {
//   const fullFormData = formContext?.formData || {};
//   const policyDetails = fullFormData?.policyDetails || [];
//   const policyFirstRow = policyDetails[0] || {};
//   const reviewOfNGRBCsFirstRow = fullFormData?.reviewOfNGRBCs || []
//   const data = formContext?.formData || {};

//   // === Disable reasonsNotCovered based on policyDetails
//  if (id.includes("reasonsNotCovered")) {
//     const policyRow = data?.policyDetails?.[0] || {};
//     return policyRow[columnKey] !== "No";
//   }


//   // === independentAssessment based on own data (value)
//   if (id.includes("independentAssessment")) {
//     const firstRow = value?.[0] || {};
//     return rowIndex === 1 && firstRow[columnKey] !== "Yes";
//   }

//   // === reviewComplianceReasons based on own rows
//    if (id.includes("reviewComplianceReasons")) {
//     const reviewRows = data?.reviewOfNGRBCs || [];
//     const controllingRow = reviewRows[rowIndex] || {};
//     return controllingRow[columnKey] !== "Yes";
//   }

//   return false;
// };




  // const handleFieldChange = (rowIndex, columnKey, newValue) => {
  //   const updatedValues = [...localValue];
  //   if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};

  //   updatedValues[rowIndex][columnKey] = newValue;
  //   console.log(updatedValues,localValue,"check values")

  //   // Clear dependent cell if disabled
  //   // === For independentAssessment: clear row 1 cell if row 0 is not 'Yes'
  //   if (id.includes("independentAssessment")) {
  //     const firstRow = updatedValues?.[0] || {};
  //     if (rowIndex === 0 && newValue !== "Yes") {
  //       // Clear second row same column
  //       if (updatedValues[1]) updatedValues[1][columnKey] = "";
  //     }
  //   }

  //   // === For reasonsNotCovered: disable all rows if row 0 is "Yes"
  //   if (id.includes("reasonsNotCovered") && rowIndex === 0) {
  //     console.log("inside")
  //     if (newValue !== "No") {
  //       updatedValues.forEach((row, i) => {
  //         if (i !== 0) updatedValues[i][columnKey] = "";
  //       });
  //     }
  //   }

  //   // === For reviewComplianceReasons: clear input if set to "No"
  //   if (id.includes("reviewComplianceReasons")) {
  //     if (newValue === "No") {
  //       updatedValues[rowIndex][columnKey] = "No";
  //     }
  //   }

  //   setLocalValue(updatedValues);
  // };

const getTableKey = (id) => {
  return id?.replace(/^root_/, ""); // strips "root_" prefix if present
};

const isCellDisabled = (rowIndex, columnKey) => {
  const tableKey = getTableKey(id);
  const data = formContext?.formData || {};

  if (tableKey === "reviewComplianceReasons") {
    const reviewRows = data?.reviewOfNGRBCs || [];
    const controllingRow = reviewRows[rowIndex] || {};
    return controllingRow[columnKey] !== "Yes";
  }

  if (tableKey === "reasonsNotCovered") {
    const policyRow = data?.policyDetails?.[0] || {};
    return policyRow[columnKey] !== "No";
  }

  if (tableKey === "independentAssessment") {
    const firstRow = value?.[0] || {};
    return rowIndex === 1 && firstRow[columnKey] !== "Yes";
  }

  return false;
};

//  const handleFieldChange = (rowIndex, columnKey, newValue) => {
//   const updatedValues = [...localValue];
//   if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};
//   updatedValues[rowIndex][columnKey] = newValue;

//   // === 1. independentAssessment: clear row 1 if row 0 != "Yes"
//   if (id.includes("independentAssessment")) {
//     const row0 = updatedValues[0] || {};
//     const row1 = updatedValues[1] || {};

//     if (row0[columnKey] !== "Yes" && row1[columnKey]) {
//       updatedValues[1][columnKey] = "";
//     }
//   }

//   // === 2. reasonsNotCovered: depends on policyDetails from formContext
//   if (id.includes("reasonsNotCovered")) {
//     const policyFirstRow = formContext?.formData?.policyDetails?.[0] || {};

//     if (policyFirstRow[columnKey] !== "No") {
//       console.log("Clearing reasonsNotCovered values due to policyDetails restriction");
//       updatedValues.forEach((row, idx) => {
//         if (idx !== 0 && row[columnKey]) {
//           row[columnKey] = "";
//         }
//       });
//     }
//   }

//   // === 3. reviewComplianceReasons: row[x] disabled if reviewOfNGRBCs[x][columnKey] !== "Yes"
//   if (id.includes("reviewComplianceReasons")) {
//     const reviewData = formContext.formData?.reviewOfNGRBCs || [];
//     const controllingRow = reviewData[rowIndex] || {};
//     if (controllingRow[columnKey] !== "Yes") {
//       updatedValues[rowIndex][columnKey] = "";
//     }
//   }

//   setLocalValue(updatedValues);
// };


const handleFieldChange = (rowIndex, columnKey, newValue) => {
  const updatedValues = [...localValue];
  if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};
  updatedValues[rowIndex][columnKey] = newValue;

  const tableKey = getTableKey(id);
  const data = formContext?.formData || {};

  if (formContext?.formData && tableKey) {
    formContext.formData[tableKey] = updatedValues; // update central data
  }

  if (tableKey === "reviewComplianceReasons") {
    const controllingRow = data?.reviewOfNGRBCs?.[rowIndex] || {};
    if (controllingRow[columnKey] !== "Yes") {
      updatedValues[rowIndex][columnKey] = "";
    }
  }

  if (tableKey === "reasonsNotCovered") {
    const policyRow = data?.policyDetails?.[0] || {};
    if (policyRow[columnKey] !== "No") {
      updatedValues.forEach((row, idx) => {
        if (idx !== 0 && row[columnKey]) row[columnKey] = "";
      });
    }
  }

  if (tableKey === "independentAssessment" && rowIndex === 0 && newValue !== "Yes") {
    if (updatedValues[1]) updatedValues[1][columnKey] = "";
  }

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
                          // disabled={isCellDisabled(rowIndex, column.key)}
                          className={`text-[12px]   py-2 pl-1 w-full border-b`}

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
                          className={`text-[12px] pl-2 py-2 w-full text-left border-b `}
                          // disabled={isCellDisabled(rowIndex, column.key)}
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
                          className={`text-[12px] pl-2 py-2 w-full text-left border-b`}
                          // disabled={isCellDisabled(rowIndex, column.key)}
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
