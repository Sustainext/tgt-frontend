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
            <table id={id} className="border border-gray-300 w-full rounded-md" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <thead className="gradient-background h-[54px]">
                    <tr>
                        <th className="text-[12px]  px-2 py-2  text-left w-[35%]"> </th>
                        {options.titles.map((item, idx) => (
                            <th key={idx} className="text-[12px] border-l border-gray-300 px-2 py-2 w-[35%] text-center">
                                {item.title}
                            </th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {options.rowLabels.map((rowLabel, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border-t flex border-gray-300 py-2 px-2 text-[13px]">
                                <p >
                                    {rowLabel.title}
                                </p>
                                <MdInfoOutline
                                    data-tooltip-id={`tooltip-${rowLabel.title.replace(/\s+/g, '-')}`}
                                    data-tooltip-content={rowLabel.tooltip}
                                    className="ml-1 cursor-pointer w-[5%] mt-1"
                                />
                                <ReactTooltip
                                    id={`tooltip-${rowLabel.title.replace(/\s+/g, '-')}`}
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
                            {options.titles.map((column, columnIndex) => (
                                <td key={columnIndex} className="border-t border-l border-gray-300">
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
