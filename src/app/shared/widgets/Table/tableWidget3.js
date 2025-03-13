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
    <div  className="mb-2">
      <table id={id} className="rounded-md w-full border-x border-t border-gray-300" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="gradient-background h-[54px] " >
          <tr>
            <th className="text-[12px]  border-r border-b  border-gray-300 px-2 py-2 w-auto text-left">
              Employee Category
            </th>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                className="text-[12px] border-r border-b  border-gray-300 px-2 py-2 w-auto text-center"
              >
                {item.title}
              </th>
            ))}
            <th className="text-[12px] px-2 py-2 w-auto text-center border-b  border-gray-300">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {options.rowLabels.map((rowLabel, rowIndex) => (
            <tr key={rowIndex}>
              <td className=" border-r border-b border-gray-300 py-2 px-2 text-[12px] relative w-[229px] xl:w-[300px] lg:w-[300px] md:w-[300px] 2xl:w-[300px] 4k:w-[300px] 2k:w-[300px]  ">
                <div className="flex">
                <p>{rowLabel.title}</p>{" "}
                <MdInfoOutline
                  data-tooltip-id={`tooltip-${rowLabel.title.replace(
                    /\s+/g,
                    "-"
                  )}`}
                  data-tooltip-content={rowLabel.tooltip}
                  className="cursor-pointer ml-2"
                />
                <ReactTooltip
                  id={`tooltip-${rowLabel.title.replace(/\s+/g, "-")}`}
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
                </div>
           
              </td>
              {options.titles.map((column, columnIndex) => (
                <td key={columnIndex} className="border-b border-r border-gray-300  px-2 text-[12px]">
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
                    className="text-[12px] pl-2  w-full text-center p-0 m-0"
                    placeholder="10"
                  />
                </td>
              ))}
              <td className="border-gray-300 border-b text-center text-[12px]">
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
