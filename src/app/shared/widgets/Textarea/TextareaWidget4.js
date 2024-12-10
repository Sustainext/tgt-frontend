import React from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TextareaWidget4 = (props) => {
  const { onChange, value = "", uiSchema = {}, formContext, id, name } = props;
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split("_")[1], 10);
  const rowErrors = (validationErrors && validationErrors[rowIndex]) || {};
  const hasError = !value || value.trim() === "";
  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className=" relative">
            <p className="text-[14px] text-gray-700 font-[500] flex">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltipstitle"]}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:titletooltipdisplay"] }}
              />
              {/* Tooltip */}
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
            </p>
          </div>
        </div>
        <textarea
          placeholder="Enter a description..."
          className={`w-full border appearance-none text-[12px] 
          ${hasError ? "border-red-500" : "border-gray-400"} 
          text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none 
          focus:bg-white focus:border-gray-400 cursor-pointer`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
        />
        {hasError && (
          <div className="text-red-500 text-[12px] mt-1">
            {rowErrors[name] || "This field is required"}
          </div>
        )}
      </div>
    </>
  );
};

export default TextareaWidget4;
