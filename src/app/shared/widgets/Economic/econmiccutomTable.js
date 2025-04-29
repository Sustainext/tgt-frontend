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
      className="mb-2 pb-2 custom-scrollbar"
    >
      <table id={id} className="table-fixed border border-gray-300  w-full rounded-md" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="gradient-background">
          <tr className="h-[102px]">
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{textAlign: "left" }}
                className={` ${idx === 0 ? "" :"border-l" } text-[12px]  px-2 py-2 border-gray-300 xl:w-[17vw] lg:w-[17vw] 2xl:w-[17vw] 4k:w-[17vw] 2k:w-[17vw] 3xl:w-[17vw] md:w-[37vw] w-[77vw]`}
             
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
                  )}
                </div>
              </th>
            ))}
            <th className="w-[7vw] xl:w-[5vw] lg:w-[5vw] 4k:w-[5vw] 2k:w-[5vw] 2xl:w-[5vw] 3xl:w-[5vw] md:w-[5vw]"></th>
          </tr>
        </thead>
        <tbody>
          {value.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(item).map((key, cellIndex) => (
                <td key={cellIndex} 
                className={` ${cellIndex == 0 ? "" :"border-l" } border-t  border-gray-300 px-2`}
               >
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
             <td className="border-t border-gray-300 p-3 flex justify-center">
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
