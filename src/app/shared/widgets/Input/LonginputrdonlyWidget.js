import React from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const LonginputrdonlyWidget = ({
  onChange,
  value = "",
  placeholder,
  label,
  title,
  uiSchema = {},
  schema = {},
  id,
}) => {
  console.log(id, "test"); // Log id for debugging
  const inputType = uiSchema["ui:inputtype"] || "text";

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
  console.log("schema.display:", schema.display);
  const randomId = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const tooltipId = schema.title
    ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
    : `tooltip-${id}-${randomId}`;
  return (
    <div className="mb-3 px-1">
      {/* Conditionally show label and tooltip based on the id */}

      <div className="relative">
        {id.startsWith("root_0") && (
          <>
            <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1 leading-[15px]">
              {label}
              <MdInfoOutline
                data-tooltip-id={tooltipId}
                data-tooltip-content={schema.tooltiptext}
                className="mt-0.5  w-[30px] text-[14px]"
                style={{ display: schema.display }}
              />
              <ReactTooltip
                id={tooltipId}
                place="top"
                effect="solid"
                style={{
                  minWidth: "200px", // Minimum width
                  maxWidth: "500px", // Maximum width
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  padding: "10px",
                  zIndex: "1000",
                }}
              />
            </p>
          </>
        )}
        <input
          className="block  w-[67vw] xl:w-[25vw] lg:w-[25vw] md:w-[25vw] 2xl:w-[25vw] 4k:w-[10vw] py-2  text-[12px]  leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300"
          placeholder={placeholder || `Enter ${label || title}`}
          type={inputType}
          value={value}
        //   onChange={handleChange}
          onKeyDown={handleKeyDown}
          readonly={true}
        />
      </div>
    </div>
  );
};

export default LonginputrdonlyWidget;
