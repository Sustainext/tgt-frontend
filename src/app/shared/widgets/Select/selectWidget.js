import React, { useState, useEffect } from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const SelectWidget = ({ onChange, value = "", placeholder, label, title, uiSchema = {}, schema = {}, id, options }) => {
  const [otherValue, setOtherValue] = useState(""); // State to store the value of the other input
  const [showOtherInput, setShowOtherInput] = useState(false); // State to control showing the input box

  // Check if the value from API exists in the provided options
  useEffect(() => {
    const isOptionAvailable = options?.enumOptions?.some(option => option.value === value);

    if (!isOptionAvailable && value) {
      // If the value from the API is not in the options, show the input box and set the value
      setShowOtherInput(true);
      setOtherValue(value);
    } else {
      setShowOtherInput(false);
    }
  }, [value, options]);

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    // If the selected value is "Other (please specify)", show input box
    if (selectedValue === "Other (please specify)") {
      setShowOtherInput(true);
      onChange(""); // Reset the selected value (since input will be used)
    } else {
      setShowOtherInput(false); // Hide the input field if a valid option is selected
      onChange(selectedValue); // Pass the selected value up
    }
  };

  const handleOtherInputChange = (e) => {
    setOtherValue(e.target.value);
    onChange(e.target.value); // Pass the custom input value up
  };

  const randomId = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const tooltipId = schema.title
    ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
    : `tooltip-${id}-${randomId}`;

  return (
    <div className="mb-3 px-1">
      <div className="relative w-[68%]">
        {id.startsWith("root_0") && (
          <>
            <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1 leading-[15px] ml-1">
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
                  width: "400px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  padding: "10px",
                  zIndex: "1000",
                }}
              />
            </p>
          </>
        )}
      </div>

      <div className='relative'>
        {/* Conditionally render either the select box or the input box based on showOtherInput state */}
        {!showOtherInput ? (
          <select
            className={`block w-[20vw] py-2 text-[12px] p-0 custom-select focus:outline-none focus:border-blue-300 border-b-2 border-gray-300 capitalize`}
            value={value}
            onChange={handleChange}
          >
            <option
              value=""
              disabled={!value}
              className="text-gray-500" // Add Tailwind CSS class for gray text
            >
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
            className={`block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 ${id.startsWith("root_0") ? "mt-[0.38rem]" :"mt-0.5"}`}
            placeholder={`Specify other ${label}`}
            value={otherValue}
            onChange={handleOtherInputChange}
          />
        )}
      </div>
    </div>
  );
};

export default SelectWidget;
