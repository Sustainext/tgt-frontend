import React from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";
const SelectWidget =  ({onChange, value = "", placeholder, label, title, uiSchema = {}, schema = {}, id,options}) => {

  const handleChange = (e) => {
    // Call props.onChange to ensure RJSF handles the state update
    onChange(e.target.value);
  };

  // Function to extract the first word from the label


  return (
    <div className="mb-3">
         {id.startsWith("root_0") && ( 
        <div className="relative mx-3">
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
      <select
        className={`block w-[20vw] py-2 mx-2 px-0text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 capitalize `}
        value={value}
        onChange={handleChange}

      >
         <option
          value=""
          disabled={!value}
          className="text-gray-500"  // Add Tailwind CSS class for gray text
        >
          {`Select ${label}` || "Select..."}
        </option>
        {(options?.enumOptions || []).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWidget;
