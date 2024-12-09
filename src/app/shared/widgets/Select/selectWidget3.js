
import React from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";
const selectWidget3 =  ({onChange, value = "", placeholder, label, title, uiSchema = {}, schema = {}, id,options,formContext,
  props,
  name,}) => {
    const { validationErrors } = formContext || {};
    const rowIndex = parseInt(id.split('_')[1], 10);
    const rowErrors = validationErrors && validationErrors[rowIndex] || {};
    const hasError = !value && rowErrors && rowErrors[name];
    console.log(id, "test"); // Log id for debugging
    const handleChange = (e) => {
      // Call props.onChange to ensure RJSF handles the state update
      onChange(e.target.value);
    };
    const randomId = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const tooltipId = schema.title
      ? `tooltip-${schema.title.replace(/\s+/g, "-")}-${randomId}`
      : `tooltip-${id}-${randomId}`;
    return (
      <div className="mb-3 px-1">
       {id.startsWith("root_0") && ( 
         <div className={`relative flex ${label!== "Metric Unit" ? 'justify-center' : 'pl-2'}`}>
          <p className={`flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1 ${label !== "Metric Unit" && schema.display !== "none" ? 'pl-5' : ''}`}>
            {label}
            <MdInfoOutline
              data-tooltip-id={tooltipId}
              data-tooltip-content={schema.tooltiptext}
              className={`mt-0.5   text-[14px] ${label!== "Metric Unit" ? 'ml-5 w-[30px]' : 'w-[20px] ml-1'}`}
              style={{display:schema.display}}
            />
            <ReactTooltip
              id={tooltipId}
              place="top"
              effect="solid"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                zIndex: "1000",
              }}
            />
          </p>
        </div>
      )}
       <div className="flex justify-center items-center mt-2">
        <select
          className={`text-center py-1 text-[12px] w-[100px] rounded-md ${
            value ? 'bg-white text-blue-500 shadow' : 'bg-blue-500 text-white'
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
      {hasError && (
        <div className="text-red-500 text-[12px] mt-2 text-center">
          {hasError}
        </div>
      )}
      </div>
    );
  };

  export default selectWidget3;
