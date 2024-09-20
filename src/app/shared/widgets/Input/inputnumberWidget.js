import React from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";
const inputnumberWidget = ({
  onChange,
  value = "",
  placeholder,
  label,
  title,
  uiSchema = {},
  schema = {},
  id,
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  const handleKeyDown = (event) => {
    // Prevent 'e', '+', '-', and '.' from being entered
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <div className="mb-3">
      {id.startsWith("root_0") && (
        <div className="relative mx-2 flex justify-end">
          <p className="flex text-[14px] text-neutral-950 font-[400] mb-1">
            {label}
            <MdInfoOutline
              data-tooltip-id={`tooltip-${schema.title?.replace(/\s+/g, "-")}`}
              data-tooltip-content={schema.tooltiptext}
              className="mt-1 ml-2 w-[30px] text-[14px]"
            />
            <ReactTooltip
              id={`tooltip-${schema.title?.replace(/\s+/g, "-")}`}
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
          </p>
        </div>
      )}
      <input
        className="block w-[20vw] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 mb-3 text-right placeholders pr-2 "
        placeholder={placeholder || `Enter ${label}`}
        type="number"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default inputnumberWidget;
