import React, { useState, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const RadioWidget2 = ({
  options,
  value = "", // Default value should be an empty string if not provided
  autofocus,
  onChange,
  uiSchema = {},
  formContext,name
}) => {
  const [inputState, setInputState] = useState(value); // Initialize state with the provided value
  useEffect(() => {
    setInputState(value);
  }, [value]);

  const { validationErrors } = formContext || {};
  const rowErrors = validationErrors || {};
  const hasError = !value && rowErrors && rowErrors[name]

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputState(newValue); // Update the state to the new value
    onChange(newValue); // Call onChange prop with the new value
  };

  return (
    <div className="mb-6">
      <div className="flex mb-4 items-center relative w-full">
        <p className="text-[14px] 4k:text-[16px] text-gray-700 font-[500] flex">
          {uiSchema["ui:title"]}
          <MdInfoOutline
            data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
              /\s+/g,
              "-"
            )}`}
            data-tooltip-content={uiSchema["ui:tooltip"]}
            className="ml-2 text-[14px] 4k:text-[16px] align-middle mt-1 w-[20%] xl:w-[23px] lg:w-[23px] md:w-[23px] 2xl:w-[23px] 4k:w-[23px] 2k:w-[23px]"
            style={{ display: uiSchema["ui:tooltipdisplay"] }}
          />
          <ReactTooltip
            id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
            place="top"
            effect="solid"
            style={{
              width:"300px",
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
      <div className="flex gap-4">
        {options.enumOptions.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-2 text-[14px] 4k:text-[16px] mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name={options.name}
              value={option.value}
              checked={inputState === option.value}
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className={`form-radio h-3 w-3 ${
            hasError
              ? "border-red-500"
              : "border-gray-400"
          } `}
            />
            {option.label}
          </label>
        ))}
      </div>
      {hasError && (
          <div className="text-red-500 text-[12px] mt-1">
           {hasError}
          </div>
        )}
    </div>
  );
};

export default RadioWidget2;
