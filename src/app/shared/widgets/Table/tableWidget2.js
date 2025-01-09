import React, { useState, useRef, useCallback } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const InputdiableWidget = ({
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
  isEnabled = false,
}) => {
  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split("_")[1], 10);
  const rowErrors = (validationErrors && validationErrors[rowIndex]) || {};
  const hasError = rowErrors && rowErrors[name];

  const inputType = uiSchema["ui:inputtype"] || "text";

  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  // Debounce input change handler
  const debouncedChangeHandler = useCallback(debounce((newValue) => {
    onChange(newValue); // Notify parent component
  }, 100), [onChange]); // Adjust debounce time as needed

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue); // Update local state
    debouncedChangeHandler(newValue);
  };

  const handleKeyDown = (event) => {
    const allowedControlKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];

    if (inputType === "number") {
      // Allow numeric input and control keys
      const isNumber = /^[0-9]$/.test(event.key);
      if (!isNumber && !allowedControlKeys.includes(event.key)) {
        event.preventDefault();
      }
    } else if (inputType === "text") {
      // Allow all printable characters and control keys
      const isPrintableCharacter = event.key.length === 1;
      if (!isPrintableCharacter && !allowedControlKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
  };

  return (
    <div className="mb-3 px-1">
      <div className="relative w-[100%]">
        {id.startsWith("root_0") && (
          <>
            <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1 leading-[15px] text-left">
              {label}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${id}`}
                data-tooltip-content={schema.tooltiptext}
                className="mt-0.5 ml-2 w-[30px] text-[14px]"
                style={{ display: schema.display }}
              />
              <ReactTooltip
                id={`tooltip-${id}`}
                place="top"
                effect="solid"
              />
            </p>
          </>
        )}
      </div>
      <div className="relative">
        <input
          ref={inputRef}
          className={`block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 ${
            hasError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder || `Enter ${label || title}`}
          type={inputType}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputRef.current && inputRef.current.focus()}
          onBlur={() => inputRef.current && inputRef.current.blur()}
          disabled={!isEnabled}
        />
      </div>
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">{hasError}</div>
      )}
    </div>
  );
};

export default InputdiableWidget;
