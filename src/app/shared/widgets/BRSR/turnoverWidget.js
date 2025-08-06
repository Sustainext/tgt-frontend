"use client";
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TurnoverWidget = ({
  id,
  options,
  value,
  required,
  formContext,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState(value || []);

  useEffect(() => {
    setLocalValue(value || []);
  }, [value]);

  // key1 mapping
  const getKey1ToKey = () => {
    const obj = {};
    (options.titles || []).forEach(col => {
      obj[col.key1] = col.key;
    });
    return obj;
  };

  

  const calculateTurnoverValues = (currentValues) => {
  const newValues = [...currentValues];
  for (let i = 0; i < 3; i++) {
    if (!newValues[i]) newValues[i] = {};
  }

  const key1ToKey = getKey1ToKey();

  // Calculate turnover rate for each row (Male/Female)
  [0, 1].forEach((idx) => {
    const row = newValues[idx];
    const left = parseFloat(row[key1ToKey.col2]) || 0;    // Employees who left (col2)
    const beginning = parseFloat(row[key1ToKey.col3]) || 0; // Beginning (col3)
    const end = parseFloat(row[key1ToKey.col4]) || 0;      // End (col4)
    
    // Calculate average: (col3 + col4)/2
    const average = (beginning + end) / 2;
    
    // Turnover rate formula: (col2 / average) * 100
    row[key1ToKey.col5] = average > 0 
      ? ((left / average) * 100).toFixed(2) 
      : "0.00";
  });

  // Calculate totals for last row
  const lastIdx = 2;
  
  // Sum columns 2-4 for the total row
  const sumField = (colKey1) => [0, 1].reduce(
    (acc, idx) => acc + (parseFloat(newValues[idx][key1ToKey[colKey1]]) || 0), 0
  );

  newValues[lastIdx][key1ToKey.col2] = sumField("col2").toString();
  newValues[lastIdx][key1ToKey.col3] = sumField("col3").toString();
  newValues[lastIdx][key1ToKey.col4] = sumField("col4").toString();

  // Calculate total turnover rate using the same formula
  const totalLeft = parseFloat(newValues[lastIdx][key1ToKey.col2]) || 0;
  const totalBeginning = parseFloat(newValues[lastIdx][key1ToKey.col3]) || 0;
  const totalEnd = parseFloat(newValues[lastIdx][key1ToKey.col4]) || 0;
  const totalAvg = (totalBeginning + totalEnd) / 2;
  
  newValues[lastIdx][key1ToKey.col5] = totalAvg > 0 
    ? ((totalLeft / totalAvg) * 100).toFixed(2) 
    : "0.00";

  return newValues;
};

  const handleFieldChange = (index, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[index]) updatedValues[index] = {};
    updatedValues[index][key] = newValue;

    const calculatedValues = calculateTurnoverValues(updatedValues);
    setLocalValue(calculatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  return (
    <div style={{ position: "relative" }}>
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
          id={id}
          className="table-fixed w-full rounded-md"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead className="gradient-background h-[60px]">
            <tr>
              {options.titles.map((item, idx) => (
                <th
                  key={idx}
                  style={{ textAlign: "left" }}
                  className={`
                    ${
                      item.key === "AssignTo" || item.key === "FileUpload"
                        ? "text-[13px] text-neutral-950 font-[400] border-none text-center px-2 py-2 relative w-[45vw] xl:w-[10vw] lg:w-[10vw] md:w-[10vw] 2xl:w-[10vw] 4k:w-[10vw] 2k:w-[10vw]"
                        : "text-[13px] text-neutral-950 font-[400] border-none text-center px-2 py-2 relative w-[45vw] xl:w-[28vw] lg:w-[25vw] md:w-[25vw] 2xl:w-[25vw] 4k:w-[25vw] 2k:w-[25vw]"
                    }`}
                >
                  <div className="flex">
                    <p className="pl-1">{item.title}</p>
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-html={item.tooltip}
                      style={{ display: item.tooltipdispaly }}
                      className="cursor-pointer ml-2 float-end mt-1 w-10"
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {options.rowLabels.map((rowLabel, rowIndex) => {
              // Only the last row is read-only
              const isRowReadOnly =
                rowIndex === options.rowLabels.length - 1 ||
                rowLabel.layout === "readonly";
              return (
                <tr key={rowIndex}>
                  {options.titles.map((column, columnIndex) => {
                    const cellValue = localValue[rowIndex]?.[column.key] || "";
                    const isFirstColumn = columnIndex === 0;

                    return (
                      <td
                        key={columnIndex}
                        className="border-b border-gray-300 text-left p-2 text-[12px]"
                      >
                        {isFirstColumn ? (
                          <div className="relative">
                            <p className="flex gap-1">
                              {rowLabel.title}
                              {/* <MdInfoOutline
                                data-tooltip-id={`tooltip-${rowLabel.title.replace(
                                  /\s+/g,
                                  "-"
                                )}`}
                                data-tooltip-html={rowLabel.tooltip}
                                style={{ display: rowLabel.tooltipdispaly }}
                                className="cursor-pointer ml-2 float-end mt-1 w-10"
                              />
                              <ReactTooltip
                                id={`tooltip-${rowLabel.title.replace(
                                  /\s+/g,
                                  "-"
                                )}`}
                                place="top"
                                effect="solid"
                                style={{
                                  width: "auto",
                                  height: "auto",
                                  backgroundColor: "#000",
                                  color: "white",
                                  fontSize: "11px",
                                  borderRadius: "8px",
                                  zIndex: 1000,
                                }}
                              /> */}
                            </p>
                          </div>
                        ) : isRowReadOnly ||
                          column.layout === "readonly" ? (
                          <input
                            readOnly
                            value={cellValue}
                            className="text-[12px] pl-2 py-2 w-full text-left bg-gray-50 text-gray-500"
                            placeholder="Auto Calculated"
                          />
                        ) : (
                          <>
                            {column.layout === "inputDecimal" && (
                              <input
                                type="text"
                                inputMode="decimal"
                                pattern="^[0-9]*[.]?[0-9]*$"
                                required={required}
                                value={cellValue}
                                onChange={(e) => {
                                  const input = e.target.value;
                                  const cleaned = input
                                    .replace(/[^0-9.]/g, "")
                                    .replace(/(\..*)\./g, "$1");
                                  handleFieldChange(
                                    rowIndex,
                                    column.key,
                                    cleaned
                                  );
                                }}
                                className="text-[12px] pl-2 py-2 w-full text-left"
                                placeholder="Enter data"
                              />
                            )}

                            {column.layout === "inputNumber" && (
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                required={required}
                                value={cellValue}
                                onChange={(e) =>
                                  handleFieldChange(
                                    rowIndex,
                                    column.key,
                                    e.target.value.replace(/[^0-9]/g, "")
                                  )
                                }
                                className="text-[12px] pl-2 py-2 w-full text-left"
                                placeholder="Enter data"
                              />
                            )}
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {options.titles.map((item) => (
        <ReactTooltip
          key={item.key}
          id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
          place="top"
          effect="solid"
          style={{
            width: "500px",
            height: "auto",
            backgroundColor: "#000",
            color: "white",
            fontSize: "11px",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        />
      ))}
    </div>
  );
};

export default TurnoverWidget;