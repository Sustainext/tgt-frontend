import React, { useState } from "react";

const selectWidget2 = ({
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
    <div className="mb-3 px-1">
    

      <div className="relative">
        {/* Render select or input based on state */}
      
          <select
            className={`block w-full  p-2 text-[#727272] text-[12px] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize  ${hasError ? 'border-red-500' : 'border-gray-300'}`}
            value={value}
            onChange={handleChange}
          >
            <option value="" disabled={!value} className="text-gray-500">
              {`Select ${label}` || "Select..."}
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

export default selectWidget2;



