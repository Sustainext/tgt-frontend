'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const CustomTableWidget13 = ({ id, options, value, required, onChange }) => {
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
            <table id={id} className="rounded-md border border-gray-300 w-full">
                <thead className="gradient-background">
                    <tr>
                        <th className="text-[12px] border border-gray-300 px-2 py-2 w-auto text-left"> </th>
                        {options.titles.map((item, idx) => (
                            <th key={idx} className="text-[12px] border border-gray-300 px-2 py-2 w-auto text-center">
                                {item.title}
                            </th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {options.rowLabels.map((rowLabel, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border-t flex border-gray-300 py-2 px-2 text-[13px]">
                                <p className='w-[80%]'>
                                    {rowLabel.title}
                                </p>
                                <MdInfoOutline
                                    data-tooltip-id={`tooltip-${rowLabel.title.replace(/\s+/g, '-')}`}
                                    data-tooltip-content={rowLabel.tooltip}
                                    className="ml-2 cursor-pointer w-[20%]"
                                />
                                <ReactTooltip
                                    id={`tooltip-${rowLabel.title.replace(/\s+/g, '-')}`}
                                    place="top"
                                    effect="solid"
                                    className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                                />
                            </td>
                            {options.titles.map((column, columnIndex) => (
                                <td key={columnIndex} className="border border-gray-300">
                                    <input
                                        type={column.type}
                                        required={required}
                                        value={localValue[rowIndex] && localValue[rowIndex][column.key] || ""}
                                        onChange={(e) => handleFieldChange(rowIndex, column.key, e.target.value)}
                                        className="text-sm pl-2 py-2 w-full text-center"
                                        placeholder="Enter"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTableWidget13;
