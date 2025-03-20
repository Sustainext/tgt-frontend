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
    <div style={{ overflowY: "auto", maxHeight: "400px" }} className="mb-2 custom-scrollbar">
      <table id={id} className="rounded-md border border-gray-300 w-full"  style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="gradient-background h-[54px]">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
               
                className={` ${idx === 0 ? "" :"border-l" } text-[12px] px-2 py-2  border-gray-300`}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {value?.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(item).map((key, cellIndex) => (
                <td key={cellIndex} 
                className={` ${cellIndex === 0 ? "" :"border-l" } border-t text-[12px] p-3 border-gray-300`}
             >
                  <textarea
                    placeholder="Enter data"
                    className="border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                    value={item[key] || ""}
                    onChange={(e) => updateField(rowIndex, key, e.target.value)}
                    rows={4}
                  />
                </td>
              ))}
              <td className="border-t  border-gray-300 p-3 text-center">
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
