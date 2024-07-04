import React from 'react';

const SelectWidget = (props) => {
  const handleChange = (e) => {
    // Call props.onChange to ensure RJSF handles the state update
    props.onChange(e.target.value);
  };

  return (
    <div className="mb-3">
      <select
        className={`block w-[20vw] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 capitalize ${
          props.error ? 'border-red-500' : '' // Apply border color if there's an error
        }`}
        value={props.value || ''}
        onChange={handleChange}
      >
        <option value="" disabled={!props.value}>{`Select ${props.label || '...'}`}</option>
        {props.options.enumOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.error && (
        <p className="text-red-500 text-sm">{props.error.message}</p>
      )}
    </div>
  );
};

export default SelectWidget;
