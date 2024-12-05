
'use client'
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const CustomTableWidget6 = ({
  id,
  options,
  value,
  required,
  formContext,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  // Check if the current month is January
  const isJanuary = formContext.newMonth === "January";

  const handleFieldChange = (index, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[index]) {
      updatedValues[index] = {};
    }
    updatedValues[index][key] = newValue;
    setLocalValue(updatedValues);
    debouncedUpdate(updatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  return (
    <div style={{ maxHeight: "400px" }} className="mb-2">
      <table id={id} className="rounded-md w-full">
        <thead className="gradient-background">
          <tr>
            <th className="border-r"></th>
            <th colSpan="3" className="font-normal text-[14px] py-2 border-l border-gray-300 ">
              {formContext.newMonth}
            </th>
            <th  rowSpan={2} className="text-[12px] border-b border-x border-gray-300 px-2 py-2 text-center w-[20%]">
            Total number of employees  (at the beginning of the reporting period)
            </th>
            <th rowSpan={2} className="text-[12px] border-b border-l border-gray-300 px-2 py-2 text-center w-[20%]">
            Total number of employees  (at the end of the reporting period)
            </th>
          </tr>
          <tr>
          <th className="text-[12px] border-b  border-r border-gray-300 px-2 py-2  text-center w-[10%]">
              Age group
            </th>
            {options.titles.map((item, idx) => (
              <th key={idx} className="text-[12px] border-t border-b  border-gray-300 px-2 py-2 text-center relative">
                <div className="flex items-center justify-center">
                  <p>{item.title}</p>
                  <p className="relative">
                  <MdInfoOutline
                    data-tooltip-id={`tooltip-${item.title.replace(/\s+/g, '-')}`}
                    data-tooltip-content={item.tooltip}
                    className="ml-2 cursor-pointer"
                  />
                  <ReactTooltip
                    id={`tooltip-${item.title.replace(/\s+/g, '-')}`}
                    place="top"
                    effect="solid"
                    style={{
                      width:"400px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      boxShadow: 3,
                      borderRadius: "8px",
                      zIndex:"1000",
                    }}
                  />
                  </p>

                </div>
              </th>
            ))}
      
          </tr>
        </thead>
        <tbody>
          {options.rowLabels.map((rowLabel, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-t border-b border-r border-gray-300 py-2 px-2 text-[12px]">
              <div className="flex items-center justify-center relative">
                  <p className="relative">{rowLabel.title}</p>
                  <p>
                  <MdInfoOutline
                  data-tooltip-id={`tooltip-${rowLabel.title.replace(/\s+/g, '-')}`}
                  data-tooltip-content={rowLabel.tooltip}
                  className="ml-2 cursor-pointer"
                />
                <ReactTooltip
                  id={`tooltip-${rowLabel.title.replace(/\s+/g, '-')}`}
                  place="top"
                  effect="solid"
                  style={{
                    width:"400px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                    zIndex:"1000",
                  }}
                />
                  </p>

                </div>
              </td>
              {options.titles.map((column, columnIndex) => (
                <td key={columnIndex} className="border-b border-gray-300">
                  <input
                    type="number"
                    required={required}
                    value={localValue[rowIndex] && localValue[rowIndex][column.key] || ""}
                    onChange={(e) => handleFieldChange(rowIndex, column.key, parseInt(e.target.value))}
                    className="text-[12px] pl-2 py-2 w-full text-center"
                    placeholder="10"
                  />
                </td>
              ))}
              <td className="border-x border-b border-gray-300 text-center text-[12px]">
                <input
                  type="number"
                  disabled={!isJanuary}
                  value={localValue[rowIndex] && localValue[rowIndex].beginning || ""}
                  onChange={(e) => handleFieldChange(rowIndex, "beginning", parseInt(e.target.value))}
                  className="text-[12px] pl-2 py-2 w-full text-center"
                  placeholder={isJanuary ? "10" : "10"}
                />
              </td>
              <td className="border-b border-gray-300 text-center text-[12px]">
                <input
                  type="number"
                  disabled={!isJanuary}
                  value={localValue[rowIndex] && localValue[rowIndex].end || ""}
                  onChange={(e) => handleFieldChange(rowIndex, "end", parseInt(e.target.value))}
                  className="text-[12px] pl-2 py-2 w-full text-center"
                  placeholder={isJanuary ? "10" : "10"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTableWidget6;

