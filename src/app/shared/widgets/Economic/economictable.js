import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline, MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Economictable = ({ id, options, value, required, onChange, schema, formContext }) => {
    const [localValue, setLocalValue] = useState(value);
    const [othersInputs, setOthersInputs] = useState([]);

    useEffect(() => {
        const initializeOthersInputs = () => {
            const newOthersInputs = value.map(row => {
                let rowOthers = {};
                Object.keys(row).forEach(key => {
                    if (row[key] === "Others (please specify)" || row[key + "_others"]) {
                        rowOthers[key] = true;
                    }
                });
                return rowOthers;
            });
            setOthersInputs(newOthersInputs);
        };
        setLocalValue(value);
        initializeOthersInputs();
    }, [value]);

    const handleFieldChange = (index, key, newValue) => {
        const updatedValues = [...localValue];
        if (!updatedValues[index]) {
            updatedValues[index] = {};
        }
        updatedValues[index][key] = newValue;

        if (newValue === "Others (please specify)") {
            const updatedOthersInputs = [...othersInputs];
            if (!updatedOthersInputs[index]) {
                updatedOthersInputs[index] = {};
            }
            updatedOthersInputs[index][key] = true;
            setOthersInputs(updatedOthersInputs);
        } else {
            const updatedOthersInputs = [...othersInputs];
            if (updatedOthersInputs[index]) {
                updatedOthersInputs[index][key] = false;
            }
            setOthersInputs(updatedOthersInputs);
        }

        setLocalValue(updatedValues);
    };

    const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

    useEffect(() => {
        debouncedUpdate(localValue);
    }, [localValue, debouncedUpdate]);

    const addRow = () => {
        setLocalValue([...localValue, {}]);
        setOthersInputs([...othersInputs, {}]);
    };

    const removeRow = (index) => {
        if (localValue.length > 1) {
            const updatedValues = [...localValue];
            const updatedOthersInputs = [...othersInputs];
            updatedValues.splice(index, 1);
            updatedOthersInputs.splice(index, 1);
            setLocalValue(updatedValues);
            setOthersInputs(updatedOthersInputs);
        }
    };

    return (
        <>
        <div style={{
            maxHeight: "400px",
            display: "block",
            overflowX: "auto",
            maxWidth: "100%",
            minWidth: "100%",
            width: "80vw"
        }} className="mb-2 pb-2">
            <table id={id} className="table-fixed border-collapse w-full">
                <thead className="gradient-background">
                    <tr className="h-[102px]">
                        {formContext.view === 1 && (
                            <th className="text-[13px] border border-gray-300 px-4 py-3 relative" style={{ width: "17vw" }}>
                                {formContext.colhadding}
                            </th>
                        )}
                        {options.titles.map((item, idx) => (
                            <th
                                key={idx}
                                style={{ width: "17vw", textAlign: "left" }}
                                className="text-[13px] border border-gray-300 px-2 py-3 relative"
                            >
                                <div className={`flex items-center ${item.textdriction === "start" ? "justify-start" : "justify-center"}`}>
                                    <p>{item.title}</p>
                                    {item.tooltipdisplay !== "none" && (
                                        <p>
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
                                    )}
                                </div>
                            </th>
                        ))}
                                                   <th className="text-[12px] border border-gray-300 px-4 py-3 relative" style={{ width: "5vw" }}> </th>
                    </tr>
                </thead>
                <tbody>
                    {localValue.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-300">
                            {formContext.view === 1 && rowIndex === 0 && (
                                <td
                                    rowSpan={localValue.length}
                                    className="border border-gray-300 p-2 text-center text-[15px] text-[#727272] "

                                >
                                      <p> {formContext.colname}</p>
                                </td>
                            )}
                            {Object.keys(schema.items.properties).map((key, cellIndex) => {
                                const propertySchema = schema.items.properties[key];
                                const isEnum = propertySchema && propertySchema.hasOwnProperty('enum');

                                return (
                                    <td key={cellIndex} className="border border-gray-300  text-center" >
                                        {isEnum ? (
                                            <>
                                                <select
                                                    value={localValue[rowIndex][key] || ""}
                                                    onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
                                                    className="text-sm pl-2 py-2 w-full border-b"
                                                    required={required}
                                                >
                                                    <option value="">Select</option>
                                                    {propertySchema.enum.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                {othersInputs[rowIndex] && othersInputs[rowIndex][key] && (
                                                    <input
                                                        type="text"
                                                        required={required}
                                                        value={localValue[rowIndex][`${key}_others`] || ""}
                                                        onChange={(e) => handleFieldChange(rowIndex, `${key}_others`, e.target.value)}
                                                        className="text-sm pl-2 py-2 w-full mt-2"
                                                        placeholder="Please specify"
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <input
                                                type={propertySchema.texttype || "text"}
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
                            <td className="border border-gray-300 p-4 text-center w-[45%]">
                                <button
                                    type="button"
                                    onClick={() => removeRow(rowIndex)}
                                    className="text-red-500"
                                >
                                    <MdOutlineDeleteOutline size={25}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
             <div className="mt-2">
             <button
                 type="button"
                 onClick={addRow}
                 className="text-blue-500 flex items-center"
             >
                 <MdAdd /> Add Row
             </button>
         </div>
         </>
    );
};

export default Economictable;
