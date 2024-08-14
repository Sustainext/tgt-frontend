import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const GovernancetableWidget2 = ({ id, options, value, required, onChange, schema }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleFieldChange = (index, key, newValue) => {
        const updatedValues = [...localValue];
        if (!updatedValues[index]) {
            updatedValues[index] = {};
        }
        updatedValues[index][key] = newValue;

        setLocalValue(updatedValues);
    };

    const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

    useEffect(() => {
        debouncedUpdate(localValue);
    }, [localValue, debouncedUpdate]);

    return (
        <div style={{ maxHeight: "400px" }} className='mb-2'>
            <table id={id} className="border border-gray-300 rounded-lg w-full">
                <tbody>
                    {options.rowLabels.map((label, rowIndex) => (
                        <tr key={rowIndex} className='border border-gray-300'>
                            <td className=" p-3 text-left w-2/5">
                                <span>{label.title}</span>
                                <MdInfoOutline
                                    data-tooltip-id={`tooltip-${label.title?.replace(/\s+/g, '-')}`}
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
                            {Object.keys(localValue[rowIndex] || {}).map((key, cellIndex) => {
                                const propertySchema = schema.items.properties[key];
                                const isEnum = propertySchema && propertySchema.hasOwnProperty('enum');

                                return (
                                    <td key={cellIndex} className="border border-gray-300 p-3 text-center">
                                        {isEnum ? (
                                            <select
                                                value={localValue[rowIndex][key]}
                                                onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
                                                className="text-sm pl-2 py-2 w-full border-b"
                                                required={required}
                                            >
                                                <option value="">Select</option>
                                                {propertySchema.enum.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={propertySchema.type}
                                                required={required}
                                                value={localValue[rowIndex][key] || ""}
                                                onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
                                                className="text-sm pl-2 py-2 w-full"
                                                placeholder="Enter"
                                            />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GovernancetableWidget2;
