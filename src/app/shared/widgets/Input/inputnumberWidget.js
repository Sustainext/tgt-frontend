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
  const randomId = Math.floor(Math.random() * 10000);
  const tooltipId = schema.title
  ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
  : `tooltip-${id}-${randomId}`;
  return (
    <div className="mb-3 px-1">
      {id.startsWith("root_0") && (
        <div className="relative flex justify-end">
          <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1 leading-[15px] ml-1">
            {label}
            <MdInfoOutline
              data-tooltip-id={tooltipId}
              data-tooltip-content={schema.tooltiptext}
              className="mt-0.5 ml-2 w-[30px] text-[14px]"
            />
            <ReactTooltip
              id={tooltipId}
              place="top"
              effect="solid"
              style={{
                backgroundColor: "#000",
                minWidth: "300px", // Minimum width
                maxWidth: "500px", // Maximum width
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
        className="block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300  sm:leading-5 border-b-2 border-gray-300 mb-3 text-right placeholders pr-2 "
        placeholder={placeholder || `Enter ${label}`}
        type="number"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      </div>
  
    </div>
  );
};

export default inputnumberWidget;
