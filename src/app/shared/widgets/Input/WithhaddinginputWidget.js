import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const WithhaddinginputWidget = (props) => {
  const { onChange, value = "", uiSchema = {} } = props;
  const handleInputChange = (e) => {
    const val = e.target.value;
    const validValue = val.match(/^\d*\.?\d{0,2}$/) ? val : value;
    onChange(validValue);
  };
  const handleKeyDown = (e) => {
    // Prevent 'e', '+', '-', and '.' from being entered
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className=" relative">
            <h2 className="mb-2 text-[15px] text-gray-500 font-semibold flex">
              {uiSchema["ui:hading"]}

            <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:hading"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:hadingtooltip"]}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:hadingtooltipdisplay"] }}
              />
              {/* Tooltip */}
              <ReactTooltip
                id={`tooltip-${uiSchema["ui:hading"].replace(/\s+/g, "-")}`}
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
            </h2>
            <p className="text-[12px] text-gray-700 flex">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltip"]}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
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
        <input
            type={uiSchema["ui:inputfildtype"]}
            placeholder="Enter data"
            className="backdrop:before:w-[48rem] py-4 border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            min="0"
            step="0.01"
          />
      </div>
    </>
  );
};

export default WithhaddinginputWidget;
