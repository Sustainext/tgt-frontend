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
  formData,
}) => {
  const [localValue, setLocalValue] = useState(value || []);

  const getTableKey = (id) => id?.replace(/^root_/, "");

  // Always compute tableKey once at the top
  const tableKey = getTableKey(id);

  // This effect ensures we reset localValue when parent changes controlling data
  useEffect(() => {
    setLocalValue(value || []);
  }, [value, formContext?.formData?.policyDetails]);

  // This disables ALL rows for P1 if policyDetails[0].P1 !== "No"
const isCellDisabled = (rowIndex, columnKey) => {
  const tableName = formContext?.tableName;
  const data = formContext?.formData || {};

  if (tableName === "reasonsNotCovered") {
    // This works for P1..P9 because columnKey is 'P1', 'P2', ... etc
    const firstPolicyRow = data?.policyDetails?.[0] || {};
    if (firstPolicyRow[columnKey] === "Yes") {
      return true;
    }
    return false;
  }

  return false;
};
  // This hook clears all reasonsNotCovered P1 once they become disabled
useEffect(() => {
  if (formContext?.tableName === "reasonsNotCovered") {
    const data = formContext?.formData || {};
    const firstPolicyRow = data?.policyDetails?.[0] || {};
    let updatedValues = [...localValue];
    let changed = false;

    // <-- This will check all P1...P9 columns!
    for (let i = 1; i <= 9; i++) {
      const key = `P${i}`;
      if (firstPolicyRow[key] === "Yes") {
        updatedValues = updatedValues.map((row) => {
          if (row?.[key] && row[key] !== "") {
            changed = true;
            return { ...row, [key]: "" };
          }
          return row;
        });
      }
    }
    if (changed) {
      setLocalValue(updatedValues);
      onChange(updatedValues);
    }
  }
  // eslint-disable-next-line
}, [formContext?.formData?.policyDetails, value]);

  const handleFieldChange = (rowIndex, columnKey, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};
    updatedValues[rowIndex][columnKey] = newValue;
    setLocalValue(updatedValues);
     onChange(updatedValues);   
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
                          style={{
                            width: "300px",
                            backgroundColor: "#000",
                            color: "white",
                            fontSize: "11px",
                            boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                            borderRadius: "8px",
                            zIndex: 99999,
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
                  const layoutType = rowLabel.layout || "input";
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
                          className={`text-[12px] py-2 pl-1 w-full border-b`}
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
                          className={`text-[12px] pl-2 py-2 w-full text-left border-b`}
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