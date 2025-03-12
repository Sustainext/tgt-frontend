import React, { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const SelectWidget = ({
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

  const [otherValue, setOtherValue] = useState(value || ""); 
  const [showOtherInput, setShowOtherInput] = useState(
    value && !options?.enumOptions?.some((option) => option.value === value)
  );

  const [showTooltip, setShowTooltip] = useState(false); // Tooltip for disabled state

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "Other (please specify)") {
      setShowOtherInput(true);
      setOtherValue("");
      onChange(""); 
    } else {
      setShowOtherInput(false);
      onChange(selectedValue);
    }
  };

  const handleOtherInputChange = (e) => {
    const inputValue = e.target.value;
    setOtherValue(inputValue);
    onChange(inputValue);
  };

  const randomId = Math.floor(Math.random() * 10000); 
  const tooltipId = `tooltip-${id}-${randomId}`;

  return (
    <div className="mb-3 px-1">
      {/* Label & Info Tooltip */}
      <div className="relative w-full">
        {id.startsWith("root_0") && (
          <>
            <p className="flex text-[13px] 4k:text-[15px] h-[35px] text-neutral-950 font-[400] mb-1 leading-[15px] ml-1">
              {label}
              <MdInfoOutline
                data-tooltip-id={tooltipId}
                data-tooltip-content={schema.tooltiptext}
                className="mt-0.5 ml-2 w-[30px] text-[14px]"
                style={{ display: schema.display }}
              />
              <ReactTooltip
                id={tooltipId}
                place="top"
                effect="solid"
                style={{
                  minWidth: "300px",
                  maxWidth: "700px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  zIndex: 100,
                }}
              />
            </p>
          </>
        )}
      </div>

      {/* Select Dropdown / Other Input */}
      <div className="relative">
        {!showOtherInput ? (
          <select
            className={`block w-[56vw] xl:w-[20vw] lg:w-[20vw] md:w-[20vw] 2xl:w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] p-0 focus:outline-none focus:border-blue-300 border-b-2 border-gray-300 capitalize ${
              hasError ? "border-red-500" : "border-gray-300"
            }`}
            value={value}
            onChange={handleChange}
            disabled={options.disabled}
            onMouseEnter={() => options.disabled && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            data-tooltip-id={options.disabled ? tooltipId : ""}
          >
            <option value="" disabled={!value} className="text-gray-500">
              {`Select ${label}` || "Select..."}
            </option>
            {(options?.enumOptions || []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option value="Other (please specify)">Other (please specify)</option>
          </select>
        ) : (
          <input
            type="text"
            className={`block w-[56vw] xl:w-[20vw] lg:w-[20vw] md:w-[20vw] 2xl:w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 ${
              id.startsWith("root_0") ? "mt-[0.38rem]" : "mt-0.5"
            } disabled:cursor-not-allowed`}
            placeholder={`Specify other ${label}`}
            value={otherValue}
            onChange={handleOtherInputChange}
          />
        )}

        {/* Tooltip for Disabled Field */}
        {options.disabled && (
          <ReactTooltip
            id={tooltipId}
            place="top"
            effect="solid"
            style={{
                  minWidth: "200px",
                  maxWidth: "500px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  padding: "10px",
                  zIndex: "1000",
                }}
          >
            No data available/opted out in ODS Production Import and Export.
          </ReactTooltip>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">
          {hasError}
        </div>
      )}
    </div>
  );
};

export default SelectWidget;
