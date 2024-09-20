
import React from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";
const selectWidget3 =  ({onChange, value = "", placeholder, label, title, uiSchema = {}, schema = {}, id,options}) => {

    const handleChange = (e) => {
      // Call props.onChange to ensure RJSF handles the state update
      onChange(e.target.value);
    };

    return (
     <div>
       {id.startsWith("root_0") && ( 
        <div className="relative  flex justify-center">
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
       <div className="flex justify-center items-center mt-2 mx-2">
        <select
          className={`text-center py-1 text-sm w-[100px] rounded focus:outline-none focus:shadow-outline  ${
            value ? 'bg-white text-blue-500 shadow-md' : 'bg-blue-500 text-white'
          }`}
          value={value || ''}
          onChange={handleChange}
        >
          <option value="" disabled={!!value}>{`Unit` || "Select..."}</option>
          {options.enumOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      </div>
    );
  };

  export default selectWidget3;
