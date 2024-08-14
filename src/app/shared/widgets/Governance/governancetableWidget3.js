import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const GovernancetableWidget3 = ({ id, options, value, onChange, schema }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleFieldChange = (index, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[index]) {
      updatedValues[index] = {};
    }
    updatedValues[index].How = newValue;

    setLocalValue(updatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  return (
    <div style={{ maxHeight: "400px" }} className='mb-2'>
      <table id={id} className="rounded-md border border-gray-300 w-full">
        <tbody>
          {options.rowLabels.map((label, rowIndex) => (
            <tr key={rowIndex} className='border border-gray-300'>
              <td className="p-3 text-left w-2/5">
                <span>{label.title}</span>
                <MdInfoOutline
                  data-tooltip-id={`tooltip-${label.title.replace(/\s+/g, '-')}`}
                  data-tooltip-content={label.tooltip}
                  className="ml-2 cursor-pointer"
                  style={{ display: label.display }}
                />
                <ReactTooltip
                  id={`tooltip-${label.title.replace(/\s+/g, '-')}`}
                  place="top"
                  effect="solid"
                  className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                />
              </td>
              <td className="border border-gray-300 p-3 text-center">
                <input
                  type="text"
                  value={localValue[rowIndex]?.How || ""}
                  onChange={(e) => handleFieldChange(rowIndex, e.target.value)}
                  className="text-sm pl-2 py-2 w-full"
                  placeholder="Enter data"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GovernancetableWidget3;