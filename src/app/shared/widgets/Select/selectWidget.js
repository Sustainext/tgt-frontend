import React from 'react';

const SelectWidget = (props) => {
  const handleChange = (e) => {
    // Call props.onChange to ensure RJSF handles the state update
    props.onChange(e.target.value);
  };

  // Function to extract the first word from the label


  return (
    <div className="mb-3">
      <select
        className={`block w-[20vw] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 capitalize ${
          props.error ? 'border-red-500' : '' // Apply border color if there's an error
        }`}
        value={props.value || ''}
        onChange={handleChange}

      >
         <option
          value=""
          disabled={!!props.value}
          className="text-gray-500"  // Add Tailwind CSS class for gray text
        >
          {`Select ${props.label}` || "Select..."}
        </option>
        {(props.options?.enumOptions || []).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWidget;
