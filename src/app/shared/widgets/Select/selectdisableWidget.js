
"use client";
import React, { useState,useEffect } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const SelectdisableWidget = ({
  onChange,
  value = "",
  placeholder,
  label,
  title,
  uiSchema = {},
  schema = {},
  id,
  options,
  isEnabled = false, // Add isEnabled prop with default value
}) => {
  const [otherValue, setOtherValue] = useState(value || ""); // Initialize with value or empty
  const [showOtherInput, setShowOtherInput] = useState(
    value && !options?.enumOptions?.some((option) => option.value === value)
  ); // Initial state depends on if the value is an "Other" value.

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "Other (please specify)") {
      setShowOtherInput(true); // Show the input field for "Other"
      setOtherValue(""); // Reset any other input value
      onChange(""); // Reset the main value in the parent state to empty
    } else {
      setShowOtherInput(false); // Hide the "Other" input field
      onChange(selectedValue); // Set the selected value in the parent state
    }
  };

  const handleOtherInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue); // Update the parent state
  };


  const randomId = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const tooltipId = schema.title
    ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
    : `tooltip-${id}-${randomId}`;

    useEffect(() => {
      if (!isEnabled) {
    
        setShowOtherInput(false); // Hide "Other" input
      }
    }, [isEnabled]);
  return (
    <div className="mb-3 px-1">
      {id.startsWith("root_0") && (
        <div className="relative flex">
          <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1">
            {label}
            <MdInfoOutline
              data-tooltip-id={tooltipId}
              data-tooltip-content={schema.tooltiptext}
              className="mt-1 ml-2 w-[30px] text-[14px]"
            />
            <ReactTooltip
              id={tooltipId}
              place="top"
              effect="solid"
              style={{
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
      )}
         <div className="relative">
        {/* Render select or input based on state */}
        {!showOtherInput ? (
          <select
            className={`block w-[20vw] py-2 text-[12px] p-0 custom-select focus:outline-none focus:border-blue-300 border-b-2 border-gray-300 capitalize`}
            value={value}
            onChange={handleChange}
            disabled={!isEnabled}
          >
            <option value="" disabled={!value} className="text-gray-500">
              {`Select ${label}` || "Select..."}
            </option>
            {(options?.enumOptions || []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className={`block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 ${
              id.startsWith("root_0") ? "mt-[0.1rem]" : "mt-0.3"
            }`}
            placeholder={`Specify other ${label}`}
            value={otherValue}
            onChange={handleOtherInputChange}
            disabled={!isEnabled}
          />
        )}
      </div>
    </div>
  );
};

export default SelectdisableWidget;
