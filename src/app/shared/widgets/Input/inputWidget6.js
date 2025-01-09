import React, { useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdInfoOutline } from "react-icons/md";
const inputWidget6 = (props) => {
  const { onChange, value = "", label, formContext, id, name, uiSchema = {} } = props;

  const { validationErrors } = formContext || {};
  const rowErrors = validationErrors || {};
  const hasError = !value && rowErrors && rowErrors[name]

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-3 relative">
      <p className="flex text-[14px] text-gray-700 font-[500] mb-3">
        {label}
        <MdInfoOutline
          data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
            /\s+/g,
            "-"
          )}`}
          data-tooltip-content={uiSchema["ui:tooltip"]}
          className="mt-1 ml-2 w-[30px] text-[14px]"
          style={{ display: uiSchema["ui:tooltipdisplay"] }}
        />
        {/* Tooltip */}
        <ReactTooltip
          id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
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
          }}
        ></ReactTooltip>
      </p>
      <input
        className={`backdrop:before:w-[48rem] ${
            hasError
              ? "border-red-500"
              : "border-gray-400"
          }  border appearance-none text-[12px] border-gray-400 text-neutral-900 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full`}
        placeholder={`Enter Value`}
        type="text"
        value={value}
        onChange={handleChange}
    

      />
      {hasError && (
          <div className="text-red-500 text-[12px] mt-1">
           {hasError}
          </div>
        )}
    </div>
  );
};

export default inputWidget6;
