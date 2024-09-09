import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MaterialityTableWidget = ({ id, options, value, required, onChange, schema, formContext }) => {
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
            <table id={id} className="rounded-md  w-full">
                <thead className="gradient-background">
                    <tr>
                        {options.titles.map((item, idx) => (
                            <th
                                key={idx}
                                style={{ minWidth: "120px", textAlign: "center" }}
                                className="text-[12px] border-r px-4 py-4 rounded-md"
                            >
                                <div className="flex justify-center items-center text-gray-500">
                                    <p className="flex items-center">
                                        {item.title}
                                        <MdInfoOutline
                                            data-tooltip-id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                                            data-tooltip-content={item.tooltip}
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
                        <th className='rounded-md'></th>
                    </tr>
                </thead>
                <tbody>
                    {localValue.map((row, rowIndex) => (
                        <tr key={rowIndex} className="">
                            {Object.keys(schema.items.properties).map((key, cellIndex) => {
                                const propertySchema = schema.items.properties[key];
                                const isEnum = propertySchema && propertySchema.hasOwnProperty('enum');

                                return (
                                    <td key={cellIndex} className="p-3 text-center">
                                        {key === "MaterialTopic" ? (
                                            <select
                                                value={localValue[rowIndex][key]}
                                                onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
                                                className="text-sm pl-2 py-2 w-full border-b"
                                                required={required}
                                                disabled={options.materialTopics.length==0}
                                            >
                                                <option  value="">Select Material Topic</option>
                                                {options.materialTopics.map((topic) => (
                                                    <option key={topic.topic.id} value={topic.topic.id}>
                                                        {topic.topic.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : isEnum ? (
                                            <select
                                                value={localValue[rowIndex][key]}
                                                onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
                                                className="text-sm pl-2 py-2 w-full border-b"
                                                required={required}
                                                disabled={options.materialTopics.length==0}
                                            >
                                                <option value="">Select Impact Type</option>
                                                {propertySchema.enum.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={propertySchema.type}
                                                required={required}
                                                disabled={options.materialTopics.length==0}
                                                value={localValue[rowIndex][key] || ""}
                                                onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
                                                className="text-sm pl-2 py-2 w-full border-b"
                                                placeholder="Enter"
                                            />
                                        )}
                                    </td>
                                );
                            })}
                            <td className=" text-center p-3">
                                <button onClick={() => formContext.onRemove(rowIndex)}>
                                    <MdOutlineDeleteOutline className="text-[23px] text-gray-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialityTableWidget;
