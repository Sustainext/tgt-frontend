import React, { useState, useEffect } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const CheckboxWidget2 = ({
  options,
  value = [], // Default value should be an empty array if not provided
  autofocus,
  onChange,
  uiSchema,
}) => {
  const [selectedValues, setSelectedValues] = useState(value); // Initialize state with the provided array
  

  // useEffect to monitor changes in value and set textbox visibility
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(selectedValues)) {
      setSelectedValues(value);
    }
    
    if (value.includes('13')) {  // Adjust this condition based on your specific "Others please specify" value
      options.setShowTextbox(true);
    } else {
      options.setShowTextbox(false);
      options.setTextboxValue(''); // Clear the textbox value when not needed
    }
  }, [value, options]); // Remove

  const handleChange = (event) => {
    const newValue = event.target.value;
    let updatedValues;

    if (event.target.checked) {
      // Add the new value to the array
      updatedValues = [...selectedValues, newValue];
    } else {
      // Remove the value from the array
      updatedValues = selectedValues.filter((val) => val !== newValue);
    }

    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  const handleTextboxChange = (event) => {
    const value = event.target.value;
    options.setTextboxValue(value);
    if(value){
      options.setCheckedOthers(false)
    }
  };

  return (
    <div className="mb-1">
      <div className="flex mb-2">
      <div className="relative w-[55%] flex">
  <p className="text-[15px] text-gray-700 w-auto">
    {uiSchema["ui:title"]}
  </p>
  <MdInfoOutline
    data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
    data-tooltip-html={`${uiSchema["ui:tooltip"]}`}
    className="ml-2 flex-shrink-0 mt-1"
    style={{
      width: '14px',
      // height: '30px',  // Ensure the icon always stays at 30x30
      display: uiSchema["ui:tooltipdisplay"],
    }}
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
  />
</div>

        {uiSchema['ui:tag'] && (
          <button className="text-[#007EEF] bg-slate-200 rounded-md text-[11px] w-[72px] h-[22px] ml-6 text-center mt-1">
            {uiSchema['ui:tag']}
          </button>
        )}
      </div>
      <div className={`p-2 mx-1 mt-2 green-checkbox ${uiSchema['ui:section']}`}>
        {options.enumOptions.map((option, index) => (
          <label key={index} className="flex items-center gap-2 text-sm mb-4 cursor-pointer">
            <input
              type="checkbox"
              name={options.name}
              value={option.value.label}
              checked={selectedValues.includes(option.value.label)} // Check if the value is in the array
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className="form-checkbox h-3 w-3"
            />
            {option.value.value}
          </label>
        ))}
      </div>
      {options && options.showTextbox && (
        <div>
        <textarea
          placeholder="Enter a description..."
          className={`border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer mx-3 mt-2 sm:w-[60%] md:w-[60%] lg:w-[63%] xl:w-[62%] 2xl:w-[60%] `}
          id="details"
          rows={7}
          value={options.textboxValue}
          onChange={handleTextboxChange} // Update the state when the textarea changes
        />
        {options&&options.checkedOthers?(
          <div className="text-red-600 text-xs mt-1 pl-3">
          This field is required
        </div>
        ):(
          <div></div>
        )}
        </div>
      )}
      
    </div>
  );
};

export default CheckboxWidget2;
