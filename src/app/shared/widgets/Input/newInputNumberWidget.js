import React from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";
const NewInputNumberWidget = ({
  onChange,
  value = "",
  placeholder,
  label,
  title,
  uiSchema = {},
  schema = {},
  id,
  formContext,
  props,
  name,
}) => {
  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split('_')[1], 10);
  const rowErrors = validationErrors && validationErrors[rowIndex] || {};
  const hasError = !value && rowErrors && rowErrors[name];

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
        <div className="relative flex">
          <p className="flex text-[13px] 4k:text-[15px] text-neutral-950 font-[400] mb-2 leading-[15px] ml-1">
             {uiSchema["ui:title"]}
            <MdInfoOutline
             data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltipstitle"]}
              className="mt-0.5 ml-2 w-[30px] text-[14px]"
              style={{ display: uiSchema["ui:titletooltipdisplay"] }}
            />
            <ReactTooltip
              id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
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
        className={`block  w-[560px] rounded-md p-2 py-1.5 xl:py-2 md:py-2 lg:py-2 2xl:py-2 4k:py-2 2k:py-2 text-[12px] 4k:text-[14px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300  sm:leading-5 border-2 border-gray-300  pr-2 ${hasError ? 'border-red-500' : 'border-gray-300'} `}
        placeholder={placeholder || `Enter Number`}
        type="number"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      </div>
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">
          {hasError}
        </div>
      )}
    </div>
  );
};

export default NewInputNumberWidget;
