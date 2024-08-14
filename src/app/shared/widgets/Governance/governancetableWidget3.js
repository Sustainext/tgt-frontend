import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const GovernancetableWidget3 = ({ id, options, value, required, onChange, schema, formContext }) => {
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
        <div style={{ maxHeight: "400px" }} className="mb-2">
            <table id={id} className="rounded-md border border-gray-300 w-full">
                <thead className="gradient-background">
                    <tr>
                    {options.titles.map((item, idx) => (
                            <th
                                key={idx}
                                style={{ minWidth: "120px", textAlign: "left" }}
                                className="text-[12px] border border-gray-300 px-2 py-2"
                            >
                                <div className="flex items-center">
                                    <p>{item.title}</p>
                                    <p>
                                        <MdInfoOutline
                                            data-tooltip-id={`tooltip-${item.title.replace(
                                                /\s+/g,
                                                "-"
                                            )}`}
                                            data-tooltip-content={item.tooltip}
                                            style={{ display: `${item.display}` }}
                                            className="ml-2 cursor-pointer"
                                        />
                                        <ReactTooltip
                                            id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                                            place="top"
                                            effect="solid"
                                            className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                                        />
                                    </p>
                                </div>
                            </th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {localValue.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-300">
                            {Object.keys(schema.items.properties).map((key, cellIndex) => {
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
                                                disabled={key === 'Specifylevel' && localValue[rowIndex]['Seniorlevel'] !== 'Yes'}
                                            />
                                        )}
                                    </td>
                                );
                            })}
                            <td className="border border-gray-300 p-3">
                                <button onClick={() => formContext.onRemove(rowIndex)}>
                                    <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GovernancetableWidget3;
