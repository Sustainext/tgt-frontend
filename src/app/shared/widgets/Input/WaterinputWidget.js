import React, { useRef, useEffect } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const WaterinputWidget = ({
  onChange,
  value = "",
  placeholder,
  label,
  title,
  uiSchema = {},
  schema = {},
  id,
  formContext,
  name,
  isEnabled = false, // Add isEnabled prop with default value
}) => {
  const inputRef = useRef();
  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split('_')[1], 10);
  const rowErrors = validationErrors && validationErrors[rowIndex] || {};
  const hasError = !value && rowErrors && rowErrors[name];
  // Focus input if enabled
  useEffect(() => {
    if (isEnabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEnabled]);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event) => {
    // Prevent 'e', '+', '-', and '.' from being entered
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const randomId = Math.floor(Math.random() * 10000);
  const tooltipId = schema.title
    ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
    : `tooltip-${id}-${randomId}`;

  return (
    <div className="mb-3 px-1">
      {id.startsWith("root_0") && (
        <div className="relative flex justify-end">
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
      <div>
        <input
          ref={inputRef} // Attach ref to input
          className={`block w-[56vw] xl:w-[20vw] lg:w-[20vw] md:w-[20vw] 2xl:w-[20vw]  4k:w-[8vw] xl:py-2 lg:py-2 md:py-2 2xl:py-2 4k:py-2 2k:py-2 py-1.5 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300 mb-3 text-right placeholders pr-2 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
          placeholder={placeholder || `Enter ${label}`}
          type="number"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={!isEnabled} // Use isEnabled prop to enable/disable input
        />
      </div>
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">
          {hasError}
        </div>
      )}
    </div>
  );
};

export default WaterinputWidget;
