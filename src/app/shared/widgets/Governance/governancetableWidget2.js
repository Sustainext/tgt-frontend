import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
        <div style={{ maxHeight: "400px" }} className='mb-2  overflow-auto custom-scrollbar'>
            <table id={id} className="border border-gray-300 rounded-lg w-full">
                <tbody>
                    {options.rowLabels.map((label, rowIndex) => (
                        <tr key={rowIndex} className='border border-gray-300'>
                            <td className=" p-3 text-left w-[450px] xl:w-2/5  lg:w-2/5  md:w-2/5 4k:w-2/5  2k:w-2/5 2xl:w-2/5 ">
                                <p className='text-[12px] w-[450px] xl:w-auto  lg:w-auto   md:w-auto  4k:w-auto   2k:w-auto 2xl:w-auto '>{label.title}</p>
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
                                    style={{
                                        width:"400px",
                                        backgroundColor: "#000",
                                        color: "white",
                                        fontSize: "12px",
                                        boxShadow: 3,
                                        borderRadius: "8px",
                                        zIndex:"1000",
                                      }}
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
                                                className="text-[12px] pl-2 py-2 w-[150px] xl:w-full lg:w-full md:w-full 4k:w-full 2k:w-full 2xl:w-full   border-b"
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
                                                className="text-[12px] pl-2 py-2 w-[150px] xl:w-full lg:w-full md:w-full 4k:w-full 2k:w-full 2xl:w-full"
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
