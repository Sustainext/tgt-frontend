"use client";
import React, { useEffect } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CustomtextareaTableWidget = ({
  id,
  options,
  value,
  required,
  onChange,
  formContext,
}) => {
  // Updates the local input and calls the onChange directly
  const updateField = (index, key, newValue) => {
    const newData = value.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: newValue };
      }
      return item;
    });
    onChange(newData);
  };

  useEffect(() => {
    // console.log("CustomTableWidget value:", value);
  }, [value]);

  return (
    <div style={{ overflowY: "auto", maxHeight: "400px" }} className="mb-2">
      <table id={id} className="rounded-md border border-gray-300 w-full">
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ minWidth: "120px" }}
                className="text-[12px] border border-gray-300 px-2 py-2 text-center"
              >
                <div className="flex items-center justify-center relative">
                  <p>{item.title}</p>
                  <p>
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-content={item.tooltip}
                      style={{ display: `${item.display}` }}
                      className="ml-2 cursor-pointer"
                    />
                    <ReactTooltip
                      id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                      place="top"
                      effect="solid"
                      className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                    />
                  </p>
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {value?.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(item).map((key, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 p-3">
                  <textarea
                    placeholder="Enter data"
                    className="border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                    value={item[key] || ""}
                    onChange={(e) => updateField(rowIndex, key, e.target.value)}
                    rows={4}
                  />
                </td>
              ))}
              <td className="border border-gray-300 p-3 text-center">
                <button onClick={() => formContext.onRemove(rowIndex)}>
                  <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomtextareaTableWidget;
