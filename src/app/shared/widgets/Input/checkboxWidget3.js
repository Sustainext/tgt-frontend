import React, { useState, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CheckboxWidget3 = ({
  options,
  value = {}, // Default to an empty object
  autofocus,
  onChange,
  uiSchema = {},
}) => {
  const defaultState = {
    selected: [], // Array for multiple selections
    otherValue: "",
  };

  // Initialize state
  const [inputState, setInputState] = useState({
    selected: value.selected || defaultState.selected,
    otherValue: value.otherValue || defaultState.otherValue,
  });

  // Update state when value prop changes
  useEffect(() => {
    setInputState({
      selected: value.selected || defaultState.selected,
      otherValue: value.otherValue || defaultState.otherValue,
    });
  }, [value]);

  const otherOptionValue = "Other, please specify";

  const handleChange = (event) => {
    const newValue = event.target.value;
    const isChecked = event.target.checked;
    const updatedSelected = isChecked
      ? [...inputState.selected, newValue]
      : inputState.selected.filter((item) => item !== newValue);

    const updatedState = {
      ...inputState,
      selected: updatedSelected,
      otherValue: newValue === otherOptionValue && !isChecked ? "" : inputState.otherValue,
    };

    setInputState(updatedState);
    onChange(updatedState);
  };

  const handleOtherChange = (event) => {
    const newOtherValue = event.target.value;
    const updatedState = {
      ...inputState,
      otherValue: newOtherValue,
    };
    setInputState(updatedState);
    onChange(updatedState);
  };

  return (
    <div className="mb-6">
      <div className="flex mb-4 items-center relative">
        <p className="text-[14px] text-gray-700 font-[500] flex">
          {uiSchema["ui:title"]}
          <MdInfoOutline
            data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
              /\s+/g,
              "-"
            )}`}
            data-tooltip-content={uiSchema["ui:tooltip"]}
            className="ml-2 text-[14px] align-middle mt-1"
            style={{ display: uiSchema["ui:tooltip"] ? "inline" : "none" }}
          />
          <ReactTooltip
            id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
            place="top"
            effect="solid"
            style={{
              width: "400px",
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
      <div className="grid grid-cols-2 gap-2">
        {options.enumOptions.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-2 text-[14px] mb-2"
          >
            <input
              type="checkbox"
              name={options.name}
              value={option.value}
              checked={inputState.selected.includes(option.value)}
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className="form-checkbox h-3 w-3"
            />
            {option.label}
          </label>
        ))}
      </div>
      <label className="flex items-center gap-2 text-[14px] mb-2 mt-2">
        <input
          type="checkbox"
          name={options.name}
          value={otherOptionValue}
          checked={inputState.selected.includes(otherOptionValue)}
          autoFocus={autofocus && options.enumOptions.length === 0}
          onChange={handleChange}
          className="form-checkbox h-3 w-3"
        />
        Other, please specify
      </label>
      {inputState.selected.includes(otherOptionValue) && (
        <input
          type="text"
          value={inputState.otherValue}
          autoFocus={autofocus}
          onChange={handleOtherChange}
          className="block py-4 px-2 text-gray-500 text-[12px] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize w-full"
          placeholder="Enter data"
        />
      )}
    </div>
  );
};

export default CheckboxWidget3;
