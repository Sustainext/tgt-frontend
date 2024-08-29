import React, { useState, useEffect } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const CheckboxWidget2 = ({
  options,
  value = [], // Default value should be an empty array if not provided
  autofocus,
  onChange,
  uiSchema
}) => {
  const [selectedValues, setSelectedValues] = useState(value); // Initialize state with the provided array
  const [showTextbox,setShowTextbox]=useState(false)

  useEffect(() => {
    if(selectedValues.includes('Others please specify')){
      setShowTextbox(true)
    }
    else{
      setShowTextbox(false)
    }     
    
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    let updatedValues;

    if (event.target.checked) {
      // Add the new value to the array
      updatedValues = [...selectedValues, newValue];
    } else {
      // Remove the value from the array
      updatedValues = selectedValues.filter(val => val !== newValue);
    }

    setSelectedValues(updatedValues);  // Update the state with the new array of values
    onChange(updatedValues);
        
  };

  return (
    <div className='mb-1'>
       <div className='flex mb-2'>
        <div className='relative w-[55%]'>
        <p className="text-[15px] text-gray-700 flex">
              {uiSchema["ui:title"]}
              {uiSchema["ui:title"]?(
                    <div>
                      <MdInfoOutline
                    data-tooltip-id={uiSchema["ui:title"]?`tooltip-${uiSchema["ui:title"].replace(
                      /\s+/g,
                      "-"
                    )}`:""}
                    data-tooltip-html={`${uiSchema["ui:tooltip"]}`}
                    className="mt-1 ml-2 w-[30px] text-[14px]"
                    style={{ display: uiSchema["ui:tooltipdisplay"] }}
                  />
                  {/* Tooltip */}
                  <ReactTooltip
                    id={uiSchema["ui:title"]?`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`:""}
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
                    </div>
              ):(
                  <div>

                  </div>
              )}
              
            </p>
        </div>
        
        {uiSchema['ui:tag']?(
            <button className="text-[#007EEF] bg-slate-200 rounded-md text-[11px] w-[72px] h-[22px] ml-6 text-center mt-1">
            {uiSchema['ui:tag']}
          </button>
        ):(
          <div></div>
        )}
        
      </div>
      <div className={`p-2 mx-1 mt-2  ${uiSchema['ui:section']}`}>
        {options.enumOptions.map((option, index) => (
          <label key={index} className='flex items-center gap-2 text-sm mb-4 cursor-pointer'>
            <input
              type='checkbox'
              name={options.name}
              value={option.value}
              checked={selectedValues.includes(option.value)} // Check if the value is in the array
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className="form-checkbox green-checkbox h-3 w-3 appearance-none checked:bg-green-500 checked:border-green-500 border border-gray-500 rounded-sm relative"
 // Changed from 'form-radio' to 'form-checkbox'
            />
           
            {option.label}
          </label>
        ))}
      </div>
      {showTextbox?(
         <textarea
         placeholder="Enter a description..."
         className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer mx-3 mt-2 sm:w-[48rem] md:w-[60%] lg:w-[63%] xl:w-[67%] 2xl:w-[67%] `}
         id="details"
         // value={formData[0].details}
         // onChange={e => setFormData([{...formData[0], details: e.target.value }])}
         rows={7}
       />
      ):(
        <div></div>
      )}
    </div>
  );
};

export default CheckboxWidget2;
