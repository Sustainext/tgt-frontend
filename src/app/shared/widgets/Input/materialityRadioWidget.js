
import React, { useState,useEffect } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const MaterialityRadioWidget = ({
  options,
  value = '', // Default value should be an empty string if not provided
  autofocus,
  onChange,
  uiSchema = {},
}) => {
  const [inputState, setInputState] = useState(value); // Initialize state with the provided value
  useEffect(() => {
    setInputState(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputState(newValue);  // Update the state to the new value
    onChange(newValue);       // Call onChange prop with the new value
  };

  return (

    <div className='mb-6 pb-4'>
    <div className='flex mb-2'>
        <div className='relative w-[55%]'>
        <p className='text-[15px] text-gray-700 w-full mb-2'>
          {uiSchema['ui:title']}
          <MdInfoOutline
            data-tooltip-id={`tooltip-${uiSchema['ui:title'].replace(/\s+/g, '-')}`}
            data-tooltip-html={`${uiSchema["ui:tooltip"]}`}
            className='ml-2 text-[14px] align-middle'
            style={{ display: uiSchema['ui:tooltip'] ? 'inline' : 'none' }}
          />
          <ReactTooltip
            id={`tooltip-${uiSchema['ui:title'].replace(/\s+/g, '-')}`}
            place='top'
            effect='solid'
            className='!max-w-xs !bg-black !text-white !text-xs !rounded-lg !shadow-md'
          />
        </p>
        </div>
        
        <button className="text-[#007EEF] bg-slate-200 rounded-md text-[11px] w-[72px] h-[22px] ml-6 text-center mt-1">
            {uiSchema['ui:tag']}
          </button>
      </div>
      <div className='flex gap-2 ml-4'>
        {options.enumOptions.map((option, index) => (
          <label key={index} className='flex items-center gap-2 text-sm mb-2'>
            <input
              type='radio'
              name={options.name}
              value={option.value}
              checked={inputState === option.value}
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className='form-radio h-3 w-3'
            />
            {option.label}
          </label>
        ))}
      </div>
</div>

  );
};

export default MaterialityRadioWidget;
