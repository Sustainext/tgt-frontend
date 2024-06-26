import React, { useState, useEffect } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const RadioWidget = ({
  options,
  value = {}, // Default to an empty object
  autofocus,
  onChange,
  uiSchema = {},
}) => {
  const defaultState = {
    selected: '',
    otherValue: ''
  };

  // Initialize state
  const [inputState, setInputState] = useState({
    selected: value.selected || defaultState.selected,
    otherValue: value.otherValue || defaultState.otherValue
  });

  // Update state when value prop changes
  useEffect(() => {
    setInputState({
      selected: value.selected || defaultState.selected,
      otherValue: value.otherValue || defaultState.otherValue
    });
  }, [value]);

  const otherOptionValue = "Other, please specify:";

  const handleChange = (event) => {
    const newValue = event.target.value;
    const updatedState = {
      selected: newValue,
      otherValue: newValue === otherOptionValue ? '' : inputState.otherValue
    };
    setInputState(updatedState);
    onChange(updatedState);
  };

  const handleOtherChange = (event) => {
    const newOtherValue = event.target.value;
    const updatedState = { selected: otherOptionValue, otherValue: newOtherValue };
    setInputState(updatedState);
    onChange(updatedState);
  };

  return (
    <div className='mb-6'>
      <div className='flex mb-2 items-center'>
        <p className='text-[15px] text-gray-700 w-full mb-2'>
          {uiSchema['ui:title']}
          <MdInfoOutline
            data-tooltip-id={`tooltip-${uiSchema['ui:title'].replace(/\s+/g, '-')}`}
            data-tooltip-content={uiSchema['ui:tooltip']}
            className='ml-2 text-base align-middle'
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
      <div className='grid grid-cols-2 gap-2'>
        {options.enumOptions.map((option, index) => (
          <label key={index} className='flex items-center gap-2 text-sm mb-2'>
            <input
              type='radio'
              name={options.name}
              value={option.value}
              checked={inputState.selected === option.value}
              autoFocus={autofocus && index === 0}
              onChange={handleChange}
              className='form-radio h-3 w-3'
            />
            {option.label}
          </label>
        ))}
      </div>
      <label className='flex items-center gap-2 text-[13px] mb-2 mt-2'>
        <input
          type="radio"
          name={options.name}
          value={otherOptionValue}
          checked={inputState.selected === otherOptionValue}
          autoFocus={autofocus && options.enumOptions.length === 0}
          onChange={handleChange}
          className='form-radio h-3 w-3'
        />
        Other, please specify:
      </label>
      {inputState.selected === otherOptionValue && (
        <input
          type='text'
          value={inputState.otherValue}
          autoFocus={autofocus}
          onChange={handleOtherChange}
          className="block p-2 text-gray-500 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize w-full"
          placeholder="Enter data"
        />
      )}
    </div>
  );
};

export default RadioWidget;

