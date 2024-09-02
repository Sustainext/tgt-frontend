import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CommoninputWidget = (props) => {
  const { onChange, value = "", uiSchema = {}, options, autofocus } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    const validValue = val.match(/^\d*\.?\d{0,2}$/) ? val : value;
    onChange(validValue);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className="relative flex">
            <div>
              <h2
                className="flex mx-2 text-[17px] text-gray-500 font-semibold"
                style={{ display: uiSchema["ui:titledisplay"] }}
              >
                {uiSchema["ui:title"]}
              </h2>
            </div>

            <div>
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltip"]}
                className="mt-1.5 ml-2 w-[18px] text-[14px] text-gray-500"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />
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
              ></ReactTooltip>
            </div>
          </div>
        </div>
        {uiSchema["ui:widgetType"] === "textarea" ? (
          <textarea
            placeholder="Enter data"
            className="backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
            value={value}
            onChange={handleChange}
            rows={4}
          />
        ) : uiSchema["ui:widgetType"] === "positiveNumber" ? (
          <input
            type={uiSchema["ui:inputfildtype"]}
            placeholder="Enter data"
            className="backdrop:before:w-[48rem] py-4 border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
            value={value}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
        ) : uiSchema["ui:widgetType"] === "radio" &&
          options &&
          options.enumOptions ? (
          <div className="flex gap-2">
            {options.enumOptions.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 text-sm mb-2"
              >
                <input
                  type="radio"
                  name={props.id}
                  value={option.value}
                  checked={value === option.value}
                  autoFocus={autofocus && index === 0}
                  onChange={handleChange}
                  className="form-radio h-3 w-3"
                />
                {option.label}
              </label>
            ))}
          </div>
        ) : (
          <input
            type={uiSchema["ui:inputfildtype"]}
            placeholder="Enter data"
            className="backdrop:before:w-[48rem] py-4 border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
            value={value}
            onChange={handleChange}
          />
        )}
      </div>
    </>
  );
};

export default CommoninputWidget;
