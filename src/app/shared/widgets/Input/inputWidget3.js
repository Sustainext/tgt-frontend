import React from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {MdInfoOutline } from "react-icons/md";
const inputWidget3 = (props) => {
  const { onChange, value = "",  label, uiSchema = {} } = props;
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className="mb-3">
         <p className="text-sm text-gray-700 flex mb-2">{label}
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
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                }}
              ></ReactTooltip>

         </p>
      <input
        className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full`}
        placeholder={`Enter number`}
        type="number"
        value={value}
        onChange={handleChange}

      />
    </div>
  );
};

export default inputWidget3;
