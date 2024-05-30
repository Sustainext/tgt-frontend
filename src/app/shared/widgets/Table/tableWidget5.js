
'use client'
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const CustomTableWidget5 = ({
  id,
  options,
  value,
  required,
  formContext,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState(value);


  const handleFieldChange = (index, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[index]) {
      updatedValues[index] = {};
    }
    updatedValues[index][key] = newValue;

    // Compute total whenever any value changes
    updatedValues[index].total = computeRowTotal(index, updatedValues);

    setLocalValue(updatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  const computeRowTotal = (rowIndex, values) => {
    const rowValues = values[rowIndex];
    return options.titles.reduce((acc, column) => {
      const value =
        rowValues && rowValues[column.key]
          ? parseInt(rowValues[column.key], 10)
          : 0;
      return acc + value;
    }, 0);
  };


  return (
    <div style={{ maxHeight: "400px" }} className="mb-2">
      <table id={id} className="rounded-md border border-gray-300 w-full">
        <thead className="gradient-background">
          <tr>
            <th className="border-r"></th>
            <th colSpan="3" className="font-normal text-[14px] py-2">
            {formContext.newMonth}
            </th>
            <th className="border-l"></th>
          </tr>
          <tr>
            <th className="text-[12px] border-b border-gray-300 px-2 py-2 w-auto text-center">
              Age group
            </th>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                className="text-[12px] border border-gray-300 px-2 py-2 w-auto text-center"
              >
                {item.title}
              </th>
            ))}
            <th className="text-[12px] border-b border-gray-300 px-2 py-2 w-auto text-center">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {options.rowLabels.map((rowLabel, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-t border-gray-300 py-2 px-2 text-[13px] text-center">
                {rowLabel.title}
              </td>
              {options.titles.map((column, columnIndex) => (
                <td key={columnIndex} className="border border-gray-300">
                  <input
                    type="number"
                    required={required}
                    value={localValue[rowIndex] && localValue[rowIndex][column.key] || ""}
                    onChange={(e) => handleFieldChange(rowIndex, column.key, e.target.value)}
                    className="text-sm pl-2 py-2 w-full text-center"
                    placeholder="10"

                  />
                </td>
              ))}
              <td className="border-b border-gray-300 text-center text-sm">
                {" "}
                {localValue[rowIndex].total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTableWidget5;
