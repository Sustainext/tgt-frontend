import React, { useState, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MaterialityRadioWidget = ({
  options,
  value = "", // Default value should be an empty string if not provided
  autofocus,
  onChange,
  uiSchema = {},
}) => {
  const [inputState, setInputState] = useState(value); // Initialize state with the provided value
  useEffect(() => {
    setInputState(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputState(newValue); // Update the state to the new value
    onChange(newValue); // Call onChange prop with the new value
  };

  return (
    <div className="mb-6 pb-4">
        <div className="flex  xl:flex-row flex-col items-center mb-2 xl:gap-2 gap-4">
        <div className="flex items-start  xl:w-[53.5%] w-full px-2">
          <p className="text-[12px] text-gray-700 w-auto xl:mx-3">
            {uiSchema["ui:title"]}
          </p>
          <MdInfoOutline
            data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
              /\s+/g,
              "-"
            )}`}
            data-tooltip-html={`${uiSchema["ui:tooltip"]}`}
            className="ml-2 flex-shrink-0 mt-1"
            style={{
              width: "14px",
              // height: '30px',  // Ensure the icon always stays at 30x30
              display: uiSchema["ui:tooltipdisplay"],
            }}
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
          />
        </div>

        <button className="text-[#007EEF] bg-slate-200 rounded-md text-[11px] px-3 h-[22px] ml-2 w-fit self-start sm:self-center">
      {uiSchema["ui:tag"]}
    </button>
      </div>
      <div className="flex gap-2 ml-4">
        {options.enumOptions.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-2 text-[12px] mb-2"
          >
            <input
              type="radio"
              name={options.name}
              value={option.value}
              checked={inputState === option.value}
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className="form-radio h-3 w-3 text-[12px]"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MaterialityRadioWidget;
