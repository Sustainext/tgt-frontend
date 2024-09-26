"use client";
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const CustomTableWidget3 = ({ id, options, value, required, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
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
            <th className="text-[12px] border border-gray-300 px-2 py-2 w-auto text-left">
              Employee Category{" "}
            </th>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                className="text-[12px] border border-gray-300 px-2 py-2 w-auto text-center"
              >
                {item.title}
              </th>
            ))}
            <th className="text-[12px] border border-gray-300 px-2 py-2 w-auto text-center">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {options.rowLabels.map((rowLabel, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-t flex border-gray-300 py-2 px-2 text-[12px] relative ">
                <p className="w-[80%]">{rowLabel.title}</p>{" "}
                <MdInfoOutline
                  data-tooltip-id={`tooltip-${rowLabel.title.replace(
                    /\s+/g,
                    "-"
                  )}`}
                  data-tooltip-content={rowLabel.tooltip}
                  className="ml-2 cursor-pointer w-[20%]"
                />
                <ReactTooltip
                  id={`tooltip-${rowLabel.title.replace(/\s+/g, "-")}`}
                  place="top"
                  effect="solid"
                  className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                />
              </td>
              {options.titles.map((column, columnIndex) => (
                <td key={columnIndex} className="border border-gray-300">
                  <input
                    type="number"
                    required={required}
                    value={
                      (localValue[rowIndex] &&
                        localValue[rowIndex][column.key]) ||
                      ""
                    }
                    onChange={(e) =>
                      handleFieldChange(rowIndex, column.key, e.target.value)
                    }
                    className="text-[12px] pl-2 py-2 w-full text-center"
                    placeholder="10"
                  />
                </td>
              ))}
              <td className="border border-gray-300 text-center text-[12px]">
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

export default CustomTableWidget3;
