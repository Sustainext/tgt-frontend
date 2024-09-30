"use client";
import React, { useState, useCallback, useEffect } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { debounce } from "lodash";

const CustomTableWidgetGov = ({
  id,
  options,
  value,
  required,
  onChange,
  formContext,

}) => {
  // Debounced function to update form's state
  const handleInputChange = useCallback(
    debounce((newData) => {
      onChange(newData);
    }, 200),
    []
  );

  // Updates the local input and calls the debounced onChange
  const updateField = (index, key, newValue) => {
    const newData = [...value];
    newData[index][key] = newValue;
    handleInputChange(newData);
  };
  useEffect(() => {
    console.log("CustomTableWidget value:", value);
  }, [value]);

  return (
    <>
      <div className="w-full flex justify-right items-center mb-2 relative">

      </div>
      <div style={{ overflowY: "auto", maxHeight: "400px" }}>
        <table id={id} className="rounded-md border border-gray-300 w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
          <thead className="gradient-background">
            <tr>
              {options.titles.map((item, idx) => (
                <th
                  key={idx}
                  style={{ minWidth: "120px", textAlign: "left" }}
                  
                  className={` ${idx === 2 ? "" :"border-r border-gray-300" } px-2 py-2 text-[12px]`}
           
                >
                  <div className="flex items-center relative">
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
              {formContext.view !== "0" && <th></th>}
            </tr>
          </thead>
          <tbody>
            {value?.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(item).map((key, cellIndex) => (
                  <td key={cellIndex} 
                  
               
                  className={` ${cellIndex === 2 ? "" :"border-r border-t border-gray-300" } p-3`}
                  >
                    <InputField
                      type={options.titles[cellIndex].type || "text"}
                      required={required}
                      value={item[key]}
                      onChange={(newValue) =>
                        updateField(rowIndex, key, newValue)
                      }
                    />
                  </td>
                ))}
                {formContext.view !== "0" && (
                  <td className="p-3">
                    <button onClick={() => formContext.onRemove(rowIndex)}>
                      <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Component to handle individual input fields
const InputField = ({ type, required, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type={type}
      required={required}
      value={inputValue}
      onChange={handleInputChange}
      style={{ width: "100%" }}
      placeholder="Enter data"
      className="text-[12px] pl-2 py-2" // Ensures input field uses the full width of its container
    />
  );
};

export default CustomTableWidgetGov;
