
import React from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const SelectdisableWidget = ({
  onChange,
  value = "",
  placeholder,
  label,
  title,
  uiSchema = {},
  schema = {},
  id,

  isEnabled = false, // Add isEnabled prop with default value
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };





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
      <select
            className={`block w-[20vw] py-2 text-[12px] p-0 custom-select focus:outline-none focus:border-blue-300 border-b-2 border-gray-300 capitalize`}
            value={value}
            onChange={handleChange}
            disabled={!isEnabled}
          >
            <option value="" disabled={!value} className="text-gray-500">
              {`Select ${label}` || "Select..."}
            </option>
            {(options?.enumOptions || []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
    
      </div>
    </div>
  );
};

export default SelectdisableWidget;
