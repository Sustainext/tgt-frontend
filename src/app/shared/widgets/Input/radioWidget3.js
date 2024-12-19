import React, { useState, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const RadioWidget3 = ({
  options,
  value = "", // Default value should be an empty string if not provided
  autofocus,
  onChange,
  uiSchema = {},
  formContext,
  id,
  name,
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

  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split("_")[1], 10);
  const rowErrors = (validationErrors && validationErrors[rowIndex]) || {};
  const hasError = !value && rowErrors && rowErrors[name];

  return (
    <div className="mb-6 px-1">
      <div className="flex justify-between items-center mb-2 w-full">
        <div className="flex relative">
          <div>
            <h6
              className="text-[14px] font-medium text-[#344054] flex"
              style={{ display: uiSchema["ui:haddingdisplay"] }}
            >
              {uiSchema["ui:hadding"]}
            </h6>
          </div>
          <div>
            <MdInfoOutline
              data-tooltip-id={`tooltip-${uiSchema["ui:hadding"].replace(
                /\s+/g,
                "-"
              )}`}
              data-tooltip-html={uiSchema["ui:tooltipshadding"]}
              className="mt-1 ml-1 text-[14px]"
              style={{ display: uiSchema["ui:haddingtooltipdisplay"] }}
            />
            {/* Tooltip */}
            <ReactTooltip
              id={`tooltip-${uiSchema["ui:hadding"].replace(/\s+/g, "-")}`}
              place="top"
              effect="solid"
              scrollHide={true}
              globalEventOff="scroll"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                zIndex: 100,
              }}
            ></ReactTooltip>
          </div>
        </div>
        <div style={{ display: uiSchema["ui:gridisplay"] }} className="">
          <div className="bg-sky-100 h-[25px] w-[70px] rounded-md">
            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
              {uiSchema["ui:Gri"]}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex mb-2">
          <div className="relative flex">
            <h6 className="text-[14px] text-[#727272]">
              {uiSchema["ui:title"]}
            </h6>
            <MdInfoOutline
              data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                /\s+/g,
                "-"
              )}`}
              data-tooltip-html={uiSchema["ui:tooltipstitle"]}
              className="mt-1 mr-4 text-[#344054] text-[14px]"
              style={{ display: uiSchema["ui:titletooltipdisplay"] }}
            />

            <ReactTooltip
              id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
              place="top"
              effect="solid"
              scrollHide={true}
              globalEventOff="scroll"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
              }}
            ></ReactTooltip>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {options.enumOptions.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-2 text-[14px] mb-2"
          >
            <input
              type="radio"
              name={options.name}
              value={option.value}
              // checked={inputState === option.value}
              checked={option.value === value}
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className="form-radio h-3 w-3"
            />
            {option.label}
          </label>
        ))}
      </div>
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">
          Please select an option
        </div>
      )}
    </div>
  );
};

export default RadioWidget3;
