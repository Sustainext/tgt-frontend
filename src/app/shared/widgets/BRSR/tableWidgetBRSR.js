'use client';
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TableWidget = ({
  id,
  options,
  value,
  required,
  formContext,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState(value || []);

  // Sync with parent (for form value reset etc)
  useEffect(() => {
    setLocalValue(value || []);
  }, [value]);

  /** Calculates values if rowCalculations is present, otherwise returns input as-is */
  const calculateRowValues = (currentValues) => {
    if (!options.rowCalculations) return currentValues;
    const newValues = [...currentValues];
    options.rowCalculations.forEach((calc, rowIndex) => {
      if (!newValues[rowIndex]) newValues[rowIndex] = {};
      if (calc.sum) {
        const sum = calc.sum.fields
          .reduce(
            (total, field) => total + (parseFloat(newValues[rowIndex]?.[field]) || 0),
            0
          )
          .toFixed(2);
        newValues[rowIndex][calc.sum.target] = sum;
      }
    });
    return newValues;
  };

  // Handle any field change
  const handleFieldChange = (rowIndex, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};
    updatedValues[rowIndex][key] = newValue;
    // Only run row calculation if configured, else just update
    const calculatedValues = calculateRowValues(updatedValues);
    setLocalValue(calculatedValues);
  };

  // Debounced onChange
  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);
  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "80vw"
        }}
        className="mb-2 pb-2 table-scrollbar"
      >
        <table id={id} className="table-fixed w-full rounded-md" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
          <thead className="gradient-background h-[60px]">
            <tr>
              {options.titles.map((item, idx) => (
                <th
                  key={idx}
                  style={{ textAlign: "left" }}
                  className="text-[13px] text-neutral-950 font-[400] border-none text-left px-2 py-2"
                >
                  <div className="flex">
                    <p>{item.title}</p>
                    {item.tooltipdispaly !== "none" && item.tooltip &&
                      <>
                        <MdInfoOutline
                          data-tooltip-id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                          data-tooltip-html={item.tooltip}
                          style={{ display: item.tooltipdispaly }}
                          className="cursor-pointer ml-2 mt-1"
                        />
                        <ReactTooltip
                          id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                          place="top"
                          effect="solid"
                          style={{
                            backgroundColor: "#000",
                            color: "white",
                            fontSize: "11px",
                            borderRadius: "8px",
                            zIndex: 1000,
                          }}
                        />
                      </>
                    }
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {options.rowLabels.map((rowLabel, rowIndex) => (
              <tr key={rowIndex}>
                {options.titles.map((column, columnIndex) => {
                  const cellValue = localValue[rowIndex]?.[column.key] || "";
                  // First column => row label
                  if (columnIndex === 0) {
                    return (
                      <td key={columnIndex} className="border-b border-gray-300 text-left p-2 text-[12px]">
                        <span className="flex gap-1 items-center">
                          {rowLabel.title}
                          {rowLabel.tooltipdispaly !== "none" && rowLabel.tooltip && (
                            <>
                              <MdInfoOutline
                                data-tooltip-id={`tooltip-${rowLabel.title.replace(/\s+/g, "-")}`}
                                data-tooltip-html={rowLabel.tooltip}
                                style={{ display: rowLabel.tooltipdispaly }}
                                className="cursor-pointer ml-2 mt-1"
                              />
                              <ReactTooltip
                                id={`tooltip-${rowLabel.title.replace(/\s+/g, "-")}`}
                                place="top"
                                effect="solid"
                                style={{
                                  backgroundColor: "#000",
                                  color: "white",
                                  fontSize: "11px",
                                  borderRadius: "8px",
                                  zIndex: 1000,
                                }}
                              />
                            </>
                          )}
                        </span>
                      </td>
                    );
                  }
                  // Readonly cell
                  if (column.layout === "readonly") {
                    return (
                      <td key={columnIndex} className="border-b border-gray-300 text-left p-2 text-[12px]">
                        <input
                          readOnly
                          value={cellValue}
                          className="text-[12px] pl-2 py-2 w-full text-left bg-gray-50 text-gray-500"
                          placeholder="Auto Calculated"
                        />
                      </td>
                    );
                  }
                  // InputDecimal columns
                  if (column.layout === "inputDecimal") {
                    return (
                      <td key={columnIndex} className="border-b border-gray-300 text-left p-2 text-[12px]">
                        <input
                          type="text"
                          inputMode="decimal"
                          pattern="^[0-9]*[.]?[0-9]{0,2}$"
                          required={required}
                          value={cellValue}
                          onChange={e => {
                            let input = e.target.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1');
                            if (/^\d*(\.\d{0,2})?$/.test(input) || input === "") {
                              handleFieldChange(rowIndex, column.key, input);
                            }
                          }}
                          className="text-[12px] pl-2 py-2 w-full text-left"
                          placeholder="Enter data"
                        />
                      </td>
                    );
                  }
                  // Fallback (blank cell)
                  return <td key={columnIndex}></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWidget;