import React, { useState, useRef, useEffect,useCallback  } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";
import { debounce } from 'lodash';
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
  setInputnewValue,
}) => {
  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split("_")[1], 10);
  const rowErrors = (validationErrors && validationErrors[rowIndex]) || {};
  const hasError = rowErrors && rowErrors[name];

  const inputType = uiSchema["ui:inputtype"] || "text";

  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  const debouncedOnChange = useCallback(
    debounce((newValue) => {
      onChange(newValue);
    }, 2000),
    [onChange]
  );


  useEffect(() => {
    setInputValue(value || "");
  }, [value]);


  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

 
    debouncedOnChange(newValue);
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
 
  const tooltipId = schema.title
    ? `tooltip-${schema.title.replace(/\s+/g, "-")}`
    : `tooltip-${id}`;

  return (
    <div className="mb-3 px-1">
      <div className="relative w-[100%]">
        {id.startsWith("root_0") && (
          <>
            <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1 leading-[15px] text-left">
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
                  minWidth: "200px",
                  maxWidth: "500px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: "3px 3px 6px rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  padding: "10px",
                  zIndex: "1000",
                }}
              />
            </p>
          </>
        )}
      </div>
      <div className="relative">
        <input
          ref={inputRef}
          className={`block w-[76vw] xl:w-[20vw] lg:w-[20vw] md:w-[20vw] 2xl:w-[20vw] 4k:w-[8vw] py-1.5 xl:py-2 md:py-2 lg:py-2 2xl:py-2 4k:py-2 2k:py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 ${
            hasError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder || `Enter ${label || title}`}
          type={inputType} // Use the determined input type
          value={inputValue} // Bind to local state for real-time updates
          onChange={handleInputChange} // Update local state and notify parent
          onKeyDown={handleKeyDown}
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
