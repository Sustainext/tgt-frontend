import React, { useState, useEffect } from 'react';

const CheckboxWidget = ({
  options,
  value = [], // Default value should be an empty array if not provided
  autofocus,
  onChange,
  uiSchema
}) => {
  const [selectedValues, setSelectedValues] = useState(value); // Initialize state with the provided array

  // useEffect(() => {
  //   setSelectedValues(value);
  // }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    let updatedValues;

    if (event.target.checked) {
      updatedValues = [...selectedValues, newValue];
    } else {
      updatedValues = selectedValues.filter(val => val !== newValue);
    }

    setSelectedValues(updatedValues);  // Update the state with the new array of values
    onChange(updatedValues);           // Call onChange prop with the new array of values
  };

  useEffect(() => {
    if (!options.envChecked && !options.socChecked && !options.govChecked) {
      setSelectedValues([]); // Uncheck all checkboxes
    }
  }, [options.envChecked, options.socChecked, options.govChecked, setSelectedValues]);
  
  return (
    <div className='mb-1'>
      <div className={`p-2 mx-1 mt-2 green-checkbox ${options.envChecked || options.socChecked || options.govChecked ? "" : "opacity-25"}`}>
        {options.enumOptions.map((option, index) => (
          <label key={index} className='flex items-center gap-2 text-sm mb-4 cursor-pointer'>
            <input
              type='checkbox'
              name={options.name}
              value={option.value}
              checked={selectedValues.includes(option.value)} // Check if the value is in the array
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className='form-checkbox h-3 w-3' // Changed from 'form-radio' to 'form-checkbox' green-checkbox appearance-none checked:bg-[#42cc71] checked:border-[#42cc71] border border-gray-500 rounded-sm relative
              disabled={!(options.envChecked || options.socChecked || options.govChecked)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxWidget;
