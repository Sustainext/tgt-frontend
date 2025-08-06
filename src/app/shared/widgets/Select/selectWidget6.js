import React, { useState } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


const SelectWidget6 = ({
  onChange,
  value = "",
  placeholder,
  label,
  title,
  uiSchema = {},
  schema = {},
  id,
  options,
  formContext,
  name,
}) => {
  const { validationErrors } = formContext || {};
  const rowIndex = parseInt(id.split('_')[1], 10);
  const rowErrors = validationErrors && validationErrors[rowIndex] || {};
  const hasError = !value && rowErrors && rowErrors[name];


  const handleChange = (e) => {
    const selectedValue = e.target.value;

  
      onChange(selectedValue); // Set the selected value in the parent state
    
  };





  return (
    <div className="mb-3">
    

      <div className="relative">
        {/* Render select or input based on state */}
       <p className="text-sm text-gray-800 flex mb-2">
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
          <select
            className={`block w-1/2 mb-4 p-2 mt-4 text-[#727272] text-[12px] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize  ${hasError ? 'border-red-500' : 'border-gray-300'}`}
            value={value}
            onChange={handleChange}
          >
            <option value="" disabled={!value} className="text-gray-500">
             Select
            </option>
            {(options?.enumOptions || []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
      
      </div>
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">
          {hasError}
        </div>
      )}
    </div>
  );
};

export default SelectWidget6;



