"use client";
import React, { useEffect } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const EconmiccutomTable = ({
  id,
  options,
  value = [],
  required,
  onChange,
  formContext,
}) => {
  // Function to update a specific field in a row
  const updateField = (index, key, newValue) => {
    const newData = value.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: newValue };
      }
      return item;
    });
    onChange(newData); // Notify parent of changes
  };



  return (
    <div
      style={{
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "80vw",
      }}
      className="mb-2 pb-2"
    >
      <table id={id} className="table-fixed border-collapse w-full">
        <thead className="gradient-background">
          <tr className="h-[102px]">
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ width: "17vw", textAlign: "left" }}
                className="text-[12px] border border-gray-300 px-2 py-2"
              >
                <div className="flex items-center relative">
                  <p>{item.title}</p>
                  {item.tooltipdisplay === "block" && (
                    <p>
                      <MdInfoOutline
                        data-tooltip-id={`tooltip-${item.title.replace(
                          /\s+/g,
                          "-"
                        )}`}
                        data-tooltip-content={item.tooltip}
                        className="ml-2 cursor-pointer"
                      />
                      <ReactTooltip
                        id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                        place="top"
                        effect="solid"
                        className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                      />
                    </p>
                  )}
                </div>
              </th>
            ))}
            <th className="w-[5vw] border border-gray-300 "></th>
          </tr>
        </thead>
        <tbody>
          {value.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(item).map((key, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-2">
                  {options.titles[cellIndex].widgettype === "textarea" ? (
                    <textarea
                      required={required}
                      value={item[key]}
                      onChange={(e) =>
                        updateField(rowIndex, key, e.target.value)
                      }
                      style={{ width: "100%" }}
                      placeholder="Enter data"
                      className="text-sm pl-2 my-1 py-1"
                    />
                  ) : (
                    <input
                      type={options.titles[cellIndex].type || "text"}
                      required={required}
                      value={item[key]}
                      onChange={(e) =>
                        updateField(rowIndex, key, e.target.value)
                      }
                      style={{ width: "100%" }}
                      placeholder="Enter data"
                      className="text-sm pl-2 py-2"
                    />
                  )}
                </td>
              ))}
             <td className="border border-gray-300 p-3">
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


export default EconmiccutomTable;
