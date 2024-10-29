import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const InputWidget2 = ({ onChange, value = "", uiSchema = {} }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const inputType = uiSchema["ui:options"]?.inputType || 'text'; // Default to text if not specified

  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className="relative">
            <p className="text-[14px] text-gray-700 flex">
              {uiSchema["ui:title"]}
              {uiSchema["ui:tooltip"] && (
                <>
                  <MdInfoOutline
                    data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                    data-tooltip-html={uiSchema["ui:tooltip"]}
                    className="mt-1 ml-2 w-[30px] text-[14px]"
                    style={{ display: uiSchema["ui:tooltipdisplay"] || "block" }}
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
                  />
                </>
              )}
            </p>
          </div>
        </div>
        {inputType === 'text' ? (
          <textarea
            placeholder="Enter data"
            className="border appearance-none text-[12px] py-4 border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
            value={value}
            onChange={handleChange}
            rows={4}
          />
        ) : (
          <input
            type={inputType}
            placeholder="Enter data"
            className="border appearance-none text-[12px] py-4 border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
            value={value}
            onChange={handleChange}
          />
        )}
      </div>
    </>
  );
};

export default InputWidget2;
