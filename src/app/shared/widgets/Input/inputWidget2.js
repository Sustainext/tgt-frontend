import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const inputWidget2 = (props) => {
  const { onChange, value = "", uiSchema = {},formContext,name } = props;

  const { validationErrors } = formContext || {};
  const rowErrors = validationErrors || {};
  const hasError = !value && rowErrors && rowErrors[name]

  const handleChange = (event) => {
    onChange(event.target.value);
  };
  
  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2 w-full">
          <div className=" relative w-full">
            <p className="flex text-[14px] text-gray-700 font-[500]">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltip"]}
                className="mt-1 ml-1 text-[13px] w-[20%] xl:w-[23px] lg:w-[23px] md:w-[23px] 2xl:w-[23px] 4k:w-[23px] 2k:w-[23px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />
              {/* Tooltip */}
              <ReactTooltip
                id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                style={{
                  minWidth: "200px", // Minimum width
                  maxWidth: "300px", // Maximum width
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
          placeholder="Enter data"
          className={`backdrop:before:w-[48rem] ${
            hasError
              ? "border-red-500"
              : "border-gray-400"
          } border appearance-none text-[12px] border-gray-400 text-gray-700 font-[500] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full`}
          value={value}
          onChange={handleChange}
          rows={4}
        />
         {hasError && (
          <div className="text-red-500 text-[12px] mt-1">
           {hasError}
          </div>
        )}
      </div>
    </>
  );
};

export default inputWidget2;
