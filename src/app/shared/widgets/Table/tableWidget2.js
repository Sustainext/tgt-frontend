
'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const CustomTableWidget2 = ({ id, options, value, required, onChange }) => {
    const [localValue, setLocalValue] = useState(value);

    // Update local state immediately on user input
    const handleFieldChange = (index, key, newValue) => {
        const updatedValues = [...localValue];
        if (!updatedValues[index]) {
            updatedValues[index] = {};
        }
        updatedValues[index][key] = newValue;
        setLocalValue(updatedValues);
    };

    // Debounce external state updates
    const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

    // Use effect to update external state when local state changes
    useEffect(() => {
        debouncedUpdate(localValue);
    }, [localValue, debouncedUpdate]);

    useEffect(() => {
        setLocalValue(value);
      }, [value]);
    return (
        <div style={{ overflowX: "auto", maxHeight: "400px" }} className='mb-2'>
            <table id={id} className="rounded-md border border-gray-300 w-full">
                <thead className="gradient-background">
                    <tr>
                        <th className="border border-gray-300" style={{ textAlign: "left" }}> </th>
                        {options.titles.map((item, idx) => (
                            <th key={idx} className="text-[12px] border border-gray-300 px-2 ">
                                <div className="flex items-center w-[187px] xl:w-[330px] lg:w-[330px] md:w-[330px] 2xl:w-[330px] 4k:w-[330px] 2k:w-[330px]">
                                    <p>{item.title}</p>
                                    <MdInfoOutline
                                        data-tooltip-id={`tooltip-${item.title.replace(/\s+/g, '-')}`}
                                        data-tooltip-content={item.tooltip}
                                        className="ml-2 cursor-pointer w-[20%]"
                                    />
                                    <ReactTooltip
                                        id={`tooltip-${item.title.replace(/\s+/g, '-')}`}
                                        place="top"
                                        effect="solid"
                                        className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                                    />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {options.rowLabels.map((rowLabel, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-gray-300 p-3 text-[13px]">{rowLabel}</td>
                            {options.titles.map((column, columnIndex) => (
                                <td key={columnIndex} className="border border-gray-300 p-3">
                                    <input
                                        type="text"
                                        required={required}
                                        value={localValue[rowIndex] && localValue[rowIndex][column.key] || ""}
                                        onChange={(e) => handleFieldChange(rowIndex, column.key, e.target.value)}
                                        className="text-sm pl-2 py-2 w-full"
                                        placeholder="Enter data"
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

export default CustomTableWidget2;
