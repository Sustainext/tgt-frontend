"use client";
import React, { useState, useCallback, useEffect } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { debounce } from "lodash";

const MaterialityTableWidget = ({
  id,
  options,
  value,
  required,
  onChange,
  formContext,
  uiSchema
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

  console.log(options.titles)
  return (
    <div className="mx-2 p-3 mb-6 pb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
        <div className="flex mb-4">
          <div className=" relative w-full">
            <p className="text-[15px] text-gray-700 flex">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={`${uiSchema["ui:tooltip"]}`}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />
              {/* Tooltip */}
              <ReactTooltip
                id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                }}
              ></ReactTooltip>
            </p>
          </div>
          <button className="text-[#007EEF] bg-slate-200 rounded-md text-[11px] w-[72px] h-[22px] ml-6 text-center mt-1">
            {uiSchema['ui:tag']}
          </button>
        </div>
        <div style={{ overflowY: "auto", maxHeight: "400px" }}>
      <table id={id} className="rounded-lg border border-gray-300 w-full">
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ minWidth: "120px", textAlign: "center" }}
                className="text-[12px] border border-gray-300 px-2 py-2"
              >
                <div className="flex items-center">
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
                   {formContext.view !== "0" && (
            <th></th>
          )}
          </tr>
        </thead>
        <tbody>
          {value?.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(item).map((key, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 p-3">
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
                <td className="border border-gray-300 p-3">
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
    </div>
   
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
      className="text-sm pl-2 py-2" // Ensures input field uses the full width of its container
    />
  );
};

export default MaterialityTableWidget;
