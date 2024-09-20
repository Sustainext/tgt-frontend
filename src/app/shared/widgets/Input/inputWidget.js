import React from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const inputWidget = ({onChange, value = "", placeholder, label, title, uiSchema = {}, schema = {}, id}) => {

  console.log(id, "test"); // Log id for debugging
  const inputType = uiSchema['ui:inputtype'] || "text";

  // Handle input restrictions
  const restrictedKeysNumber = ["e", "E", "+", "-"];
  const restrictedKeysText = uiSchema.restrictedKeysText || [];

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (inputType === "number" && restrictedKeysNumber.includes(event.key)) {
      event.preventDefault();
    } else if (inputType === "text" && restrictedKeysText.includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className="mb-3">
      {/* Conditionally show label and tooltip based on the id */}
      {id.startsWith("root_0") && ( 
        <div className="relative mx-2">
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
        className="block w-[20vw] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
        placeholder={placeholder || `Enter ${label || title}`}
        type={inputType}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default inputWidget;
