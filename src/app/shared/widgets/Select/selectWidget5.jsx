import React, { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const SelectWidget5 = ({
  onChange,
  value = "",
  placeholder,
  label,
  title,
  uiSchema = {},
  schema = {},
  id,
  options,
  formContext,
  name,
}) => {
  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split('_')[1], 10);
  const rowErrors = validationErrors && validationErrors[rowIndex] || {};
  const hasError = !value && rowErrors && rowErrors[name];
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
    setOtherValue(inputValue);
    onChange(inputValue); // Send the "Other" input value to the parent
  };

  const randomId = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const tooltipId = schema.title
    ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
    : `tooltip-${id}-${randomId}`;

  return (
    <div className="mb-3 px-1">
      <div className="relative w-[100%]">
        {id.startsWith("root_0") && (
          <>
            <p className="flex text-[13px] 4k:text-[15px] text-neutral-950 font-[400] mb-2 leading-[15px] ml-1">
             {uiSchema["ui:title"]}
              <MdInfoOutline
               data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltipstitle"]}
                className="mt-0.5 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:titletooltipdisplay"] }}
              />
              <ReactTooltip
                id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                style={{
                  minWidth: "300px", // Minimum width
                  maxWidth: "700px", // Maximum width
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  zIndex:100,
                }}
              ></ReactTooltip>
            </p>
          </>
        )}
      </div>

      <div className="relative">
        {/* Render select or input based on state */}
        {!showOtherInput ? (
          <select
            className={`block w-[560px] py-2 text-[12px] 4k:text-[14px] mb-6  custom-select focus:outline-none focus:border-blue-300 border-2 rounded-md p-2 border-gray-200 capitalize table-scrollbar ${hasError ? 'border-red-500' : 'border-gray-300'}`}
            value={value}
            onChange={handleChange}
            disabled={options.disabled}
          >
            <option value="" disabled={!value} className="text-gray-500">
              {`Select` || "Select..."}
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
            className={`block w-[56vw] xl:w-[20vw] lg:w-[20vw] md:w-[20vw] 2xl:w-[20vw]  4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 ${
              id.startsWith("root_0") ? "mt-[0.38rem]" : "mt-0.5"
            }`}
            placeholder={`Specify other`}
            value={otherValue}
            onChange={handleOtherInputChange}
          />
        )}
      </div>
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">
          {hasError}
        </div>
      )}
    </div>
  );
};

export default SelectWidget5;
