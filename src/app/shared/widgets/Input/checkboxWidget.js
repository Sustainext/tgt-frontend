import React, { useState, useEffect } from 'react';

const CheckboxWidget = ({
  options,
  value = [], // Default value should be an empty array if not provided
  autofocus,
  onChange,
  uiSchema
}) => {
  const [selectedValues, setSelectedValues] = useState(value); 

  
  useEffect(() => {
    // Only update if the value has actually changed to prevent unnecessary updates
    if (JSON.stringify(selectedValues) !== JSON.stringify(value)) {
      setSelectedValues(value);
    }
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    let updatedValues;

    if (event.target.checked) {
      updatedValues = [...selectedValues, newValue];
    } else {
      updatedValues = selectedValues.filter(val => val !== newValue);
    }

    setSelectedValues(updatedValues);  
    onChange(updatedValues);          
  };

  
  useEffect(() => {
    if (!options.envChecked && !options.socChecked && !options.govChecked) {
      // Only update if the selectedValues are not already empty
      if (selectedValues.length > 0) {
        setSelectedValues([]); // Uncheck all checkboxes
      }
    }
  }, [options.envChecked, options.socChecked, options.govChecked]);


 

  return (
    <div className='mb-1'>
      <div className={`p-2 mx-1 mt-2 green-checkbox ${options.envChecked || options.socChecked || options.govChecked ? "" : "opacity-25"}`}>
        {options.enumOptions.map((option, index) => (
          <label key={index} className='flex items-center gap-2 text-sm mb-4 cursor-pointer'>
            <input
              type='checkbox'
              name={options.name}
              value={option.value.label}
              checked={selectedValues.includes(option.value.label)} // Check if the value is in the array
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className='form-checkbox h-3 w-3' // Changed from 'form-radio' to 'form-checkbox'
              disabled={!(options.envChecked || options.socChecked || options.govChecked)}
            />
            {option.value.value}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxWidget;
