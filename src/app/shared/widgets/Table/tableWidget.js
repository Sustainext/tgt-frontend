"use client";
import React, { useState, useEffect } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CustomTableWidget = ({
  id,
  options,
  value = [],
  required,
  onChange,
  formContext = {},
}) => {
  const [localErrors, setLocalErrors] = useState(formContext.validationErrors || []);

  useEffect(() => {
    setLocalErrors(formContext.validationErrors || []);
  }, [formContext.validationErrors]);

  const updateField = (index, key, newValue) => {
    const newData = [...value];
    newData[index][key] = newValue;

    // Update validation errors dynamically
    const updatedErrors = [...localErrors];
    if (!newValue.trim()) {
      if (!updatedErrors[index]) updatedErrors[index] = {};
      updatedErrors[index][key] = "";
    } else if (updatedErrors[index]) {
      delete updatedErrors[index][key];
    }

    setLocalErrors(updatedErrors);
    onChange(newData);
  };

  const removeRow = (index) => {
    const newData = [...value];
    newData.splice(index, 1);

    const updatedErrors = [...localErrors];
    updatedErrors.splice(index, 1);

    setLocalErrors(updatedErrors);
    onChange(newData);
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: "400px" }} className="custom-scrollbar">
      <table
        id={id}
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="gradient-background h-[54px]">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ minWidth: "120px", textAlign: "left" }}
                className={`${
                  idx === 0 ? "" : "border-l"
                } text-[12px] px-2 py-2 border-gray-300`}
              >
                <div className="relative w-[357px] xl:w-auto lg:w-auto  md:w-auto  2xl:w-auto  4k:w-auto  2k:w-auto ">
                  <p className="flex">
                    {item.title}
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                      data-tooltip-content={item.tooltip}
                      className= {`cursor-pointer w-[10%] mt-1 ml-0.5 ${item.display=="none"?'hidden':''}`}
                    />
                    <ReactTooltip
                      id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                      place="top"
                      effect="solid"
                      style={{
                        width: "400px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        zIndex: "1000",
                      }}
                    />
                  </p>
                </div>
              </th>
            ))}
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {value.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key, cellIndex) => {
                const error = localErrors[rowIndex]?.[key];
                return (
                  <td
                    key={cellIndex}
                    className={`${
                      cellIndex === 0 ? "" : "border-l"
                    } border-t border-gray-300 p-3`}
                  >
                    <InputField
                      type={options.titles[cellIndex].type || "text"}
                      required={required}
                      value={row[key]}
                      onChange={(newValue) => updateField(rowIndex, key, newValue)}
                      hasError={!!error}
                      errorMessage={error}
                    />
                  </td>
                );
              })}
              <td className="border-t border-gray-300 p-3">
                <button onClick={() => removeRow(rowIndex)}>
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

const InputField = ({ type, required, value, onChange, hasError, errorMessage }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type={type}
        required={required}
        value={value || ""}
        onChange={handleInputChange}
        style={{ width: "100%" }}
        placeholder="Enter data"
        className={`text-[12px] pl-2 py-2 ${
          hasError ? "border-red-500 " : "border-gray-300"
        } border-b`}
      />
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default CustomTableWidget;