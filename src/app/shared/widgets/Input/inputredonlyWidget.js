import React, { useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdInfoOutline } from "react-icons/md";
const InputredonlyWidget = (props) => {
  const { onChange, value = "", label, formContext, id, name, uiSchema = {} } = props;


console.log(value,"see")
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
        className={`backdrop:before:w-[48rem]   border appearance-none text-[12px] border-gray-200 text-neutral-900 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200  w-full`}
        placeholder={!value ? 'Auto Calculated' : ''} // Conditionally set placeholder
        type="number"
        value={value || ''}
        readOnly
 

      />
    
    </div>
  );
};

export default InputredonlyWidget;
