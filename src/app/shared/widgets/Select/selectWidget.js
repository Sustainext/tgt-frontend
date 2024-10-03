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

  const randomId = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const tooltipId = schema.title
    ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
    : `tooltip-${id}-${randomId}`;

 // Default width if no tooltip text
  return (
    <div className="mb-3 px-1">
      
        <div className="relative w-[68%] ">
       
          {id.startsWith("root_0") && (
            <>
               <p className="flex text-[13px]  h-[35px] text-neutral-950 font-[400] mb-1 leading-[15px] ml-1">
            {label}
            <MdInfoOutline
              data-tooltip-id={tooltipId}
              data-tooltip-content={schema.tooltiptext}
              className="mt-1 ml-2 w-[30px] text-[14px]"
            />
            <ReactTooltip
              id={tooltipId}
              place="top"
              effect="solid"
              style={{
                width:"400px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                padding: "10px",
                zIndex:"1000",
              }}
            />
                </p>
            </>

          )}
      
        </div>
  
      <div className='relative'>
      <select
        className={`block w-[20vw] py-2 text-[12px] p-0 custom-select focus:outline-none  focus:border-blue-300  border-b-2 border-gray-300 capitalize `}
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
    </div>
  );
};

export default SelectWidget;
